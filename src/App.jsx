import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Login /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
    </Routes>
  );
}

export default App;
