import { useEffect, useState } from "react";
// IMPORTANTE: Importando o Roteador do React
import { Routes, Route, useNavigate } from "react-router-dom"; 

import {
  createEvento,
  inscreverEvento,
  listEventos,
  loginUser,
  registerUser,
  getProfile,
  cancelarInscricao,
  getMinhasInscricoes,
} from "./api";
// Importando as nossas páginas da pasta correta (pages)
import Home from "./pages/Home.jsx";
import Projetos from "./pages/Projetos.jsx";
import CriarEvento from "./pages/CriarEvento.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import DashboardImpacto from "./pages/DashboardImpacto.jsx";
import PainelOrganizador from "./pages/PainelOrganizador.jsx";
import "./App.css";

const CATEGORY_LABELS = {
  saude: "Saúde",
  educacao: "Educação",
  cultura: "Cultura",
  esporte: "Esporte",
  assistencia_social: "Assistência Social",
  meio_ambiente: "Meio Ambiente",
  tecnologia: "Tecnologia",
  outro: "Outro",
};

function App() {
  const navigate = useNavigate(); // Hook do react-router para navegação programática
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toastMessage, setToastMessage] = useState("Selecione um projeto no mapa");
  
  // Estado para o Modal da Home
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  
  const [address, setAddress] = useState("");
  const [eventForm, setEventForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "outro",
    vagas: "20",
    data_hora: "",
    link_comprovacao: "",
  });

  const [mostrarApenasMinhas, setMostrarApenasMinhas] = useState(false);
  const isAuthenticated = !!localStorage.getItem("accessToken") || !!localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [inscricoesConfirmadas, setInscricoesConfirmadas] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      getProfile()
        .then((data) => {
          setUserName(data.username || data.first_name || "Usuário");
          setUserRole(data.role === "organizador" ? "Organizador" : "Participante");
        })
        .catch(() => console.log("Erro ao carregar os dados do usuário"));

      getMinhasInscricoes()
        .then((data) => setInscricoesConfirmadas(data.map((i) => i.evento)))
        .catch((error) => console.error("Erro ao carregar inscrições:", error));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let isMounted = true;
    async function loadEventos() {
      setIsLoading(true);
      setApiError("");
      try {
        const data = await listEventos({ categoria: selectedCategory });
        if (isMounted) setEventos(Array.isArray(data) ? data : []);
      } catch {
        if (isMounted) {
          setApiError("Não foi possível carregar os eventos agora.");
          setEventos([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadEventos();
    return () => { isMounted = false; };
  }, [selectedCategory]);

  const eventosParaMostrar = mostrarApenasMinhas
    ? eventos.filter((e) => inscricoesConfirmadas.includes(e.id))
    : eventos;

  const eventosFiltrados = submittedSearch
    ? eventosParaMostrar.filter(
        (e) =>
          (e.titulo && e.titulo.toLowerCase().includes(submittedSearch.toLowerCase())) ||
          (e.descricao && e.descricao.toLowerCase().includes(submittedSearch.toLowerCase())),
      )
    : eventosParaMostrar;

  const handleSearch = (event) => {
    event.preventDefault();
    const value = searchValue.trim();
    setSubmittedSearch(value);
    setToastMessage(value ? `Buscando por: ${value}` : "Selecione um projeto no mapa");
    navigate("/projetos"); // Se a pessoa pesquisar na home, joga ela pra tela de projetos
  };

  const handleCategoryFilter = (categoria) => {
    setSelectedCategory((current) => (current === categoria ? "" : categoria));
  };

  const handleParticipar = async (eventoId) => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado para participar.");
      navigate("/login");
      return;
    }

    const isConfirmed = inscricoesConfirmadas.includes(eventoId);

    if (isConfirmed) {
      const desejaCancelar = window.confirm("Você tem certeza que deseja cancelar sua inscrição neste projeto?");
      if (desejaCancelar) {
        try {
          await cancelarInscricao(eventoId);
          setInscricoesConfirmadas((prev) => prev.filter((id) => id !== eventoId));
          alert("Inscrição cancelada com sucesso!");
        } catch (error) {
          alert("Erro no servidor: " + error.message);
        }
      }
    } else {
      try {
        await inscreverEvento(eventoId);
        setInscricoesConfirmadas((prev) => prev.includes(eventoId) ? prev : [...prev, eventoId]);
        alert("Inscrição confirmada com sucesso! 🎉");
      } catch (error) {
        alert("Não foi possível realizar a inscrição. O servidor recusou (Provavelmente você já está inscrito).");
      }
    }
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    setCreateError("");
    setCreateSuccess("");

    try {
      const createdEvento = await createEvento({
        titulo: eventForm.titulo.trim(),
        descricao: eventForm.descricao.trim(),
        categoria: eventForm.categoria,
        vagas: Number(eventForm.vagas),
        data_hora: eventForm.data_hora,
        endereco: address.trim(),
        link_comprovacao: eventForm.link_comprovacao.trim(),
      });

      setEventos((current) => [createdEvento, ...current]);
      setCreateSuccess("Evento cadastrado com sucesso.");
      setToastMessage("Novo evento criado.");
      setEventForm({ titulo: "", descricao: "", categoria: "outro", vagas: "20", data_hora: "", link_comprovacao: "" });
      setAddress("");
      navigate("/projetos");
    } catch (error) {
      setCreateError(error.message || "Não foi possível cadastrar o evento. Verifique os dados.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm((current) => ({ ...current, [name]: value }));
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.assign("/"); // Limpa o estado real do navegador no logout
  };

  const handleLogin = async ({ identifier, password }) => {
    setLoginError("");
    setLoginSuccess("");
    try {
      const data = await loginUser({ username: identifier.trim(), password });
      if (data?.access) localStorage.setItem("accessToken", data.access);
      if (data?.refresh) localStorage.setItem("refreshToken", data.refresh);
      if (data?.token) localStorage.setItem("token", data.token);

      setLoginSuccess("Entrada realizada com sucesso. Redirecionando...");
      setTimeout(() => window.location.assign("/"), 800);
    } catch (error) {
      setLoginError(error.message || "Não foi possível entrar. Confira seus dados.");
    }
  };

  const handleRegister = async ({ username, email, password, confirmPassword, role }) => {
    setRegisterError("");
    setRegisterSuccess("");

    if (password !== confirmPassword) {
      setRegisterError("As senhas precisam ser iguais.");
      return;
    }

    try {
      await registerUser({ username: username.trim(), email: email.trim(), password, role });
      setRegisterSuccess("Cadastro criado com sucesso. Agora você já pode entrar.");
      setToastMessage("Cadastro criado com sucesso.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setRegisterError(error.message || "Não foi possível criar sua conta.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md transition-all">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between" aria-label="Navegacao principal">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
            <span aria-hidden="true" className="w-6 h-6 fill-current text-blue-500">
              <svg viewBox="0 0 24 24" role="img"><path d="M4 19V8.5L12 4l8 4.5V19h-5v-6H9v6H4Zm7-8h2V8h-2v3Z" /></svg>
            </span>
            <span>SIGEO-PS</span>
          </button>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button onClick={() => navigate("/")} className="hover:text-white hover:underline underline-offset-4 transition-all">Início</button>
            <button onClick={() => navigate("/projetos")} className="hover:text-white hover:underline underline-offset-4 transition-all">Eventos</button>
            <button onClick={() => navigate("/dashboard")} className="hover:text-white hover:underline underline-offset-4 transition-all">Impacto Social</button>
            <button onClick={() => {navigate("/");setTimeout(() => document.getElementById('sobre')?.scrollIntoView({behavior: 'smooth'}), 100);}} className="hover:text-white hover:underline underline-offset-4 transition-all">Sobre</button>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 md:gap-4 whitespace-nowrap">
                <span className="hidden md:flex items-center gap-1 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  🏅 Cidadão Solidário
                </span>
                <div className="flex flex-col items-end leading-tight">
                  <span className="font-semibold text-slate-100 text-sm">Olá, {userName}!</span>
                  {userRole && (
                    <span className={`text-[0.65rem] px-2 py-0.5 rounded-full font-bold mt-0.5 ${userRole === "Organizador" ? "bg-teal-900 text-teal-300" : "bg-sky-900 text-sky-300"}`}>
                      {userRole} {userRole === "Participante" && ` • ${inscricoesConfirmadas.length || 0} vagas`}
                    </span>
                  )}
                </div>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm font-medium ml-1 transition-colors">Sair</button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <button onClick={() => navigate("/cadastro")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Criar conta</button>
                <button onClick={() => navigate("/login")} className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Entrar</button>
              </div>
            )}
            <button onClick={() => navigate("/cadastrar-evento")} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all flex items-center justify-center whitespace-nowrap">
              <span className="hidden sm:inline">Cadastrar projeto</span>
              <span className="sm:hidden">+ Criar</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* O CORAÇÃO DA APLICAÇÃO: O ROTEADOR */}
        <Routes>
          {/* Página Inicial */}
          <Route path="/" element={
            <Home 
              eventos={eventos} 
              isLoading={isLoading}
              apiError={apiError}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              handleParticipar={handleParticipar}
              inscricoesConfirmadas={inscricoesConfirmadas}
              setToastMessage={setToastMessage}
              eventoSelecionado={eventoSelecionado}
              setEventoSelecionado={setEventoSelecionado}
              handleCategoryFilter={handleCategoryFilter}
            />
          } />

          {/* Página de Lista de Projetos Completa */}
          <Route path="/projetos" element={
            <Projetos 
              eventos={eventosFiltrados} 
              handleParticipar={handleParticipar}
              inscricoesConfirmadas={inscricoesConfirmadas}
            />
          } />

          {/* Outras Páginas isoladas */}
          <Route path="/dashboard" element={<DashboardImpacto />} />
          
          <Route path="/login" element={
            <Login onSubmit={handleLogin} loginError={loginError} loginSuccess={loginSuccess} />
          } />
          
          <Route path="/cadastro" element={
            <Cadastro onSubmit={handleRegister} registerError={registerError} registerSuccess={registerSuccess} />
          } />
          
          <Route path="/cadastrar-evento" element={
            <CriarEvento 
              eventForm={eventForm} 
              onFormChange={handleFormChange} 
              onSubmit={handleCreateEvent} 
              createError={createError} 
              createSuccess={createSuccess} 
              address={address}
              setAddress={setAddress}
            />
          } />
        </Routes>
      </main>

      <footer className="footer bg-slate-950 text-slate-400 pt-16 pb-8 px-4 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Coluna 1: Logo (Ocupa 2 espaços no desktop) */}
          <div className="md:col-span-2 flex flex-col items-start">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-xl font-bold tracking-tight text-white mb-4 hover:text-emerald-400 transition-colors">
              <span aria-hidden="true" className="w-6 h-6 fill-current text-emerald-500">
                <svg viewBox="0 0 24 24"><path d="M4 19V8.5L12 4l8 4.5V19h-5v-6H9v6H4Zm7-8h2V8h-2v3Z" /></svg>
              </span>
              <span>SIGEO-PS</span>
            </button>
            <p className="text-sm max-w-xs text-left leading-relaxed">
              Conectando comunidades por tecnologia para criar impacto social real.
            </p>
          </div>
          
          {/* Coluna 2: Plataforma */}
          <div className="flex flex-col items-start">
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-wider">Plataforma</h3>
            <div className="flex flex-col items-start gap-3 text-sm">
              <button onClick={() => navigate("/projetos")} className="hover:text-emerald-400 transition-colors text-left">Explorar projetos</button>
              <button onClick={() => navigate("/cadastrar-evento")} className="hover:text-emerald-400 transition-colors text-left">Criar projeto</button>
            </div>
          </div>
          
          {/* Coluna 3: Suporte */}
          <div className="flex flex-col items-start">
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-wider">Suporte</h3>
            <div className="flex flex-col items-start gap-3 text-sm">
              <button className="hover:text-emerald-400 transition-colors text-left">Central de ajuda</button>
              <button className="hover:text-emerald-400 transition-colors text-left">Contato</button>
            </div>
          </div>
        </div>
        
        {/* Direitos Autorais alinhados */}
        <div className="container mx-auto max-w-6xl border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
          <p>© 2026 SIGEO-PS. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button className="hover:text-white transition-colors">Privacidade</button>
            <button className="hover:text-white transition-colors">Termos de Uso</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;