import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/CartDrawer';

interface ShopScreenProps {
  onNavigate: (page: string, data?: any) => void;
  textSize: string;
  voiceSpeed: string;
}

const ShopScreen = ({ onNavigate, textSize }: ShopScreenProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(20);
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    speak(`${product.node.title} adicionado ao carrinho`);
  };

  const getTextClass = () => {
    const baseSize = 'text-sm sm:text-base md:text-lg';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-lg`;
      case 'medium': return `${baseSize} lg:text-xl`;
      case 'large': return `${baseSize} lg:text-2xl`;
      case 'gigante': return `${baseSize} lg:text-3xl xl:text-4xl`;
      default: return `${baseSize} lg:text-xl`;
    }
  };

  const getTitleClass = () => {
    const baseSize = 'text-lg sm:text-xl md:text-2xl';
    switch (textSize) {
      case 'small': return `${baseSize} lg:text-2xl`;
      case 'medium': return `${baseSize} lg:text-3xl`;
      case 'large': return `${baseSize} lg:text-4xl`;
      case 'gigante': return `${baseSize} lg:text-5xl xl:text-6xl`;
      default: return `${baseSize} lg:text-3xl`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200 text-gray-800">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 border-b border-blue-300/50">
        <div className="flex justify-between items-center mb-3">
          <Button
            onClick={() => {
              speak("Voltando");
              onNavigate('home');
            }}
            className="bg-purple-600/70 hover:bg-purple-600 text-white p-2 sm:p-3 rounded-lg border border-purple-400/50"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h1 className={`${getTitleClass()} font-bold text-blue-800 flex-1 text-center`}>
            🛒 Loja Atípicos
          </h1>
          <CartDrawer />
        </div>
        <p className={`${getTextClass()} text-purple-700 text-center`}>
          Produtos especiais para autistas e atípicos 💙
        </p>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block p-4 bg-purple-100 rounded-lg border border-purple-300">
              <p className={`${getTextClass()} text-purple-700 font-bold`}>
                Carregando produtos... 🔄
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto p-8 bg-white/70 border-blue-300">
              <div className="text-4xl mb-4">🛍️</div>
              <h2 className={`${getTitleClass()} text-blue-700 font-bold mb-4`}>
                Nenhum produto encontrado
              </h2>
              <p className={`${getTextClass()} text-gray-600`}>
                Em breve teremos produtos incríveis para você!
              </p>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {products.map((product) => {
              const variant = product.node.variants.edges[0]?.node;
              const image = product.node.images.edges[0]?.node;
              
              return (
                <Card
                  key={product.node.id}
                  onClick={() => {
                    speak(`Visualizando ${product.node.title}`);
                    onNavigate('product-detail', { product });
                  }}
                  className="cursor-pointer transition-all duration-300 border bg-white/70 border-blue-300 hover:border-purple-400 hover:scale-105 overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || product.node.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        🛍️
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {product.node.title}
                    </h3>
                    
                    {product.node.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.node.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-2xl font-bold text-blue-700">
                          {product.node.priceRange.minVariantPrice.currencyCode === 'USD' ? '$' : 'R$'}
                          {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={!variant?.availableForSale}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopScreen;
