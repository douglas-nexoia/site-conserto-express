import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Lavadoras from "./pages/Lavadoras";
import BebedourosPurificadores from "./pages/BebedourosPurificadores";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lavadoras" element={<Lavadoras />} />
          <Route path="/lavadoras.html" element={<Lavadoras />} />
          <Route path="/bebedouros-e-purificadores" element={<BebedourosPurificadores />} />
          <Route path="/bebedouros-e-purificadores.html" element={<BebedourosPurificadores />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
