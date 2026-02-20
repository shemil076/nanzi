'use client';

import { BotMessageSquare } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import ChatWindow from '../chat-window';
import ChatInput from '../chat-input';
import { useChatWithAi } from '../../../hooks/use-chat';

export function ChatWithAIModal() {
  const { messages, isStreaming, connect, disconnect } = useChatWithAi();

  const handleSend = (input: string) => {
    if (!input.trim()) return;
    connect(input);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-row items-center">
          <div className="flex flex-row gap-2 items-center">
            <BotMessageSquare /> Ask nanzi AI
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-[900px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>nanzi AI</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <ChatWindow messages={messages} loading={isStreaming} />
          </div>

          <div className="border-t p-3">
            <ChatInput
              handleSend={handleSend}
              isStreaming={isStreaming}
              disconnect={disconnect}
            />
          </div>
        </div>

        <DialogFooter>
          <div className="text-xs">Powered by nanzi AI</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
