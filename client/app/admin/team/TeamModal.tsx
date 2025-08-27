'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { TeamMember } from '@/types';
import {
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
} from '@/redux/apis/teamApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils'; // optional: if you have a classnames helper

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  image: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : ''))
    .refine((v) => v === '' || /^https?:\/\/.+/i.test(v), {
      message: 'Must be a valid URL',
    }),
  // We'll keep this as any; we validate either-or manually on submit for simpler UX
  imageFile: z.any().optional(),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: TeamMember | null;
}

const commonRoles = [
  'Founder',
  'Co-founder',
  'CEO',
  'CTO',
  'Senior Developer',
  'Junior Developer',
  'UI/UX Designer',
  'Project Manager',
  'Marketing Manager',
  'Sales Manager',
];

export default function TeamModal({ isOpen, onClose, member }: TeamModalProps) {
  const [createTeamMember, { isLoading: isCreating }] =
    useCreateTeamMemberMutation();
  const [updateTeamMember, { isLoading: isUpdating }] =
    useUpdateTeamMemberMutation();

  const isEditing = !!member;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: '',
      role: '',
      image: '',
      imageFile: undefined,
    },
  });

  // --- PREVIEW STATE ---
  const [preview, setPreview] = useState<string>('');

  // watch fields
  const roleValue = watch('role');
  const urlValue = watch('image');

  // initialize/reset form + preview
  useEffect(() => {
    if (member) {
      reset({
        name: member.name ?? '',
        role: member.role ?? '',
        image: typeof member.image === 'string' ? member.image : '',
        imageFile: undefined,
      });
      setPreview(typeof member.image === 'string' ? member.image : '');
    } else {
      reset({
        name: '',
        role: '',
        image: '',
        imageFile: undefined,
      });
      setPreview('');
    }
  }, [member, reset]);

  // update preview when URL changes (but only if no file preview currently set)
  useEffect(() => {
    // if user cleared URL, and no file chosen, clear preview
    if (urlValue && !urlValue.startsWith('blob:')) {
      setPreview(urlValue);
    } else if (!urlValue) {
      // don't auto-clear if a file is selected (it will be a blob url)
      // here we only clear if preview is a URL and user erased the URL
      // If preview is blob:, keep it.
      setPreview((prev) => (prev?.startsWith('blob:') ? prev : ''));
    }
  }, [urlValue]);

  // handle file change to set preview
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    setValue('imageFile', e.target.files as any, { shouldValidate: true });
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      // If no file selected, fall back to URL preview
      setPreview(urlValue || '');
    }
  };

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      const chosenFile =
        data.imageFile instanceof FileList && data.imageFile.length > 0
          ? data.imageFile[0]
          : undefined;

      // simple either-or validation (URL or File)
      if (!chosenFile && !data.image) {
        toast.error('Please upload an image or provide an image URL.');
        return;
      }

      const form = new FormData();
      form.append('name', data.name);
      form.append('role', data.role);
      if (chosenFile) {
        form.append('image', chosenFile); // multer will pick this up
      } else if (data.image) {
        form.append('image', data.image); // backend will use URL fallback
      }

      if (isEditing && member?._id) {
        await updateTeamMember({ id: member._id, data: form }).unwrap();
        toast.success('Team member updated successfully');
        setPreview('')
      } else {
        await createTeamMember(form).unwrap();
        setPreview('')
        toast.success('Team member created successfully');
      }
      
      reset()
      onClose();
    } catch {
      toast.error(
        isEditing ? 'Failed to update team member' : 'Failed to create team member'
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Scrollable content + nicer typography */}
      <DialogContent className="sm:max-w-[540px] max-h-[85vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            {isEditing ? 'Edit Team Member' : 'Add New Team Member'}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="e.g., Rahul Patel"
                className="mt-1 focus-visible:ring-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role" className="text-sm font-semibold text-foreground">
                Role / Position
              </Label>
              <Input
                id="role"
                {...register('role')}
                placeholder="e.g., Senior Developer"
                className="mt-1 focus-visible:ring-2"
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}

              <div className="mt-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Quick select:
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonRoles.map((role) => (
                    <Button
                      key={role}
                      type="button"
                      variant={roleValue === role ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setValue('role', role, { shouldValidate: true })}
                      className={cn(
                        'text-xs',
                        roleValue === role ? '' : 'hover:border-primary/50'
                      )}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image uploader + URL */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageFile" className="text-sm font-semibold">
                  Upload Profile Image
                </Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}

                  
                  className="mt-1 cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  PNG/JPG/WEBP up to 10MB
                </p>
              </div>

              <div className="text-center text-xs text-muted-foreground select-none">
                — or —
              </div>

              <div>
                <Label htmlFor="image" className="text-sm font-semibold">
                  Profile Image URL
                </Label>
                <Input
                  id="image"
                  {...register('image')}
                  placeholder="https://example.com/photo.jpg"
                  className="mt-1"
                  onBlur={(e) => {
                    // update preview if user typed/pasted a URL
                    const v = e.currentTarget.value.trim();
                    if (v && !v.startsWith('blob:')) setPreview(v);
                  }}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended size: 400×400px (square headshot)
                </p>
              </div>

              {/* Preview */}
              {preview && (
                <div className="pt-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Preview
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover border shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* Sticky footer actions */}
            <div className="h-2" />
            <div className="sticky bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-6 px-6 py-4 border-t flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
