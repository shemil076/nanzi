import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/message';

export const useChatWithAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = (input: string) => {
    // Close previous connection if exists
    eventSourceRef.current?.close();

    // Connect to NestJS endpoint
    const es = new EventSource(
      `http://localhost:5001/api/chat/stream?message=${encodeURIComponent(input)}`,
    );

    setIsStreaming(true);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Check for NestJS end-of-stream signal
        if (event.data === '[DONE]') {
          setIsStreaming(false);
          es.close();
          return;
        }

        // Append AI message to state
        setMessages((prev) => [...prev, data]);
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
