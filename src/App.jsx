import { Routes, Route } from 'react-router-dom';
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProducto';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListaProductos />} />
      <Route path="/agregar" element={<FormularioProducto />} />
      <Route path="/editar/:id" element={<FormularioProducto />} />
    </Routes>
  );
}

export default App;
