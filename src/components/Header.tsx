import { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  onSearch: (query: string) => void;
  wishlistCount: number;
  cartCount: number;
  onShowWishlist: () => void;
  onShowCart: () => void;
}

export function Header({ onSearch, wishlistCount, cartCount, onShowWishlist, onShowCart }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            SwipeStyle
          </h1>
        </div>

        {/* Search bar - hidden on mobile */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for clothes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search button for mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-20">
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search for clothes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onShowWishlist}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onShowCart}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Button variant="ghost" className="justify-start">
                  Categories
                </Button>
                <Button variant="ghost" className="justify-start">
                  New Arrivals
                </Button>
                <Button variant="ghost" className="justify-start">
                  Sale
                </Button>
                <Button variant="ghost" className="justify-start">
                  About
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}