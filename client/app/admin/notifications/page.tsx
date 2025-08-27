  'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { NotificationBanner } from '@/types';
import { useGetNotificationsQuery, useDeleteNotificationMutation } from '@/redux/apis/notificationsApi';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import NotificationModal from './NotificationModal';

export default function NotificationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationBanner | null>(null);
  
  const { data: notificationsData, isLoading } = useGetNotificationsQuery();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notificationsData?.data || [];

  const handleEdit = (notification: NotificationBanner) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleDelete = async (notification: NotificationBanner) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      try {
        await deleteNotification(notification.id).unwrap();
        toast.success('Notification deleted successfully');
      } catch (error) {
        toast.error('Failed to delete notification');
      }
    }
  };

  const handleCreate = () => {
    setSelectedNotification(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const columns = [
    {
      key: 'message' as keyof NotificationBanner,
      label: 'Message',
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-900 max-w-md truncate block">{value}</span>
      ),
    },
    {
      key: 'color' as keyof NotificationBanner,
      label: 'Color',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded border border-gray-200"
            style={{ backgroundColor: value }}
          />
          <span className="text-xs font-mono">{value}</span>
        </div>
      ),
    },
    {
      key: 'link' as keyof NotificationBanner,
      label: 'Link',
      render: (value: string) => (
        value ? (
          <div className="flex items-center space-x-1">
            <ExternalLink className="h-4 w-4 text-gray-400" />
            <span className="text-blue-600 text-sm truncate max-w-xs">{value}</span>
          </div>
        ) : (
          <span className="text-gray-400">No link</span>
        )
      ),
    },
    {
      key: 'isActive' as keyof NotificationBanner,
      label: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'actions' as keyof NotificationBanner,
      label: 'Actions',
    },
  ];

  return (
    <>
      <PageHeader
        title="Notification Banners"
        description="Manage website notification banners and announcements"
      />

      <DataTable
        data={notifications}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        searchPlaceholder="Search notifications..."
        isLoading={isLoading}
      />

      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        notification={selectedNotification}
      />
    </>
  );
}