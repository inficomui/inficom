'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { TeamMember } from '@/types';
import { useGetTeamMembersQuery, useDeleteTeamMemberMutation } from '@/redux/apis/teamApi';
import PageHeader from '@/components/admin/PageHeader';
import DataTable, { Column } from '@/components/admin/DataTable';
import TeamModal from './TeamModal';
import Image from 'next/image';

export default function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
const { data: teamRes, isLoading } = useGetTeamMembersQuery();
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

const teamMembers: TeamMember[] = Array.isArray(teamRes)
  ? teamRes
  : (teamRes ?? []);

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = async (member: TeamMember) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(member._id!).unwrap();
        toast.success('Team member deleted successfully');
      } catch (error) {
        toast.error('Failed to delete team member');
      }
    }
  };

  const handleCreate = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const columns: Column<TeamMember>[] = [
  {
    key: 'image',
    label: 'Photo',
    render: (value: string, _item) => (
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${value || ''}`}
        alt="Team member"
        width={48}
        height={48}
        className="rounded-full object-cover border-2 border-gray-200"
      />
    ),
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    render: (value: string) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: 'role',
    label: 'Role',
    render: (value: string) => (
      <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm">
        {value}
      </span>
    ),
  },
  {
    key: 'actions',          
    label: 'Actions',
  },
]

  return (
    <>
      <PageHeader
        title="Team Members"
        description="Manage your team members and their roles"
      />

       <DataTable<TeamMember>   
      data={teamMembers}        
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      searchPlaceholder="Search team members..."
      isLoading={isLoading}
    />

      <TeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
      />
    </>
  );
}