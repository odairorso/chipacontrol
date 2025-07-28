import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';

// Componente para proteger rotas
const ProtectedRoute = ({ session }) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    getSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Evita piscar a tela de login
  }

  return (
    <Routes>
      <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />
      <Route element={<ProtectedRoute session={session} />}>
        <Route path="/" element={<Dashboard session={session} />} />
      </Route>
    </Routes>
  );
}

export default App;
