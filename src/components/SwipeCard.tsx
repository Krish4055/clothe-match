import { useState, useRef } from 'react';
import { Product } from '@/data/products';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SwipeCardProps {
  product: Product;
  onSwipeLeft: (productId: string) => void;
  onSwipeRight: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  className?: string;
}

export function SwipeCard({ product, onSwipeLeft, onSwipeRight, onAddToCart, className }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragRotation, setDragRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    const rotation = deltaX * 0.1;
    
    setDragOffset({ x: deltaX, y: deltaY });
    setDragRotation(rotation);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = 150;
    
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        onSwipeRight(product.id);
      } else {
        onSwipeLeft(product.id);
      }
    }
    
    // Reset position
    setDragOffset({ x: 0, y: 0 });
    setDragRotation(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.current.x;
    const deltaY = touch.clientY - startPos.current.y;
    const rotation = deltaX * 0.1;
    
    setDragOffset({ x: deltaX, y: deltaY });
    setDragRotation(rotation);
  };

  const handleTouchEnd = handleMouseUp;

  return (
    <Card
      ref={cardRef}
      className={cn(
        "absolute w-full max-w-sm mx-auto bg-card/80 backdrop-blur-sm border-0 shadow-card cursor-grab active:cursor-grabbing select-none",
        isDragging ? "transition-none" : "transition-all duration-300 ease-out",
        className
      )}
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragRotation}deg)`,
        zIndex: isDragging ? 50 : 10,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-t-xl"
            draggable={false}
          />
          
          {/* Swipe indicators */}
          <div
            className={cn(
              "absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full opacity-0 transition-opacity",
              dragOffset.x > 50 && "opacity-100"
            )}
          >
            <Heart className="w-6 h-6" />
          </div>
          
          <div
            className={cn(
              "absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full opacity-0 transition-opacity",
              dragOffset.x < -50 && "opacity-100"
            )}
          >
            <X className="w-6 h-6" />
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              ${product.price}
            </span>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSwipeLeft(product.id);
                }}
                className="h-10 w-10 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product.id);
                }}
                className="h-10 w-10 p-0"
              >
                <ShoppingBag className="w-4 h-4" />
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSwipeRight(product.id);
                }}
                className="h-10 w-10 p-0 gradient-primary"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}