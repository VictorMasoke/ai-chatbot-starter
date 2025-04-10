// components/admin/ui/ChartCard.tsx
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon: ReactNode;
}

const ChartCard = ({ title, children, className = "", icon }: ChartCardProps) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="p-2 rounded-full bg-gray-100 text-gray-600">
          {icon}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;