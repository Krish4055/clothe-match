import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CategoryCard } from '@/components/CategoryCard';
import { SwipeInterface } from '@/components/SwipeInterface';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products, categories, Product } from '@/data/products';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Sparkles, ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-fashion.jpg';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'swipe'>('home');
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);
  const [cart, setCart] = useLocalStorage<string[]>('cart', []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductLiked = (productId: string) => {
    setWishlist(prev => [...prev, productId]);
  };

  const handleProductDisliked = (productId: string) => {
    // Just track that they saw it, no action needed
    console.log('Product disliked:', productId);
  };

  const handleAddToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('swipe');
  };

  if (currentView === 'swipe') {
    return (
      <div className="min-h-screen bg-background">
        <Header
          onSearch={setSearchQuery}
          wishlistCount={wishlist.length}
          cartCount={cart.length}
          onShowWishlist={() => console.log('Show wishlist')}
          onShowCart={() => console.log('Show cart')}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentView('home')}
              className="text-muted-foreground"
            >
              ← Back to Categories
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {selectedCategory === 'all' ? 'All Categories' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </span>
          </div>
          
          <SwipeInterface
            products={filteredProducts}
            onProductLiked={handleProductLiked}
            onProductDisliked={handleProductDisliked}
            onAddToCart={handleAddToCart}
            wishlistCount={wishlist.length}
            cartCount={cart.length}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={setSearchQuery}
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        onShowWishlist={() => console.log('Show wishlist')}
        onShowCart={() => console.log('Show cart')}
      />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <img
          src={heroImage}
          alt="Fashion hero"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold animate-fadeIn">
            Swipe Your Style
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-fadeIn animation-delay-200">
            Discover fashion like never before. Swipe right to love, left to skip.
          </p>
          <Button
            size="lg"
            onClick={() => setCurrentView('swipe')}
            className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white animate-fadeIn animation-delay-400"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Swiping
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Style</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a category to start discovering your perfect outfit through our unique swipe experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <CategoryCard
              id="all"
              name="All Categories"
              icon="✨"
              isSelected={selectedCategory === 'all'}
              onClick={handleCategorySelect}
              className="animate-scaleIn"
            />
            
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                isSelected={selectedCategory === category.id}
                onClick={handleCategorySelect}
                className="animate-scaleIn"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why SwipeStyle?</h2>
            <p className="text-xl text-muted-foreground">
              Shopping made simple, fun, and personal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💫</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Discovery</h3>
                <p className="text-muted-foreground">
                  Find clothes you love in seconds with our intuitive swipe interface
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized</h3>
                <p className="text-muted-foreground">
                  Our algorithm learns your style and shows you items you'll love
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile First</h3>
                <p className="text-muted-foreground">
                  Designed for mobile but works perfectly on desktop too
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
