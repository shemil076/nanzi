'use client';
import ReactMarkdown from 'react-markdown';
import { Message, MessageRole, MessageType } from '../../types/message';
import remarkGfm from 'remark-gfm';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';

export default function MessageBubble({
  message,
  connect,
}: {
  message: Message;
  connect: (
    input: string,
    accessToken: string,
    conversationId: string,
    nodeId?: string,
  ) => Promise<void>;
}) {
  const isUser = message.role === MessageRole.USER;
  const { accessToken } = useAuth();

  if (message.metadata == undefined) {
    return <Spinner />;
  }

  console.log(message.id);
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-xl ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {message.type == MessageType.TEXT &&
          'content' in message.metadata.payload && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.metadata.payload.content}
            </ReactMarkdown>
          )}

        {message.type == MessageType.CHIP_RESPONSE &&
          'chips' in message.metadata.payload &&
          'node_id' in message.metadata.payload && (
            <div className="flex flex-row gap-5">
              {message.metadata.payload.chips.map((chip, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    connect(
                      chip,
                      accessToken,
                      message.conversationId,
                      message.metadata.payload.node_id,
                    );
                  }}
                >
                  {chip}
                </Button>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
