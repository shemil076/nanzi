'use client';

import { useEffect, useRef } from 'react';
import MessageBubble from './message-bubble';
import { Message } from '../../types/message';

export default function ChatWindow({
  messages,
  loading,
}: {
  messages: Message[];
  loading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <MessageBubble messages={messages} />
      {/* {messages.map((msg, index) => (
      ))} */}

      {loading && (
        <div className="text-gray-400 text-sm">Assistant is typing...</div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
