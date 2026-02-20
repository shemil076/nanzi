import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/message';
import { chatWithAi } from '../lib/api/chat';

export const useChatWithAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = (sessionId: string) => {
    eventSourceRef.current?.close();

    const es = chatWithAi(sessionId);

    setIsStreaming(true);

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    es.addEventListener('chat', (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    });

    es.addEventListener('done', () => {
      setIsStreaming(false);
      es.close();
    });

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
