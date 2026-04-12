import { Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Routes>
        <Route path="/" element={<Navigate to="/discover" replace />} />
        <Route path="*" element={<div className="p-4">GymTracker — coming soon</div>} />
      </Routes>
    </div>
  )
}
