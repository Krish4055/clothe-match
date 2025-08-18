import { useQuery } from '@tanstack/react-query';
import { getWishlist, ApiProduct } from '@/lib/api';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';

export default function WishlistPage() {
  const { data } = useQuery({ queryKey: ['wishlist'], queryFn: getWishlist });
  const items = (data || []) as ApiProduct[];

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} wishlistCount={items.length} cartCount={0} onShowWishlist={() => {}} onShowCart={() => {}} />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((p) => (
          <Card key={p._id} className="shadow-card">
            <CardContent className="p-0">
              <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-t-xl" />
              <div className="p-4">
                <div className="font-semibold">{p.name}</div>
                <div className="text-muted-foreground">${p.price}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

