import { useEffect, useRef, useState } from 'react';
import {
  ChipsMessagePayload,
  Message,
  MessageRole,
  MessageType,
  TextMessagePayload,
} from '../types/message';
import { chatInitialization } from '../lib/api/chat';

export const useChatWithAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const connect = async (
    input: string,
    accessToken: string,
    conversationId: string,
  ) => {
    controllerRef.current?.abort();

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: MessageRole.USER,
      content: null,
      conversationId: conversationId,
      type: MessageType.TEXT,
      metadata: {
        type: MessageType.TEXT,
        payload: {
          content: input,
        },
      },
      createdAt: new Date(),
    };
    const assistantMessageId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: assistantMessageId,
        role: MessageRole.ASSISTANT,
        content: null,
        conversationId: conversationId,
      },
    ]);

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsStreaming(true);
    console.log('conversationId is ', conversationId);
    try {
      // NOTE: Axios in the browser does NOT support real streaming like fetch.
      const response = await fetch(
        `http://localhost:5001/api/chat/stream/${conversationId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ message: input }),
          signal: controller.signal,
        },
      );

      if (!response.body) throw new Error('No stream returned');

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // chunk => data: {"event": "message", "type": "TEXT", "payload": {"content": "World "}}
        console.log(typeof chunk); // string

        const lines = chunk
          .split('data:')
          .map((line) => line.trim())
          .filter(Boolean);
        // Array [ '{"event": "message", "type": "TEXT", "payload": {"content": "World "}}' ]

        // console.log('lines => ', lines);

        for (const line of lines) {
          const { type, payload } = JSON.parse(line);
          // console.log(`${event} - ${type} ${payload.content}`);
          if (line === '[DONE]') continue;

          try {
            // const data = JSON.parse(line);
            if (type === MessageType.TEXT) {
              const content = payload.content ?? '';

              setMessages((prev) =>
                prev.map((msg) => {
                  if (msg.id !== assistantMessageId) return msg;

                  let metadata: TextMessagePayload;

                  if (
                    msg.metadata == undefined ||
                    !('content' in msg.metadata.payload)
                  ) {
                    metadata = {
                      type: MessageType.TEXT,
                      payload: {
                        content: content,
                      },
                    };
                  } else {
                    metadata = {
                      type: MessageType.TEXT,
                      payload: {
                        content: msg.metadata.payload.content + content,
                      },
                    };
                  }

                  const updatedMessage = {
                    ...msg,
                    // content: msg.content + content,
                    content: null,
                    type: MessageType.TEXT,
                    metadata,
                  };

                  return updatedMessage;
                }),
              );
            }

            if (type === MessageType.CHIP_RESPONSE) {
              const chips = payload.chips ?? [];
              const node_id = payload.node_id ?? '';

              setMessages((prev) => {
                const metadata: ChipsMessagePayload = {
                  type: MessageType.CHIP_RESPONSE,
                  payload: {
                    chips,
                    node_id,
                  },
                };
                const assistantMessageId = crypto.randomUUID();

                return [
                  ...prev,
                  {
                    id: assistantMessageId,
                    role: MessageRole.ASSISTANT,
                    content: null,
                    conversationId: conversationId,
                    type: MessageType.CHIP_RESPONSE,
                    metadata,
                  },
                ];
              });

              // setMessages((prev) =>
              //   prev.map((msg) => {
              //     if (msg.id !== assistantMessageId) return msg;

              // const metadata: ChipsMessagePayload = {
              //   type: MessageType.CHIP_RESPONSE,
              //   payload: {
              //     chips,
              //     node_id,
              //   },
              // };

              //     // if (
              //     //   msg.metadata == undefined ||
              //     //   !('chips' in msg.metadata.payload) ||
              //     //   !('node_id' in msg.metadata.payload)
              //     // ) {
              //     //   metadata = {
              //     //     type: MessageType.CHIP_RESPONSE,
              //     //     payload: {
              //     //       chips,
              //     //       node_id,
              //     //     },
              //     //   };
              //     // } else {
              //     //   metadata = {
              //     //     type: MessageType.CHIP_RESPONSE,
              //     //     payload: {
              //     //       chips,
              //     //       node_id,
              //     //     },
              //     //   };
              //     // }

              //     const updatedMessage = {
              //       ...msg,
              //       content: null,
              //       type: MessageType.TEXT,
              //       metadata,
              //     };
              //     console.log('updatedMessage-chip', updatedMessage);

              //     return updatedMessage;
              //   }),
              // );
            }
          } catch (err) {
            console.error('Error parsing chunk:', err, line);
          }
        }
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((err as any).name === 'AbortError') {
        console.log('Stream aborted by user');
      } else {
        console.error('Streaming error:', err);
      }
    } finally {
      setIsStreaming(false);
      controllerRef.current = null;
    }
  };

  const disconnect = () => {
    controllerRef.current?.abort();
    setIsStreaming(false);
  };

  useEffect(() => {
    return () => disconnect();
  }, []);

  return { messages, isStreaming, connect, disconnect };
};

export const useChatInitialization = () => {
  const [conversationId, setConversationId] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const initializeConversation = async (accessToken: string) => {
    if (!accessToken) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const conversationId = await chatInitialization(accessToken);
      setConversationId(conversationId);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };
  return { conversationId, initializeConversation, isLoading, error };
};
