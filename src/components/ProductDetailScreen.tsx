import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Package, Truck, Shield, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/CartDrawer';

interface ProductDetailScreenProps {
  product: ShopifyProduct;
  onNavigate: (page: string) => void;
  textSize: string;
  voiceSpeed: string;
}

const ProductDetailScreen = ({ product, onNavigate, textSize }: ProductDetailScreenProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.node.variants.edges[0]?.node);
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

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    speak(`${quantity} ${product.node.title} adicionado ao carrinho`);
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

  const images = product.node.images.edges;
  const variants = product.node.variants.edges;
  const price = selectedVariant?.price.amount || product.node.priceRange.minVariantPrice.amount;
  const currency = selectedVariant?.price.currencyCode || product.node.priceRange.minVariantPrice.currencyCode;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-200 text-gray-800">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 border-b border-blue-300/50">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => {
              speak("Voltando para a loja");
              onNavigate('shop');
            }}
            className="bg-purple-600/70 hover:bg-purple-600 text-white p-2 sm:p-3 rounded-lg border border-purple-400/50"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h1 className={`${getTitleClass()} font-bold text-blue-800 flex-1 text-center px-4`}>
            Detalhes do Produto
          </h1>
          <CartDrawer />
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <Card className="overflow-hidden bg-white/70 border-blue-300">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100">
                  {images.length > 0 ? (
                    <img
                      src={images[selectedImage]?.node.url}
                      alt={images[selectedImage]?.node.altText || product.node.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl">
                      🛍️
                    </div>
                  )}
                </div>
              </Card>

              {/* Miniaturas */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-blue-600 scale-105'
                          : 'border-blue-300 hover:border-blue-400'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || `Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <h1 className={`${getTitleClass()} font-bold text-blue-800 mb-4`}>
                  {product.node.title}
                </h1>
                
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-bold text-blue-700">
                    {currency === 'USD' ? '$' : 'R$'} {parseFloat(price).toFixed(2)}
                  </span>
                  {selectedVariant?.availableForSale ? (
                    <Badge className="bg-green-500 text-white">Em estoque</Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white">Indisponível</Badge>
                  )}
                </div>
              </div>

              {/* Descrição */}
              {product.node.description && (
                <Card className="p-4 bg-white/70 border-blue-300">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Descrição</h3>
                  <p className={`${getTextClass()} text-gray-700 whitespace-pre-wrap`}>
                    {product.node.description}
                  </p>
                </Card>
              )}

              {/* Variantes/Opções */}
              {product.node.options.length > 0 && product.node.options[0].values.length > 1 && (
                <Card className="p-4 bg-white/70 border-blue-300">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Opções</h3>
                  {product.node.options.map((option) => (
                    <div key={option.name} className="mb-3">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variant = variants.find(v => 
                            v.node.selectedOptions.some(opt => opt.value === value)
                          )?.node;
                          const isSelected = selectedVariant?.id === variant?.id;
                          
                          return (
                            <Button
                              key={value}
                              onClick={() => variant && setSelectedVariant(variant)}
                              variant={isSelected ? "default" : "outline"}
                              className={isSelected ? "bg-blue-600" : "border-blue-300"}
                            >
                              {value}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </Card>
              )}

              {/* Quantidade */}
              <Card className="p-4 bg-white/70 border-blue-300">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Quantidade</h3>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-blue-300"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold text-blue-800 w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-blue-300"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Botão Adicionar ao Carrinho */}
              <Button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="w-full py-6 text-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                size="lg"
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                Adicionar ao Carrinho
              </Button>

              {/* Informações de Entrega */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-white/70 border-blue-300 text-center">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">Frete Grátis</h4>
                  <p className="text-xs text-gray-600">Acima de R$ 199</p>
                </Card>
                
                <Card className="p-4 bg-white/70 border-blue-300 text-center">
                  <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">Entrega Rápida</h4>
                  <p className="text-xs text-gray-600">5-10 dias úteis</p>
                </Card>
                
                <Card className="p-4 bg-white/70 border-blue-300 text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-800 mb-1">Compra Segura</h4>
                  <p className="text-xs text-gray-600">Pagamento protegido</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
