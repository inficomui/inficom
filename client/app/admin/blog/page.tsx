'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Post } from '@/types';
import { useGetPostsQuery, useDeletePostMutation } from '@/redux/apis/blogApi';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, Calendar, User } from 'lucide-react';
import BlogModal from './BlogModal';
import Image from 'next/image';

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const { data: postsData, isLoading } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const posts = postsData || [];

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = async (post: Post) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deletePost(post._id!).unwrap();
        toast.success('Blog post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete blog post');
      }
    }
  };

  const handleCreate = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const columns = [
    {
      key: 'image' as keyof Post,
      label: 'Image',
      render: (value: string) => (
        <Image
        height={100}
        width={100}
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${value}`}
          alt="Blog post"
          className="w-16 h-12 rounded object-cover border border-gray-200"
        />
      ),
    },
    {
      key: 'title' as keyof Post,
      label: 'Title',
      sortable: true,
      render: (value: string) => (
        <div className="max-w-xs">
          <span className="font-medium text-gray-900 line-clamp-2">{value}</span>
        </div>
      ),
    },
    {
      key: 'category' as keyof Post,
      label: 'Category',
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      ),
    },
    {
      key: 'author' as keyof Post,
      label: 'Author',
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">{value}</span>
        </div>
      ),
    },
    {
      key: 'date' as keyof Post,
      label: 'Date',
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: 'rating' as keyof Post,
      label: 'Rating',
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: 'comments' as keyof Post,
      label: 'Comments',
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          <MessageCircle className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: 'actions' as keyof Post,
      label: 'Actions',
    },
  ];

  return (
    <>
      <PageHeader
        title="Blog Posts"
        description="Manage your blog content and articles"
      />

      <DataTable
        data={posts}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        searchPlaceholder="Search blog posts..."
        isLoading={isLoading}
      />

      <BlogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </>
  );
}