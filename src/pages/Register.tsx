import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { registerRequest } from '../api';
import { useAuth } from '../components/auth/useAuth';
import type { RegisterRequest } from '../types';

export function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterRequest>({ username: '', email: '', password: '', fullName: '' });
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
      const res = await registerRequest(form);
      login(res.token);
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setError('No se pudo conectar con el servidor (¿backend caído o CORS?).');
        } else if (err.response.status === 401) {
          setError('El backend rechaza el registro (401). Revisa la config de seguridad del servidor.');
        } else if (err.response.status === 409) {
          setError('El usuario o email ya existe.');
        } else {
          setError(`Error ${err.response.status}: no se pudo registrar.`);
        }
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>

      <input type="text" name="username" placeholder="Nombre de Usuario"
        value={form.username} onChange={handleChange} className="border rounded p-2" />

      <input type="email" name="email" placeholder="Email"
        value={form.email} onChange={handleChange} className="border rounded p-2" />

      <input type="password" name="password" placeholder="Contraseña"
        value={form.password} onChange={handleChange} className="border rounded p-2" />

      <input type="text" name="fullName" placeholder="Tu Nombre Completo"
        value={form.fullName} onChange={handleChange} className="border rounded p-2" />

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" disabled={loading}
        className="bg-blue-600 text-white rounded p-2 disabled:opacity-50">
        {loading ? 'Creando...' : 'Registrarse'}
      </button>

      <p className="text-sm">
        ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600">Inicia sesión</Link>
      </p>
    </form>
  );
}