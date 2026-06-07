import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventMap from '../EventMap.jsx'; // Importando da pasta pai

export default function Home({
  eventos,
  isLoading,
  apiError,
  searchValue,
  setSearchValue,
  handleSearch,
  handleParticipar,
  inscricoesConfirmadas,
  setToastMessage,
  eventoSelecionado,
  setEventoSelecionado,
  handleCategoryFilter,
}) {
    const navigate = useNavigate();
  return (
    <>
      {/* ========================================= */}
      {/* HERO SECTION                              */}
      {/* ========================================= */}
      <section className="bg-gradient-to-b from-slate-900 to-emerald-900 py-16 md:py-24 px-4 text-center shadow-inner">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Conecte-se com Impacto Social <span className="text-emerald-400">Perto de Você</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Descubra e participe de projetos sociais relevantes na sua comunidade. Faça a diferença onde ela mais importa.
          </p>

          <form onSubmit={handleSearch} aria-label="Buscar projetos sociais" className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10">
            <div className="relative flex-1 flex items-center bg-white rounded-full shadow-lg focus-within:ring-4 focus-within:ring-emerald-500/50 transition-all">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-5 w-5 h-5 fill-slate-400">
                <path d="M10.8 18a7.2 7.2 0 1 1 5.1-12.3 7.2 7.2 0 0 1 0 10.2l4.1 4.1-1.5 1.5-4.1-4.1A7.1 7.1 0 0 1 10.8 18Zm0-2.2a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
              </svg>
              <input 
                type="search" 
                placeholder="Encontre projetos sociais perto de você..." 
                value={searchValue} 
                onChange={(event) => setSearchValue(event.target.value)} 
                className="w-full py-4 pl-12 pr-6 rounded-full outline-none text-slate-800 placeholder-slate-400 bg-transparent"
              />
            </div>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-4 px-8 rounded-full shadow-lg transition-colors whitespace-nowrap">
              Pesquisar
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#mapa" className="flex items-center gap-2 bg-emerald-800/50 hover:bg-emerald-700/50 text-white border border-emerald-500/30 font-bold py-3 px-6 rounded-full shadow-sm backdrop-blur-sm transition-all">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                <path d="m15 19-6-2.1-4 1.6V6l4-1.6 6 2.1 4-1.6v12.5L15 19Zm-5.2-4 4.4 1.5V8.4L9.8 6.9V15Z" />
              </svg>
              Explorar mapa
            </a>
            <a href="/cadastrar-evento" className="flex items-center gap-2 bg-white hover:bg-slate-100 text-emerald-900 font-bold py-3 px-6 rounded-full shadow-md transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                <path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" />
              </svg>
              Cadastrar projeto
            </a>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* MAPA SECTION                              */}
      {/* ========================================= */}
      <section id="mapa" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Mapa Interativo de Projetos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Veja iniciativas de impacto social acontecendo ao seu redor.
            </p>
          </div>
          
          <div className="bg-slate-200 rounded-3xl shadow-xl border border-slate-200 overflow-hidden h-[450px] md:h-[550px] lg:h-[650px] relative z-0">
            <div className="w-full h-full relative z-10">
              <EventMap 
                eventos={eventos} 
                isLoading={isLoading} 
                apiError={apiError} 
                onViewDetails={(eventoId, titulo) => {
                  setToastMessage(`Lendo detalhes: ${titulo}`);
                  const cardSelecionado = document.getElementById(`evento-card-${eventoId}`);
                  if (cardSelecionado) {
                    cardSelecionado.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    cardSelecionado.style.transition = 'box-shadow 0.4s';
                    cardSelecionado.style.boxShadow = '0 0 0 5px rgba(59, 130, 246, 0.5)';
                    setTimeout(() => cardSelecionado.style.boxShadow = 'none', 1500);
                  } else {
                    document.querySelector('#eventos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                onParticipar={handleParticipar}
                inscricoesConfirmadas={inscricoesConfirmadas}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* CATEGORIAS SECTION                        */}
      {/* ========================================= */}
      <section id="categorias" className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              Explore por Causas
            </h2>
          </div>

          <div className="flex overflow-x-auto pb-6 pt-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
            <button onClick={() => handleCategoryFilter('')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-600 text-white shadow-md hover:-translate-y-1 transition-transform">
              <span className="text-3xl mb-3">🌍</span>
              <span className="font-semibold text-sm">Todas</span>
            </button>
            <button onClick={() => handleCategoryFilter('educacao')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">📚</span>
              <span className="font-semibold text-sm">Educação</span>
            </button>
            <button onClick={() => handleCategoryFilter('saude')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">❤️</span>
              <span className="font-semibold text-sm">Saúde</span>
            </button>
            <button onClick={() => handleCategoryFilter('tecnologia')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">💻</span>
              <span className="font-semibold text-sm">Tecnologia</span>
            </button>
            <button onClick={() => handleCategoryFilter('meio_ambiente')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">🌱</span>
              <span className="font-semibold text-sm">Meio Ambiente</span>
            </button>
            <button onClick={() => handleCategoryFilter('causa_animal')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">🐾</span>
              <span className="font-semibold text-sm text-center">Causa Animal</span>
            </button>
            <button onClick={() => handleCategoryFilter('assistencia_social')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">🤝</span>
              <span className="font-semibold text-sm text-center">Assistência Social</span>
            </button>
            <button onClick={() => handleCategoryFilter('cultura')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">🎭</span>
              <span className="font-semibold text-sm">Cultura</span>
            </button>
            <button onClick={() => handleCategoryFilter('outro')} className="snap-start shrink-0 w-36 md:w-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">📌</span>
              <span className="font-semibold text-sm">Outros</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* DESTAQUES SECTION                         */}
      {/* ========================================= */}
      <section id="eventos" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Projetos em Destaque
              </h2>
              <p className="text-lg text-slate-600">
                As iniciativas que estão fazendo a diferença agora.
              </p>
            </div>
            <button onClick={() => navigate("/projetos")} className="hidden md:inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 hover:underline underline-offset-4 transition-all">
              Explorar todos
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.slice(0, 6).map((evento) => (
              <div key={evento.id} id={`evento-card-${evento.id}`} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
                <div className={`relative h-40 flex items-start justify-end p-4 ${
                  evento.id % 3 === 0 ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 
                  evento.id % 2 === 0 ? 'bg-gradient-to-br from-blue-400 to-indigo-600' : 
                  'bg-gradient-to-br from-orange-400 to-rose-500'
                }`}>
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {evento.categoria}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                    {evento.titulo}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {evento.descricao}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center text-slate-400 text-sm gap-1.5">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      <span className="font-medium text-slate-600">{evento.cidade}</span>
                    </div>
                    <button 
                      onClick={() => setEventoSelecionado(evento)} 
                      className="text-emerald-600 font-bold hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full transition-colors text-sm"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button onClick={() => navigate("/projetos")} className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Ver todos os projetos
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* MODAL DE DETALHES                         */}
      {/* ========================================= */}
      {eventoSelecionado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
                  handleParticipar(eventoSelecionado.id);
                  setEventoSelecionado(null);
                }}
                className="px-6 py-3 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
              >
                Confirmar Inscrição
              </button>
            </div>
          </div>
        </div>
        
      )}
      {/* ========================================= */}
      {/* SOBRE / CTA SECTION                       */}
      {/* ========================================= */}
      <section id="sobre" className="py-20 bg-gradient-to-b from-slate-900 to-emerald-900 text-white text-center shadow-inner">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Sobre o SIGEO</h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-16 leading-relaxed">
            O SIGEO é uma plataforma que conecta voluntários a projetos sociais, promovendo o engajamento e o impacto positivo nas comunidades.
          </p>
          
          <div className="w-16 h-1 bg-emerald-500/30 mx-auto mb-16 rounded-full"></div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para Fazer a Diferença?</h2>
          <p className="text-emerald-200 mb-10">
            Junte-se a voluntários e organizações que fortalecem a nossa região todos os dias.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#mapa" className="w-full sm:w-auto bg-white text-emerald-950 hover:bg-slate-100 font-bold py-3 px-8 rounded-full shadow-md transition-colors">
              Encontrar projetos
            </a>
            <a href="/cadastrar-evento" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-3 px-8 rounded-full shadow-md transition-colors">
              Criar novo projeto
            </a>
          </div>

        </div>
      </section>
    </>
  );
}