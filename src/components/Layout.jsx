import { ShoppingCart, User } from "lucide-react";
import reactLogo from "../assets/logo.png";
import "../tailwind.css";
import React, { useState, Children, isValidElement, cloneElement } from "react";

const Layout = ({ children }) => {
  const [homeSignal, setHomeSignal] = useState(0);
  const goHome = () => setHomeSignal((s) => s + 1);

  
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { homeSignal });
    }
    return child;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-digital-blue text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={goHome} className="flex items-center gap-3">
              <img src={reactLogo}  alt="Empresa" className="logo" />
              <p className="brand"> DigitalMax</p>
            </button>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar producto"
                className="w-full px-4 py-2 rounded-lg text-gray-800 
                focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex flex-col items-center">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs mt-1">$0.00</span>
            </button>
            <button>
              <User className="w-6 h-6" /> 
            </button>
          </div>
        </div>
      </header>
      
      {childrenWithProps && childrenWithProps.length > 0 ? (
        childrenWithProps
      ) : (
        <div className="max-w-md mx-auto py-16 text-center">
          <p className="mb-6 text-gray-700">
            Accede a tu cuenta o regístrate para continuar
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="px-4 py-2 bg-digital-blue text-white rounded-lg hover:opacity-90"
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="px-4 py-2 border border-digital-blue text-digital-blue rounded-lg hover:bg-digital-blue hover:text-white transition"
            >
              Registrarse
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
