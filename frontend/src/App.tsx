import { useMemo, useState, useEffect } from 'react'
import { fetchEventsFromApi } from './lib/api'

type Category = 'All' | 'Health' | 'Education' | 'Food' | 'Employment' | 'Housing'

type EventCard = {
  title: string
  location: string
  date: string
  participants: string
  category: Exclude<Category, 'All'>
  accent: string
}

const categories: Category[] = ['All', 'Health', 'Education', 'Food', 'Employment', 'Housing']

const eventCards: EventCard[] = [
  {
    title: 'Community Vaccination Drive',
    location: 'Centro Comunitário Vila Azul',
    date: 'Thu, 18 Apr • 09:00',
    participants: '148 participants',
    category: 'Health',
    accent: 'marker--mint',
  },
  {
    title: 'Back to School Kit Delivery',
    location: 'Escola Municipal Esperança',
    date: 'Sat, 20 Apr • 14:30',
    participants: '86 participants',
    category: 'Education',
    accent: 'marker--blue',
  },
  {
    title: 'Fresh Food Fair',
    location: 'Praça do Bairro Novo',
    date: 'Sun, 21 Apr • 08:00',
    participants: '212 participants',
    category: 'Food',
    accent: 'marker--green',
  },
  {
    title: 'Job Pathway Workshop',
    location: 'Hub de Inovação Social',
    date: 'Wed, 24 Apr • 18:00',
    participants: '63 participants',
    category: 'Employment',
    accent: 'marker--navy',
  },
  {
    title: 'Safe Housing Clinic',
    location: 'Associação Morar Bem',
    date: 'Fri, 26 Apr • 10:30',
    participants: '54 participants',
    category: 'Housing',
    accent: 'marker--sun',
  },
]

const featuredMarkers = [
  { x: '22%', y: '32%', label: 'Health', className: 'marker--mint' },
  { x: '36%', y: '56%', label: 'Education', className: 'marker--blue' },
  { x: '58%', y: '38%', label: 'Food', className: 'marker--green' },
  { x: '74%', y: '64%', label: 'Employment', className: 'marker--navy' },
  { x: '84%', y: '27%', label: 'Housing', className: 'marker--sun' },
]

const overviewStats = [
  { label: 'Projects mapped', value: '312' },
  { label: 'People reached', value: '12.4k' },
  { label: 'Live events', value: '48' },
]

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(eventCards[0].title)
  const [events, setEvents] = useState<EventCard[]>(eventCards)
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchEventsFromApi()
      .then((data) => {
        if (!mounted) return
        // Assuming the backend returns a list compatible with EventCard shape
        // Map fallback fields when absent
        const mapped: EventCard[] = (data || []).map((item: any, idx: number) => ({
          title: item.title ?? `Evento ${idx + 1}`,
          location: item.location ?? item.local ?? 'Local não informado',
          date: item.date ?? item.data ?? 'Data a definir',
          participants: item.participants ?? item.participantes ?? '0 participantes',
          category: (item.category as Category) ?? 'Health',
          accent: 'marker--blue',
        }))
        if (mapped.length) setEvents(mapped)
      })
      .catch(() => {
        // keep fallback static events
      })
      .finally(() => setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  const visibleEvents = useMemo(
    () => (activeCategory === 'All' ? events : events.filter((e) => e.category === activeCategory)),
    [activeCategory, events],
  )

    function handleJoin(eventCard: EventCard) {
      // placeholder: integrate with POST /api/eventos/{id}/inscrever or /inscricoes/
      alert(`Você se inscreveu em: ${eventCard.title}`)
    }

    return (
      <div className="app-root">
        <header className="site-nav">
          <div className="site-nav__brand">SIGEO-PS</div>
          <nav className="site-nav__links" aria-label="Main navigation">
            <a href="#">Início</a>
            <a href="#mapa">Mapa</a>
            <a href="#events">Projetos</a>
          </nav>
          <div className="site-nav__actions">
            <a className="button button--secondary" href="#login">Entrar</a>
          </div>
        </header>

        <main className="page">
          <section className="hero">
            <div className="hero__content">
              <span className="eyebrow">SIGEO-PS • plataforma civic-tech</span>
              <h1>Encontre projetos sociais perto de você</h1>
              <p className="hero__lede">
                Descubra ações em saúde, educação, alimentação, emprego e moradia na sua cidade.
              </p>

              <label className="search-bar" aria-label="Buscar projetos">
                <span className="search-bar__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                </span>
                <input type="search" placeholder="Buscar projetos sociais" />
                <button type="button">Buscar</button>
              </label>

              <div className="hero__actions">
                <a className="button button--primary" href="#mapa">Explorar mapa</a>
                <a className="button button--secondary" href="#events">Registrar projeto</a>
              </div>

              <ul className="overview-stats" aria-label="Métricas da plataforma">
                {overviewStats.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="hero__map card-surface" id="mapa" aria-label="Preview do mapa interativo">
              <div className="map__topbar">
                <div>
                  <span className="eyebrow">Preview do mapa</span>
                  <h2>Impacto social por perto</h2>
                </div>
                <div className="map__legend">
                  <span><i className="legend-dot legend-dot--blue" />Eventos</span>
                  <span><i className="legend-dot legend-dot--green" />Projetos</span>
                </div>
              </div>

              <div className="map-shell">
                <aside className="map-sidebar" aria-label="Filtros de busca">
                  <h4>Filtros</h4>
                  <div className="filter-group">
                    <label>Categoria</label>
                    <div className="category-list">
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <button key={c} className={activeCategory === c ? 'category-pill is-active' : 'category-pill'} onClick={() => setActiveCategory(c)}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <label htmlFor="date-filter">Data</label>
                    <input id="date-filter" type="date" />
                  </div>

                  <div className="filter-group">
                    <label htmlFor="distance">Distância (km)</label>
                    <input id="distance" type="range" min={1} max={100} defaultValue={10} />
                  </div>
                </aside>

                <div className="map-canvas" role="img" aria-label="Mapa com marcadores de eventos">
                  <div className="map-grid" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="map-routes" aria-hidden="true">
                    <span className="route route--one" />
                    <span className="route route--two" />
                  </div>

                  {featuredMarkers.map((marker, idx) => (
                    <button key={`${marker.label}-${idx}`} type="button" className={`map-marker ${marker.className}`} style={{ left: marker.x, top: marker.y }} aria-label={`${marker.label} marker`} onClick={() => { const evt = visibleEvents[idx] ?? visibleEvents[0]; if (evt) setSelectedEvent(evt); setActiveCategory(marker.label as Category); }}>
                      <span className="map-marker__pulse" />
                      <span className="map-marker__pin">{marker.label.slice(0, 1)}</span>
                    </button>
                  ))}

                  <div className="map-chip map-chip--selected">
                    <strong>Área atual</strong>
                    <span>3.2 km ao redor da sua localização</span>
                  </div>
                </div>

                <div className="map-summary">
                  <div>
                    <strong>48 ações ativas</strong>
                    <span>atualizadas em tempo real</span>
                  </div>
                  <div>
                    <strong>128 voluntários</strong>
                    <span>disponíveis nesta semana</span>
                  </div>
                </div>
              </div>
            </aside>
          </section>

          <section className="section-shell">
            <div className="section-heading">
              <span className="eyebrow">Categorias</span>
              <h2>Filtre ações por área de atuação</h2>
            </div>

            <div className="category-row" role="tablist" aria-label="Categorias">
              {categories.map((category) => (
                <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'category-pill is-active' : 'category-pill'} onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="section-shell" id="events">
            <div className="section-heading section-heading--split">
              <div>
                <span className="eyebrow">Eventos em destaque</span>
                <h2>Oportunidades selecionadas próximas a você</h2>
              </div>
              <p>Listagem de eventos com título, local, data e número de participantes.</p>
            </div>

            <div className="events-grid">
              {visibleEvents.map((event) => (
                <article key={event.title} className={hoveredEvent === event.title ? 'event-card event-card--active' : 'event-card'} onMouseEnter={() => setHoveredEvent(event.title)} onFocus={() => setHoveredEvent(event.title)} tabIndex={0}>
                  <div className="event-card__header">
                    <span className={`event-card__accent ${event.accent}`} />
                    <span className="event-card__category">{event.category}</span>
                  </div>
                  <h3>{event.title}</h3>
                  <p className="event-card__location">{event.location}</p>

                  <dl className="event-card__meta">
                    <div>
                      <dt>Data</dt>
                      <dd>{event.date}</dd>
                    </div>
                    <div>
                      <dt>Participantes</dt>
                      <dd>{event.participants}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section className="cta-band card-surface">
            <div>
              <span className="eyebrow">Comece agora</span>
              <h2>Transforme ação local em impacto mensurável</h2>
              <p>Explore o mapa para encontrar iniciativas ou registre um novo projeto para a sua comunidade.</p>
            </div>

            <div className="cta-band__actions">
              <a className="button button--primary" href="#mapa">Explorar mapa</a>
              <a className="button button--secondary" href="#events">Registrar projeto</a>
            </div>
          </section>

          <footer className="site-footer">
            <div className="site-footer__inner">
              <div>© {new Date().getFullYear()} SIGEO-PS</div>
              <nav>
                <a href="#">Sobre</a>
                <a href="#">Contato</a>
                <a href="#">Política de Privacidade</a>
              </nav>
            </div>
          </footer>
        </main>

        {selectedEvent && (
          <div className="event-preview" role="dialog" aria-labelledby="preview-title">
            <div className="event-preview__card">
              <button className="event-preview__close" onClick={() => setSelectedEvent(null)} aria-label="Fechar">×</button>
              <h3 id="preview-title">{selectedEvent.title}</h3>
              <p className="muted">{selectedEvent.location}</p>
              <dl>
                <div>
                  <dt>Data</dt>
                  <dd>{selectedEvent.date}</dd>
                </div>
                <div>
                  <dt>Participantes</dt>
                  <dd>{selectedEvent.participants}</dd>
                </div>
              </dl>
              <div className="event-preview__actions">
                <button className="button button--primary" onClick={() => handleJoin(selectedEvent)}>Participar</button>
                <a className="button button--secondary" href="#">Ver detalhes</a>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default App