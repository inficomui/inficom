'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FeatureDTO } from '@/types';
import { useCreateFeatureMutation, useUpdateFeatureMutation } from '@/redux/apis/featuresApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const featureSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  desc: z.string().min(1, 'Description is required'),
  iconKey: z.string().min(1, 'Icon key is required'),

});

type FeatureFormData = z.infer<typeof featureSchema>;

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: FeatureDTO | null;
}

const commonIcons = [
  'Zap', 'MonitorSmartphone', 'Lock', 'Headset', 'Wrench', 
  'ArrowUpRight', 'Database', 'ShieldCheck', 'ArrowLeftRight',
  'Globe', 'Server', 'Smartphone', 'Code', 'Shield', 'ShoppingCart'
];

export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const [createFeature, { isLoading: isCreating }] = useCreateFeatureMutation();
  const [updateFeature, { isLoading: isUpdating }] = useUpdateFeatureMutation();
  
  const isEditing = !!feature;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeatureFormData>({
    resolver: zodResolver(featureSchema),
  });

  const selectedIcon = watch('iconKey');

  useEffect(() => {
    if (feature) {
      reset({
        title: feature.title,
        desc: feature.desc,
        iconKey: feature.iconKey,
     
      });
    } else {
      reset({
        title: '',
        desc: '',
        iconKey: '',
       
      });
    }
  }, [feature, reset]);

  const onSubmit = async (data: FeatureFormData) => {
    try {
      if (isEditing && feature) {
        await updateFeature({
          id: feature._id,
          data,
        }).unwrap();
        toast.success('Feature updated successfully');
      } else {
        await createFeature({
          ...data,
        
        }).unwrap();
        toast.success('Feature created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update feature' : 'Failed to create feature');
    }
  };

  return (
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
    {/* Header */}
    <DialogHeader className="px-6 pt-6 pb-4 border-b">
      <DialogTitle>
        {isEditing ? 'Edit Feature' : 'Create New Feature'}
      </DialogTitle>
    </DialogHeader>

    {/* Scrollable body */}
    <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
      <form id="feature-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register('title')} placeholder="Enter feature title" className="mt-1" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" {...register('desc')} placeholder="Enter feature description" rows={3} className="mt-1" />
          {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>}
        </div>

        <div>
          <Label htmlFor="iconKey">Icon Key</Label>
          <Input id="iconKey" {...register('iconKey')} placeholder="e.g., Zap, Globe" className="mt-1" />
          {errors.iconKey && <p className="text-red-500 text-sm mt-1">{errors.iconKey.message}</p>}

          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Common icons:</p>
            <div className="flex flex-wrap gap-2">
              {commonIcons.map((icon) => (
                <Button
                  key={icon}
                  type="button"
                  variant={selectedIcon === icon ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setValue('iconKey', icon, { shouldValidate: true })}
                  className="text-xs"
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>
        </div>

       
      </form>
    </div>

    {/* Sticky footer with actions */}
    <div className="sticky bottom-0 w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-end gap-3 px-6 py-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" form="feature-form" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditing ? 'Update Feature' : 'Create Feature'}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
}