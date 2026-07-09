import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../api';
import type { Courses, CourseStatus } from '../types';

const PAGE_SIZE = 10;

const statusStyles: Record<CourseStatus, string> = {
  EN_CURSO: 'bg-amber-100 text-amber-700',
  APROBADO: 'bg-green-100 text-green-700',
  DESAPROBADO: 'bg-red-100 text-red-700',
};

const statusLabels: Record<CourseStatus, string> = {
  EN_CURSO: 'En curso',
  APROBADO: 'Aprobado',
  DESAPROBADO: 'Desaprobado',
};

export function Dashboard() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourses(page, PAGE_SIZE);
        setCourses(data.content);
        setTotalPages(data.totalPages);
      } catch {
        setError('No se pudieron cargar los cursos.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page]);

  return (
    <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Cursos</h1>
        <Link to="/courses/new" className="bg-blue-600 text-white rounded px-4 py-2">
          Nuevo curso
        </Link>
      </div>

      {loading && <p className="text-gray-500">Cargando cursos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p className="border rounded p-8 text-center text-gray-500">
          No tienes cursos registrados.
        </p>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="flex flex-col gap-3">
          {courses.map(course => (
            <div key={course.id} className="flex items-center justify-between border rounded p-4">
              <div className="flex flex-col">
                <span className="font-semibold">{course.name}</span>
                <span className="text-sm text-gray-500">
                  {course.code} · {course.credits} créditos
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm">Nota: {course.grade}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${statusStyles[course.status]}`}>
                  {statusLabels[course.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && totalPages > 0 && (
        <div className="flex items-center justify-between">
          <button onClick={() => setPage(p => p - 1)} disabled={page === 0}
            className="border rounded px-4 py-2 disabled:opacity-50">
            Anterior
          </button>

          <span className="text-sm text-gray-600">
            Página {page + 1} de {totalPages}
          </span>

          <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}
            className="border rounded px-4 py-2 disabled:opacity-50">
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
