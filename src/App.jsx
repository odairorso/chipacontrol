import { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard'; // Assuming you have a Dashboard component

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Pega a sessão inicial
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    // Escuta mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    getSession();

    // Limpeza
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      {!session ? <Auth /> : <Dashboard session={session} />}
    </div>
  );
}

export default App;