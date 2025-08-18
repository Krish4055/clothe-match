import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { SwipeCard } from './SwipeCard';
import { Button } from '@/components/ui/button';
import { RefreshCw, Filter, Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwipeInterfaceProps {
  products: Product[];
  onProductLiked: (productId: string) => void;
  onProductDisliked: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  wishlistCount: number;
  cartCount: number;
}

export function SwipeInterface({ 
  products, 
  onProductLiked, 
  onProductDisliked, 
  onAddToCart,
  wishlistCount,
  cartCount 
}: SwipeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedProducts, setSwipedProducts] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentProduct = products[currentIndex];
  const nextProduct = products[currentIndex + 1];

  const handleSwipeLeft = (productId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipedProducts(prev => [...prev, productId]);
    onProductDisliked(productId);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleSwipeRight = (productId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipedProducts(prev => [...prev, productId]);
    onProductLiked(productId);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleAddToCart = (productId: string) => {
    onAddToCart(productId);
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setSwipedProducts([]);
  };

  const isFinished = currentIndex >= products.length;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">No more products!</h3>
          <p className="text-muted-foreground">You've seen all available items</p>
        </div>
        
        <Button onClick={resetDeck} className="gradient-primary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset Deck
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Heart className="w-4 h-4" />
            <span>{wishlistCount}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ShoppingBag className="w-4 h-4" />
            <span>{cartCount}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={resetDeck}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Card stack container */}
      <div className="relative h-[600px] flex items-center justify-center">
        {/* Next card (background) */}
        {nextProduct && (
          <SwipeCard
            product={nextProduct}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onAddToCart={handleAddToCart}
            className="scale-95 opacity-50 z-0"
          />
        )}
        
        {/* Current card */}
        {currentProduct && (
          <SwipeCard
            product={currentProduct}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onAddToCart={handleAddToCart}
            className={cn(
              "z-10",
              swipedProducts.includes(currentProduct.id) && "animate-fadeIn"
            )}
          />
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-6">
        <div className="flex justify-center mb-2">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {products.length}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}