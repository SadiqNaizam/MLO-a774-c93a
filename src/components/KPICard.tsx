import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react'; // For icon prop

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon; // Optional icon from lucide-react
  trend?: 'up' | 'down' | 'neutral'; // Optional trend indicator
  trendValue?: string; // e.g., "+5.2%"
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  description,
  icon: IconComponent,
  trend,
  trendValue,
  className,
}) => {
  console.log("Rendering KPICard:", title);

  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground';

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
            <p className={`text-xs ${trendColor} mt-1`}>
                {trendValue}
            </p>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;