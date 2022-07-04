import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Vitrine, Detalhes, Carrinho} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Vitrine />} />
        <Route path='/detalhes/:id' element={<Detalhes />} />
        <Route path='/carrinho' element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
