import React from 'react';
import AddressAutocomplete from '../AddressAutocomplete.jsx';

export default function CriarEvento({
  eventForm,
  onFormChange,
  onSubmit,
  createError,
  createSuccess,
  address,
  setAddress
}) {
  return (
    <div className="py-16 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Card Principal do Formulário */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Cabeçalho do Card com Gradiente */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-900 p-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Cadastrar Novo Projeto</h1>
            <p className="text-emerald-100 text-lg">
              Preencha os dados abaixo para publicar uma iniciativa social no mapa da sua comunidade.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={onSubmit} className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Título do Projeto</label>
                <input 
                  type="text" name="titulo" value={eventForm.titulo} onChange={onFormChange} required placeholder="Ex: Feira de Saúde Comunitária"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Categoria</label>
                <select 
                  name="categoria" value={eventForm.categoria} onChange={onFormChange} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700 bg-slate-50 focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="saude">Saúde</option>
                  <option value="educacao">Educação</option>
                  <option value="cultura">Cultura</option>
                  <option value="esporte">Esporte</option>
                  <option value="assistencia_social">Assistência Social</option>
                  <option value="meio_ambiente">Meio Ambiente</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Vagas Disponíveis</label>
                <input 
                  type="number" name="vagas" min="1" step="1" value={eventForm.vagas} onChange={onFormChange} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700 bg-slate-50 focus:bg-white" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Data e Hora</label>
                <input 
                  type="datetime-local" name="data_hora" value={eventForm.data_hora} onChange={onFormChange} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700 bg-slate-50 focus:bg-white cursor-pointer" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Rede Social ou Comprovação</label>
                <input 
                  type="url" name="link_comprovacao" value={eventForm.link_comprovacao} onChange={onFormChange} required placeholder="https://instagram.com/sua_ong"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Endereço Completo</label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white transition-all overflow-hidden">
                  <AddressAutocomplete value={address} onChange={setAddress} />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Descrição da Iniciativa</label>
                <textarea 
                  name="descricao" value={eventForm.descricao} onChange={onFormChange} required rows="5" placeholder="Descreva o objetivo, o público..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white resize-y"
                ></textarea>
              </div>
            </div>

            {createError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3">
                <span aria-hidden="true" className="text-lg">⚠️</span>
                <p className="text-sm font-medium">{createError}</p>
              </div>
            )}
            {createSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-start gap-3">
                <span aria-hidden="true" className="text-lg">✅</span>
                <p className="text-sm font-medium">{createSuccess}</p>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-6 border-t border-slate-100">
              <a href="/projetos" className="w-full sm:w-auto px-6 py-3 text-center font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                Cancelar
              </a>
              <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Publicar Projeto
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}