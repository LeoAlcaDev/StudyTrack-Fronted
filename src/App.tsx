import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />


      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<h1 className="p-8">404 - No encontrado</h1>} />
    </Routes>
  )
}

export default App