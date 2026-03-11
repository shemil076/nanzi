'use client';

import { useEffect, useRef } from 'react';
import MessageBubble from './message-bubble';
import { Message } from '../../types/message';
import { Skeleton } from '../ui/skeleton';

export default function ChatWindow({
  messages,
  isStreaming,
  isLoadingInitialization,
  connect,
}: {
  messages: Message[];
  isStreaming: boolean;
  isLoadingInitialization: boolean;
  connect: (
    input: string,
    accessToken: string,
    conversationId: string,
    nodeId?: string,
  ) => Promise<void>;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoadingInitialization) {
    return (
      <div className="flex flex-col min-h-90 justify-center items-center">
        <div className="flex flex-col w-full max-w-4xl gap-3">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div>
            <Skeleton className="w-full h-56" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} connect={connect} />
      ))}

      {isStreaming && (
        <div className="text-gray-400 text-sm">nanzi AI is thinking...</div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
