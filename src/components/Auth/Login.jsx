import { useState } from 'react' 
import { supabase } from '../../../services/supabaseClient'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    e.preventDefault();
      setError(error.message);
      window.location.href = '/';

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Entrar no ChipaControl</h2>
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center">
        Não tem conta? <a href="/register" className="text-green-600">Cadastre-se</a>
      </p>
    </div>
  );
