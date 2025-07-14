import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

interface ChatHeaderProps {
  onClearHistory: () => void;
}

export function ChatHeader({ onClearHistory }: ChatHeaderProps) {
  const handleClearHistory = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico de conversas?')) {
      onClearHistory();
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Seu Assistente</h1>
            <p className="text-sm text-gray-500">Assistente IA para texto e imagens</p>
          </div>
        </div>
        
        <button
          onClick={handleClearHistory}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Limpar histórico"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Limpar Histórico</span>
        </button>
      </div>
    </div>
  );
}