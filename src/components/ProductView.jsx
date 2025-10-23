import { Package } from "lucide-react";
import StarsDisplay from "./StarsDisplay";

const ProductView = ({ product, onBack }) => {
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Producto no encontrado</p>
          <button
            onClick={onBack}
            className="bg-digital-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  const productName = product.Nombre || product.name;
  const productPrice = product.Precio || product.price || 0;
  const productDescription = product.Descripcion || product.description;
  const productRating = product.Valoracion || product.rating;
  const productImage = product.Imagen?.url || product.image;
  const hasPrice = productPrice > 0;
  const productStock = product.Stock ?? product.stock ?? 0;

  const productIcon = "📦";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-digital-blue text-white shadow-md"></header>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Imagenes*/}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center p-8 border border-gray-200">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-9xl mb-6">{productIcon}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Info del producto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {productName}
                </h1>
              </div>
              {/* Valoración de estrellas */}
              <div className="space-y-4">
                {productRating && (
                  <div className="mb-5">
                    <StarsDisplay rating={productRating} />
                  </div>
                )}
              </div>

              {/* Precio */}
              {hasPrice ? (
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-digital-blue">
                      USD ${productPrice}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-lg">Consultar precio</span>
                  </div>
                </div>
              )}

              {/* Especificaciones técnicas */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Información del Producto
                </h3>
              </div>

              {/* Descripción */}
              {productDescription && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Descripción
                  </h3>
                  <p className="text-  text-gray-600 leading-relaxed">
                    {productDescription}
                  </p>
                </div>
              )}

              {/* Stock */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Stock
                </h3>
                <p className={`font-semibold ${productStock > 0 ? " text-2xl text-green-600" : "text-red-600"}`}>
                  {productStock > 0 ? productStock : "Agotado"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
