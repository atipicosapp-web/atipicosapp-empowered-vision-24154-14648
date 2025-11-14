import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/CartDrawer';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShopScreenProps {
  onNavigate: (page: string, data?: any) => void;
  textSize: string;
  voiceSpeed: string;
}

const ShopScreen = ({ onNavigate, textSize, voiceSpeed }: ShopScreenProps) => {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = voiceSpeed === 'ultra-fast' ? 1.5 : voiceSpeed === 'fast' ? 1.2 : 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speak(t('shop.speechOpened'));
    loadProducts();
  }, [language]);

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
    speak(`${product.node.title} ${t('shop.speechAddedToCart')}`);
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 border-b border-border">
        <div className="flex justify-between items-center mb-3">
          <Button
            onClick={() => {
              speak(t('shop.back'));
              onNavigate('home');
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 sm:p-3 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h1 className={`${getTitleClass()} font-bold text-foreground flex-1 text-center`}>
            🛒 {t('shop.title')}
          </h1>
          <CartDrawer />
        </div>
        <p className={`${getTextClass()} text-muted-foreground text-center`}>
          Produtos especiais para autistas e atípicos 💙
        </p>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block p-4 bg-purple-100 rounded-lg border border-purple-300">
              <p className={`${getTextClass()} text-purple-700 font-bold`}>
                {t('shop.loading')} 🔄
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto p-8 bg-card border-border">
              <div className="text-4xl mb-4">🛍️</div>
              <h2 className={`${getTitleClass()} text-foreground font-bold mb-4`}>
                {t('shop.noProducts')}
              </h2>
              <p className={`${getTextClass()} text-muted-foreground`}>
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
                  className="cursor-pointer transition-all duration-300 border bg-card border-border hover:border-primary hover:scale-105 overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
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
                    <h3 className="text-lg font-bold text-foreground line-clamp-2">
                      {product.node.title}
                    </h3>
                    
                    {product.node.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.node.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-2xl font-bold text-foreground">
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
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('shop.addToCart')}
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
