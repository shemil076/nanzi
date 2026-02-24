import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/message';
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
      role: 'user',
      content: input,
    };
    const assistantMessageId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantMessageId, role: 'assistant', content: '' },
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

        const lines = chunk
          .split('data:')
          .map((line) => line.trim())
          .filter(Boolean);

        for (const line of lines) {
          if (line === '[DONE]') continue;

          try {
            const data = JSON.parse(line);
            const content = data.content ?? '';

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: msg.content + content }
                  : msg,
              ),
            );
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
