import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginRequest } from '../api';
import { useAuth } from '../components/auth/useAuth';
import type { LoginRequest } from '../types';

export function Login() {
  const { login } = useAuth();          
  const navigate = useNavigate();     

  const [form, setForm] = useState<LoginRequest>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();                
    setError(null);
    setLoading(true);
    try {
      const res = await loginRequest(form); 
      login(res.token);                       
      navigate('/dashboard');                    
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>

      <input
        type="username"
        name="username"
        placeholder="Usuario"
        value={form.username}
        onChange={handleChange}
        className="border rounded p-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="border rounded p-2"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded p-2 disabled:opacity-50"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      <p className="text-sm">
        ¿No tienes cuenta? <Link to="/register" className="text-blue-600">Regístrate</Link>
      </p>
    </form>
  );
}