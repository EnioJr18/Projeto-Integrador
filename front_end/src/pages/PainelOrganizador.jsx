import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInscricoesRecebidas, deleteEvento } from '../api';

export default function PainelOrganizador({ eventos }) {
  const [inscricoes, setInscricoes] = useState(null);
  const navigate = useNavigate();

  // Verifica se tem token.
  const isAuthenticated = !!localStorage.getItem('accessToken') || !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // Idealmente, salvamos o role no login

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Expulsa quem não está logado
      return;
    }

    getInscricoesRecebidas()
      .then(data => {
        setInscricoes(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setInscricoes([]);
      });
  }, [isAuthenticated, navigate]);

  // Enquanto carrega
  if (inscricoes === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Agrupa os IDs para saber quantas pessoas estão em cada evento
  const contagemPorEvento = inscricoes.reduce((acc, inscricao) => {
    acc[inscricao.evento] = (acc[inscricao.evento] || 0) + 1;
    return acc;
  }, {});

  // Lógica de Exclusão Segura
  const handleExcluir = async (eventoId, titulo) => {
    const confirmacao = window.confirm(`ATENÇÃO: Tem certeza que deseja excluir o projeto "${titulo}"?\nEssa ação não tem volta e apagará todas as inscrições.`);
    
    if (confirmacao) {
      try {
        await deleteEvento(eventoId);
        // Recarrega a página de forma rápida para atualizar tudo
        window.location.reload();
      } catch (error) {
        alert(error.message || "Não foi possível excluir o evento.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Cabeçalho do Dashboard */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Painel de Gestão
            </h1>
            <p className="text-lg text-slate-600">
              Gerencie seus projetos sociais e acompanhe os voluntários inscritos.
            </p>
          </div>
          <button 
            onClick={() => navigate('/cadastrar-evento')}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" /></svg>
            Novo Projeto
          </button>
        </div>

        {/* Estado Vazio (Sem projetos ainda) */}
        {Object.keys(contagemPorEvento).length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <span className="text-6xl mb-4 block">📋</span>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Nenhum projeto ativo</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Você ainda não recebeu inscrições ou não possui projetos ativos no momento. Que tal cadastrar uma nova iniciativa?
            </p>
            <button onClick={() => navigate('/cadastrar-evento')} className="text-emerald-600 font-bold hover:underline">
              Criar meu primeiro projeto &rarr;
            </button>
          </div>
        ) : (
          /* Tabela/Lista de Projetos */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Cabeçalho da Tabela (Some no mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-slate-100 p-4 font-bold text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
              <div className="col-span-6">Projeto</div>
              <div className="col-span-2 text-center">Inscritos</div>
              <div className="col-span-4 text-center">Ações Rápidas</div>
            </div>

            {/* Linhas de Dados */}
            <div className="divide-y divide-slate-100">
              {Object.entries(contagemPorEvento).map(([eventoId, total]) => {
                const eventoOriginal = eventos.find(e => String(e.id) === String(eventoId));
                const titulo = eventoOriginal ? eventoOriginal.titulo : `Projeto #${eventoId}`;
                const categoria = eventoOriginal ? eventoOriginal.categoria : `Geral`;
                
                return (
                  <div key={eventoId} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 md:p-4 items-center hover:bg-slate-50 transition-colors">
                    
                    {/* Info do Projeto */}
                    <div className="col-span-6 flex flex-col items-start gap-1">
                      <span className="bg-emerald-100 text-emerald-800 text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {categoria}
                      </span>
                      <strong className="text-lg font-bold text-slate-800 leading-tight">
                        {titulo}
                      </strong>
                    </div>

                    {/* Contagem (Responsivo) */}
                    <div className="col-span-6 md:col-span-2 flex items-center md:justify-center mt-2 md:mt-0">
                      <span className="md:hidden font-bold text-slate-500 text-sm mr-2">Inscritos:</span>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full font-bold text-sm shadow-sm flex items-center gap-2">
                        <span>👥</span> {total}
                      </span>
                    </div>

                    {/* Botões de Ação */}
                    <div className="col-span-12 md:col-span-4 flex items-center gap-2 mt-4 md:mt-0 justify-start md:justify-center">
                      <button 
                        onClick={() => navigate(`/painel/lista/${eventoId}`)}
                        className="flex-1 md:flex-none px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Ver Lista
                      </button>
                      <button 
                        onClick={() => navigate(`/editar-evento/${eventoId}`)}
                        className="flex-1 md:flex-none px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleExcluir(eventoId, titulo)}
                        className="px-3 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        aria-label="Excluir projeto"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}