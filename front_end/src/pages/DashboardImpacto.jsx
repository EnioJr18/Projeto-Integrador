import React from 'react';

const DashboardImpacto = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '2.5rem', marginBottom: '10px' }}>Módulo de Impacto Social</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Visão geral do engajamento e transformação nas comunidades (Visão Estratégica)</p>
      </div>

      {/* Cartões de Métricas Principais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderLeft: '5px solid #3b82f6' }}>
          <h3 style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '1rem' }}>Voluntários Ativos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>1.248</p>
          <small style={{ color: '#10b981', fontWeight: 'bold' }}>↑ 12% este mês</small>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderLeft: '5px solid #10b981' }}>
          <h3 style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '1rem' }}>Ações Concluídas</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>342</p>
          <small style={{ color: '#10b981', fontWeight: 'bold' }}>↑ 8% este mês</small>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderLeft: '5px solid #8b5cf6' }}>
          <h3 style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '1rem' }}>Vidas Impactadas (Est.)</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>+15k</p>
          <small style={{ color: '#64748b' }}>Baseado em relatórios</small>
        </div>

      </div>

      {/* Ranking e Gráfico */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        
        {/* Ranking de Cidades (A ideia do Jean!) */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#0f172a', marginBottom: '20px', fontSize: '1.5rem' }}>🏆 Ranking Cidades Solidárias</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '1.5rem' }}>🥇</span>
                <span style={{ fontWeight: 'bold', color: '#334155' }}>Maceió</span>
              </div>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>84 eventos</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '1.5rem' }}>🥈</span>
                <span style={{ fontWeight: 'bold', color: '#334155' }}>Arapiraca</span>
              </div>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>56 eventos</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '1.5rem' }}>🥉</span>
                <span style={{ fontWeight: 'bold', color: '#334155' }}>São Miguel dos Campos</span>
              </div>
              <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>42 eventos</span>
            </div>

          </div>
        </div>

        {/* Categorias Mais Atendidas (Gráfico visual) */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#0f172a', marginBottom: '20px', fontSize: '1.5rem' }}>📊 Categorias em Destaque</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600', color: '#475569' }}>Educação</span>
                <span style={{ color: '#64748b' }}>45%</span>
              </div>
              <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '10px', height: '10px' }}>
                <div style={{ width: '45%', background: '#3b82f6', height: '100%', borderRadius: '10px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600', color: '#475569' }}>Assistência Social</span>
                <span style={{ color: '#64748b' }}>30%</span>
              </div>
              <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '10px', height: '10px' }}>
                <div style={{ width: '30%', background: '#f97316', height: '100%', borderRadius: '10px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600', color: '#475569' }}>Saúde</span>
                <span style={{ color: '#64748b' }}>15%</span>
              </div>
              <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '10px', height: '10px' }}>
                <div style={{ width: '15%', background: '#ef4444', height: '100%', borderRadius: '10px' }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button 
          onClick={() => window.location.assign('/')}
          style={{ background: '#333', color: 'white', padding: '10px 25px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Voltar para o Início
        </button>
      </div>
    </div>
  );
};

export default DashboardImpacto;