import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInscricoesRecebidas } from '../api';

const ListaInscritos = () => {
  const { id } = useParams(); // Pega o ID do evento na URL
  const navigate = useNavigate();
  const [inscritos, setInscritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarInscritos = async () => {
      try {
        const dados = await getInscricoesRecebidas();
        // Filtra apenas as inscrições que pertencem a este evento específico
        const inscritosNesteEvento = dados.filter(inscricao => String(inscricao.evento) === String(id));
        setInscritos(inscritosNesteEvento);
      } catch (error) {
        console.error("Erro ao carregar lista:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarInscritos();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">Voluntários Inscritos</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200">
          Voltar
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500">Carregando lista...</p>
      ) : inscritos.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">Ainda não há voluntários inscritos neste projeto.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-600">ID da Inscrição</th>
                <th className="p-4 font-bold text-slate-600">Data da Inscrição</th>
                <th className="p-4 font-bold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {inscritos.map((insc, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 text-slate-700 font-medium">#{insc.id}</td>
                  <td className="p-4 text-slate-500">
                    {new Date(insc.data_inscricao).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4 text-emerald-600 font-bold">Confirmado</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaInscritos;