import logo from "@/public/logo.png"
import blackLogo from "@/public/black-logo.png"
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  showLogo?: boolean; // optional toggle
}

export default function PageHeader({ title, description, action, showLogo = true }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && <p className="mt-2 text-gray-600">{description}</p>}
        </div>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}