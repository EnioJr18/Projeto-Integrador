import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {/* Se estiver aberto, mostra a janela do chat */}
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[400px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-[translate-y-0_0.2s_ease-out]">
          
          {/* Cabeçalho */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-10">
            <span className="font-bold flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🤖</span> Assistente de IA
            </span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Fechar chat"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>

          {/* Área de Mensagens (Vazia por enquanto) */}
          <div className="flex-1 p-4 bg-slate-50 overflow-y-auto flex flex-col gap-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-700 max-w-[85%] border border-slate-100">
              Olá! 👋 Eu sou a Inteligência Artificial do sistema. Em breve estarei conectada ao servidor para tirar todas as suas dúvidas.
            </div>
          </div>

          {/* Área de Digitação (Desativada por enquanto) */}
          <div className="p-3 border-t border-slate-100 bg-white flex gap-2 items-center">
            <input 
              type="text" 
              placeholder="A IA ainda está dormindo..." 
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-60 disabled:cursor-not-allowed" 
              disabled 
            />
            <button 
              className="bg-emerald-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-not-allowed opacity-50"
              disabled
            >
              <svg className="w-4 h-4 fill-current transform rotate-45 mb-1 mr-1" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>

        </div>
      ) : (
        /* Se estiver fechado, mostra o botão flutuante */
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 hover:-translate-y-1"
          aria-label="Abrir assistente virtual"
        >
          <span className="text-3xl drop-shadow-md">🤖</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;