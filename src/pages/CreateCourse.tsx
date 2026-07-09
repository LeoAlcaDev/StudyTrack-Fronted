import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCourse } from '../api';
import type { CourseStatus } from '../types';

export function CreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    code: '',
    credits: '',
    grade: '',
    status: 'EN_CURSO' as CourseStatus,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.code.trim()) {
      setError('El nombre y el código son obligatorios.');
      return;
    }

    const credits = Number(form.credits);
    const grade = Number(form.grade);

    if (Number.isNaN(credits) || credits <= 0) {
      setError('Los créditos deben ser un número mayor a 0.');
      return;
    }

    if (Number.isNaN(grade) || grade < 0 || grade > 20) {
      setError('La nota debe estar entre 0 y 20.');
      return;
    }

    setLoading(true);
    try {
      await createCourse({ name: form.name, code: form.code, credits, grade, status: form.status });
      navigate('/dashboard');
    } catch {
      setError('No se pudo crear el curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Nuevo curso</h1>

      <input type="text" name="name" placeholder="Nombre del curso"
        value={form.name} onChange={handleChange} className="border rounded p-2" />

      <input type="text" name="code" placeholder="Código"
        value={form.code} onChange={handleChange} className="border rounded p-2" />

      <input type="number" name="credits" placeholder="Créditos"
        value={form.credits} onChange={handleChange} className="border rounded p-2" />

      <input type="number" name="grade" placeholder="Nota (0-20)" min="0" max="20" step="0.1"
        value={form.grade} onChange={handleChange} className="border rounded p-2" />

      <select name="status" value={form.status} onChange={handleChange} className="border rounded p-2">
        <option value="EN_CURSO">En curso</option>
        <option value="APROBADO">Aprobado</option>
        <option value="DESAPROBADO">Desaprobado</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" disabled={loading}
        className="bg-blue-600 text-white rounded p-2 disabled:opacity-50">
        {loading ? 'Creando...' : 'Crear curso'}
      </button>

      <p className="text-sm">
        <Link to="/dashboard" className="text-blue-600">Volver al dashboard</Link>
      </p>
    </form>
  );
}
