import { ShoppingCart, User, Menu, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../index.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Obtener productos 
        const productIds = [4, 5, 6, 7];
        
        const productPromises = productIds.map(id => 
          fetch(`https://api.restful-api.dev/objects/${id}`).then(res => res.json())
        );
        
        const fetchedProducts = await Promise.all(productPromises);
        
        // Mapear productos
        const mappedProducts = fetchedProducts.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.data?.price?.toFixed(2) || '0.00',
          year: item.data?.year || null,
          details: item.data
        }));
        
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-digital-blue text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-digital-blue rounded"></div>
            </div>
            <h1 className="text-2xl font-bold">DigitalMax</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar producto"
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

      {/* Menu Button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button className="bg-digital-blue text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Categories */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Promociones</h2>
            </div>
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Lo nuevo</h2>
            </div>
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Lo más vendido</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Promociones Section */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">Promociones</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-digital-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    {product.year && (
                      <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                        {product.year}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-digital-blue font-bold text-xl">
                    USD${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4">
        <button className="bg-digital-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Products;