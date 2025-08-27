'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ReduxProvider from '@/components/providers/ReduxProvider';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AdminLayout>{children}</AdminLayout>
    </ReduxProvider>
  );
}