'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Testimonial } from '@/types';
import { useGetTestimonialsQuery, useDeleteTestimonialMutation } from '@/redux/apis/testimonialsApi';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import TestimonialModal from './TestimonialModal';
import Image from 'next/image';

export default function TestimonialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  
  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const testimonials = testimonialsData || [];

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(testimonial._id).unwrap();
        toast.success('Testimonial deleted successfully');
      } catch (error) {
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const handleCreate = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  const columns = [
    {
      key: 'name' as keyof Testimonial,
      label: 'Name',
      sortable: true,
    },
    {
      key: 'role' as keyof Testimonial,
      label: 'Role',
      render: (value: string) => (
        <span className="text-gray-600">{value}</span>
      ),
    },
    {
      key: 'text' as keyof Testimonial,
      label: 'Testimonial',
      render: (value: string) => (
        <span className="text-gray-600 max-w-xs truncate block">
          {value}
        </span>
      ),
    },
    {
      key: 'stars' as keyof Testimonial,
      label: 'Rating',
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < value ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      ),
    },
    {
      key: 'size' as keyof Testimonial,
      label: 'Size',
      render: (value: string) => (
        <Badge variant={value === 'large' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'image' as keyof Testimonial,
      label: 'Image',
      render: (value: string) => (
        <Image
        height={100}
        width={100}
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${value}`}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      ),
    },
    {
      key: 'actions' as keyof Testimonial,
      label: 'Actions',
    },
  ];

  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Manage customer testimonials and reviews"
      />

      <DataTable
        data={testimonials}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        searchPlaceholder="Search testimonials..."
        isLoading={isLoading}
      />

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        testimonial={selectedTestimonial}
      />
    </>
  );
}