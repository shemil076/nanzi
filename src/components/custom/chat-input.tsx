'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

export default function ChatInput({
  handleSend,
  isStreaming,
  disconnect,
  isLoadingInitialization,
  conversationId,
}: {
  handleSend: (input: string) => void;
  isStreaming: boolean;
  disconnect: () => void;
  isLoadingInitialization: boolean;
  conversationId: string;
}) {
  const [input, setInput] = useState('');

  const onSendClick = () => {
    if (!input.trim()) return;
    handleSend(input);
    setInput('');
  };

  return (
    <div className="flex gap-2 mt-4 items-center">
      <input
        className="flex-1 border rounded p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSendClick();
        }}
        placeholder="Type a message..."
      />

      <Button
        onClick={isStreaming ? disconnect : onSendClick}
        disabled={isLoadingInitialization || !conversationId}
      >
        {isStreaming ? 'Stop' : 'Send'}
      </Button>
    </div>
  );
}
