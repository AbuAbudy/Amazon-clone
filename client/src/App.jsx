import { useState } from 'react'
import './App.css'
import Routing from './Routing'
function App() {
  const [count, setCount] = useState()

  return <Routing />
}

export default App
