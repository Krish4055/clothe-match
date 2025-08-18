import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  isSelected?: boolean;
  onClick: (categoryId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CategoryCard({ id, name, icon, isSelected, onClick, className, style }: CategoryCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-105 shadow-card",
        isSelected ? "ring-2 ring-primary gradient-primary text-primary-foreground" : "hover:shadow-elegant",
        className
      )}
      style={style}
      onClick={() => onClick(id)}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
        <span className="text-3xl" role="img" aria-label={name}>
          {icon}
        </span>
        <span className="font-medium text-sm">{name}</span>
      </CardContent>
    </Card>
  );
}