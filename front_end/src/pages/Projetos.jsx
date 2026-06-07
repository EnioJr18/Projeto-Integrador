import React, { useState } from 'react';

export default function Projetos({ eventos, handleParticipar, inscricoesConfirmadas = [] }) {
  // Estado local para controlar o Modal nesta página
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Cabeçalho da Página */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Todos os Projetos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore todas as oportunidades de voluntariado e impacto social. Use a barra de pesquisa na página inicial para filtrar resultados específicos.
          </p>
        </div>

        {/* Verificação se a lista está vazia */}
        {eventos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-slate-500 mb-6">Não encontramos nenhuma iniciativa com esses filtros.</p>
            <a href="/" className="text-blue-600 font-bold hover:text-blue-800 hover:underline">
              &larr; Voltar para a tela inicial
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.map((evento) => (
              <div key={evento.id} id={`evento-card-${evento.id}`} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
                
                {/* Topo Colorido do Card */}
                <div className={`relative h-40 flex items-start justify-end p-4 ${
                  evento.id % 3 === 0 ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 
                  evento.id % 2 === 0 ? 'bg-gradient-to-br from-blue-400 to-indigo-600' : 
                  'bg-gradient-to-br from-orange-400 to-rose-500'
                }`}>
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {evento.categoria}
                  </span>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {evento.titulo}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {evento.descricao}
                  </p>
                  
                  {/* Rodapé do Card */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center text-slate-400 text-sm gap-1.5">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      <span className="font-medium text-slate-600">{evento.cidade}</span>
                    </div>
                    <button 
                      onClick={() => setEventoSelecionado(evento)} 
                      className="text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors text-sm"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão extra de voltar no final da lista */}
        {eventos.length > 0 && (
          <div className="mt-16 text-center">
             <a href="/" className="text-slate-500 hover:text-slate-800 font-medium hover:underline transition-all">
              &larr; Voltar para a tela inicial
            </a>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* MODAL DE DETALHES                         */}
      {/* ========================================= */}
      {eventoSelecionado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {eventoSelecionado.categoria}
              </span>
              <button 
                onClick={() => setEventoSelecionado(null)}
                className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-200 p-2 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{eventoSelecionado.titulo}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {eventoSelecionado.descricao}
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">📍</span>
                    <div>
                      <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Localização</p>
                      <p className="font-semibold text-slate-700 text-sm">{eventoSelecionado.cidade}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">📅</span>
                    <div>
                      <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Data e Hora</p>
                      <p className="font-semibold text-slate-700 text-sm">15 de Julho • 08:00 - 12:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">⭐</span>
                    <div>
                      <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Avaliação Média</p>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-700 text-sm">4.8</span>
                        <div className="flex text-amber-400 text-sm tracking-tighter">
                          ★★★★<span className="text-slate-300">★</span>
                        </div>
                        <span className="text-xs text-slate-400 ml-1">(12)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">🔗</span>
                    <div>
                      <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Comprovação</p>
                      <a href={eventoSelecionado.link_comprovacao || "#"} target="_blank" rel="noreferrer" className="font-semibold text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors line-clamp-1">
                        {eventoSelecionado.link_comprovacao ? "Acessar formulário" : "Nenhum link exigido"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
              <button 
                onClick={() => setEventoSelecionado(null)}
                className="px-6 py-3 rounded-full font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Voltar
              </button>
              <button 
                onClick={() => {
                  if (handleParticipar) handleParticipar(eventoSelecionado.id);
                  setEventoSelecionado(null);
                }}
                className="px-6 py-3 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all hover:-translate-y-0.5"
              >
                Confirmar Inscrição
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}