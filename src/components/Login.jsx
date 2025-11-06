import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
    navigate("/products");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-digital-blue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-digital-blue"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-digital-blue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Acceder
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={goToRegister}
              className="text-digital-blue font-medium hover:underline"
            >
              Regístrate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
