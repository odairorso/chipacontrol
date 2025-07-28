import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import Dashboard from './components/Dashboard';
import IngredientForm from './components/IngredientForm';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-green-600 text-white p-4 shadow">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">ChipaControl</h1>
            {session && (
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-sm bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Sair
              </button>
            )}
          </div>
        </nav>

        <main className="py-8 px-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />
            <Route path="/" element={session ? <Dashboard session={session} /> : <Navigate to="/login" replace />} />
            <Route path="/ingredientes" element={session ? <IngredientForm session={session} /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
