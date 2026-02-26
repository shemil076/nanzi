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
import { useChatInitialization, useChatWithAi } from '../../../hooks/use-chat';
import { useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';

export function ChatWithAIModal() {
  const { messages, isStreaming, connect, disconnect } = useChatWithAi();
  const { accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const {
    conversationId,
    initializeConversation,
    isLoading: isLoadingInitialization,
    // error,
  } = useChatInitialization();

  const handleSend = (input: string) => {
    if (!input.trim() || !conversationId) return;
    console.log('conversationId =>, ', conversationId);
    connect(input, accessToken, conversationId);
  };

  const onTapAskAi = async () => {
    if (accessToken) {
      await initializeConversation(accessToken);
    }

    console.log('conversationId =>, ', conversationId);
  };

  const handleInitiateChat = () => {
    onTapAskAi();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex flex-row items-center"
          onClick={handleInitiateChat}
        >
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
            <ChatWindow
              connect={connect}
              messages={messages}
              isStreaming={isStreaming}
              isLoadingInitialization={isLoadingInitialization}
            />
          </div>

          <div className="border-t p-3">
            <ChatInput
              handleSend={handleSend}
              isStreaming={isStreaming}
              disconnect={disconnect}
              isLoadingInitialization={isLoadingInitialization}
              conversationId={conversationId}
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
