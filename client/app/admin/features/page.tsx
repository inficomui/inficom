'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FeatureDTO } from '@/types';
import { useGetFeaturesQuery, useDeleteFeatureMutation } from '@/redux/apis/featuresApi';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FeatureModal from './FeatureModal';

export default function FeaturesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureDTO | null>(null);
  
  const { data: featuresData, isLoading } = useGetFeaturesQuery();
  const [deleteFeature] = useDeleteFeatureMutation();

  const features = featuresData|| [];

  const handleEdit = (feature: FeatureDTO) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleDelete = async (feature: FeatureDTO) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      try {
        await deleteFeature(feature._id).unwrap();
        toast.success('Feature deleted successfully');
      } catch (error) {
        toast.error('Failed to delete feature');
      }
    }
  };

  const handleCreate = () => {
    setSelectedFeature(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  const columns = [
    {
      key: 'title' as keyof FeatureDTO,
      label: 'Title',
      sortable: true,
    },
    {
      key: 'desc' as keyof FeatureDTO,
      label: 'Description',
      render: (value: string) => (
        <span className="text-gray-600 max-w-xs truncate block">
          {value}
        </span>
      ),
    },
    {
      key: 'iconKey' as keyof FeatureDTO,
      label: 'Icon',
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      ),
    },
    {
      key: 'color' as keyof FeatureDTO,
      label: 'Color',
      render: (value: string) => (
        value ? (
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded border border-gray-200"
              style={{ backgroundColor: value }}
            />
            <span className="text-xs font-mono">{value}</span>
          </div>
        ) : (
          <span className="text-gray-400">None</span>
        )
      ),
    },
    {
      key: 'actions' as keyof FeatureDTO,
      label: 'Actions',
    },
  ];

  return (
    <>
      <PageHeader
        title="Features"
        description="Manage website features and their descriptions"
      />

      <DataTable
        data={features}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        searchPlaceholder="Search features..."
        isLoading={isLoading}
      />

      <FeatureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        feature={selectedFeature}
      />
    </>
  );
}