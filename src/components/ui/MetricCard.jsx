
import { Card } from './Card';

export const MetricCard = ({ title, value, icon: Icon, trend, className = '', color = 'orange' }) => {
  const colorMap = {
    orange: { border: 'border-l-[var(--color-brand-orange)]', text: 'text-[var(--color-brand-orange)]', bg: 'bg-[var(--color-brand-orange)]/10' },
    teal: { border: 'border-l-[var(--color-brand-teal)]', text: 'text-[var(--color-brand-teal)]', bg: 'bg-[var(--color-brand-teal)]/10' },
    gray: { border: 'border-l-gray-400', text: 'text-gray-500', bg: 'bg-gray-100' },
  };

  const selectedColor = colorMap[color] || colorMap.orange;

  return (
    <Card className={`border-l-4 ${selectedColor.border} ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {trend !== undefined && (
            <p className={`mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-full ${selectedColor.bg}`}>
            <Icon className={`w-6 h-6 ${selectedColor.text}`} />
          </div>
        )}
      </div>
    </Card>
  );
};
