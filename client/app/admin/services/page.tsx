'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ServiceDTO } from '@/types';
import { useGetServicesQuery, useDeleteServiceMutation } from '@/redux/apis/servicesApi';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import ServiceModal from './ServiceModal';

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDTO | null>(null);
  
  const { data: servicesData, isLoading } = useGetServicesQuery();
  // console.log("servicesData", servicesData);
  
  const [deleteService] = useDeleteServiceMutation();
const EMPTY_SERVICES: ServiceDTO[] = [];
const services: ServiceDTO[] = servicesData
  ? servicesData.map(s => ({ ...s, id: s._id })) // keep id mirror; _id may be string | number
  : EMPTY_SERVICES;

  const handleEdit = (service: ServiceDTO) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (service: ServiceDTO) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(service._id).unwrap();
        toast.success('Service deleted successfully');
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  const handleCreate = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const columns = [
    {
      key: 'title' as keyof ServiceDTO,
      label: 'Title',
      sortable: true,
    },
    {
      key: 'description' as keyof ServiceDTO,
      label: 'Description',
      render: (value: string) => (
        <span className="text-gray-600 max-w-xs truncate block">
          {value}
        </span>
      ),
    },
    {
      key: 'iconKey' as keyof ServiceDTO,
      label: 'Icon',
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      ),
    },
    {
      key: 'features' as keyof ServiceDTO,
      label: 'Features',
      render: (value: string[]) => (
        <Badge variant="outline">
          {value?.length || 0} features
        </Badge>
      ),
    },
    {
      key: 'actions' as keyof ServiceDTO,
      label: 'Actions',
    },
  ];

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage company services and offerings"
      />

      <DataTable
        data={services || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        searchPlaceholder="Search services..."
        isLoading={isLoading}
      />

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </>
  );
}