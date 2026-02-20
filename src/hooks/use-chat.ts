import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/message';

export const useChatWithAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = (input: string) => {
    eventSourceRef.current?.close();

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

    const es = new EventSource(
      `http://localhost:5001/api/chat/stream?message=${encodeURIComponent(input)}`,
    );

    setIsStreaming(true);

    es.onmessage = (event) => {
      if (event.data === '[DONE]') {
        setIsStreaming(false);
        es.close();
        return;
      }

      try {
        const data = JSON.parse(event.data);
        const chunk: string = data.content ?? data.delta ?? data;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg,
          ),
        );
      } catch (err) {
        console.error('Error parsing SSE message:', err);
      }
    };

    es.onerror = (err) => {
      console.error('SSE error:', err);
      setIsStreaming(false);
      es.close();
    };

    eventSourceRef.current = es;
  };

  const disconnect = () => {
    eventSourceRef.current?.close();
    setIsStreaming(false);
  };

  useEffect(() => {
    return () => disconnect();
  }, []);

  return { messages, isStreaming, connect, disconnect };
};
