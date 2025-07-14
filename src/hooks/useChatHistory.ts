import { useState, useEffect } from 'react';
import { ChatMessage } from '../types/chat';

const STORAGE_KEY = 'gemini-chat-history';

export function useChatHistory() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Carregar histórico do localStorage na inicialização
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Converter timestamps de string para Date
        const messagesWithDates = parsedHistory.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        // Se houver erro, começar com mensagem de boas-vindas
        setMessages([getWelcomeMessage()]);
      }
    } else {
      // Primeira vez - adicionar mensagem de boas-vindas
      setMessages([getWelcomeMessage()]);
    }
  }, []);

  // Salvar no localStorage sempre que as mensagens mudarem
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearHistory = () => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([welcomeMessage]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    messages,
    addMessage,
    clearHistory
  };
}

function getWelcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    type: 'assistant',
    content: 'Olá! Eu sou o seu assistente pessoal. Posso ajudar você com texto e imagens. Como posso ajudá-lo hoje?',
    timestamp: new Date()
  };
}