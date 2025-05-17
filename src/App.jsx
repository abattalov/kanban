// App.jsx - Simplified with minimal structure
import { useState } from 'react'
import KanbanBoard from './components/KanbanBoard'

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      <header style={{
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '16px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Kanban Board</h1>
      </header>
      
      <main style={{
        flex: 1,
        padding: '20px',
        width: '100%'
      }}>
        <KanbanBoard />
      </main>
      
      <footer style={{
        backgroundColor: '#e5e7eb',
        color: '#4b5563',
        padding: '12px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <p>&copy; {new Date().getFullYear()} Your Kanban App</p>
      </footer>
    </div>
  )
}

export default App