'use client';

import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-72">
        <main className="px-4 py-8 lg:px-8">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}