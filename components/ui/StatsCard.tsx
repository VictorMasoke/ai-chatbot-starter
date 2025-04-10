// components/admin/ui/StatsCard.tsx
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
}

const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  const isPositive = change.startsWith("+");
  
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className={`inline-flex items-center text-sm font-medium ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}>
          {change} from last month
        </span>
      </div>
    </div>
  );
};

export default StatsCard;