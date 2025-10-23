import { Menu, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { fetchAllProducts } from "../utils/api";
import ProductView from "./ProductView";
import "../tailwind.css";
import promoImg from "../assets/promo.png";
import nuevoImg from "../assets/nuevo.png";
import vendidoImg from "../assets/vendido.png";

// Para cargar los productos 
const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <div className="w-20 h-4 bg-gray-300 rounded mx-auto"></div>
      </div>
    </div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);


const SliderView = ({ products, onSelect }) => {
  const containerRef = useRef(null);

  const scroll = (direction = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        aria-label="Anterior"
        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-md -ml-4"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 hide-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {products.map((product) => (
          <div
            key={product._id || product.id}
            onClick={() => onSelect(product)}
            className="shrink-0 w-1/4 md:w-1/4 sm:w-1/2 xs:w-2/3 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer snap-start"
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
              {product.Imagen?.url ? (
                <img src={product.Imagen.url} alt={product.Nombre} className="w-full h-full object-contain" />
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{product.Nombre}</h3>
              <p className="text-digital-blue font-bold text-xl">
                {product.Precio ? `USD$${product.Precio}` : "Consultar precio"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        aria-label="Siguiente"
        className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-md -mr-4"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const Products = ({ homeSignal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cuando homeSignal cambie, volvemos a la vista principal de productos
  useEffect(() => {
    if (homeSignal !== undefined) {
      setSelectedProduct(null);
    }
  }, [homeSignal]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Usamos fetchAllProducts para obtener todos los productos
      const fetchedProducts = await fetchAllProducts();
      console.log("Productos cargados:", fetchedProducts);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  if (selectedProduct) {
    return (
      <ProductView
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div>
      {/* Menú */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          className="bg-digital-blue text-white p-3 
        rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Visualización de los botones */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="absolute inset-0 mix-blend-overlay">
              <img src={promoImg} alt="Promociones" className="w-full h-full object-cover opacity-75" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Promociones</h2>
            </div>
          </div>

          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="absolute inset-0 mix-blend-overlay">
              <img src={nuevoImg} alt="Lo nuevo" className="w-full h-full object-cover opacity-75" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Lo nuevo</h2>
            </div>
          </div>

          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600">
            <div className="absolute inset-0 mix-blend-overlay">
              <img src={vendidoImg} alt="Lo más vendido" className="w-full h-full object-cover opacity-75" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">Lo más vendido</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Vista de productos*/}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">Productos</h2>

        {loading ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-lg text-gray-600 animate-pulse">
                Cargando productos...
              </p>
            </div>

        {/* Acá cargamos el esqueleto , así el usuario sabe que debe esperar*/}  

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {products.length > 4 ? (
              <SliderView
                products={products}
                onSelect={(p) => {
                  console.log("Producto clickeado:", p);
                  setSelectedProduct(p);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id || product.id}
                    onClick={() => {
                      console.log("Producto clickeado:", product);
                      setSelectedProduct(product);
                    }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                      {product.Imagen?.url ? (
                        <img
                          src={product.Imagen.url}
                          alt={product.Nombre}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-6xl mb-4">📱</div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {product.Nombre}
                      </h3>
                      <p className="text-digital-blue font-bold text-xl">
                        {product.Precio ? `USD$${product.Precio}` : "Consultar precio"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Efecto de degradado para los botones de  "Promociones, Lo nuevo, Lo más vendido" */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4">
        <button className="bg-digital-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Products;
