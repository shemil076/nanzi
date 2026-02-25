export type Message = {
  id: string;
  role: MessageRole;
  content?: string;
  conversationId: string;
  type?: MessageType;
  metadata?: StreamMessage;
  createdAt?: Date;
};

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}

export enum MessageType {
  TEXT = 'TEXT',
  SOFT_FIX = 'SOFT_FIX',
  CHIP_RESPONSE = 'CHIP_RESPONSE',
  SYSTEM = 'SYSTEM',
}

export type TextMessagePayload = {
  type: 'TEXT';
  payload: {
    content: string;
  };
};

export type ChipsMessagePayload = {
  type: 'CHIP_RESPONSE';
  payload: {
    chips: string[];
    node_id: string;
  };
};

export type StreamMessage = TextMessagePayload | ChipsMessagePayload;
