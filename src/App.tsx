
import './App.css'
import Kanban from './components/Kanban/Kanban'

function App() {

  const status = ['sin realizar', 'en proceso', 'realizado']

  return (
    <>
      <Kanban tables={status} />
    </>
  )
}

export default App
