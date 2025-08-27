'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { NotificationBanner } from '@/types';
import { useCreateNotificationMutation, useUpdateNotificationMutation } from '@/redux/apis/notificationsApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const notificationSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  link: z.string().optional(),
  color: z.string().min(1, 'Color is required'),
  isActive: z.boolean(),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification?: NotificationBanner | null;
}

const predefinedColors = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Gray', value: '#6B7280' },
];

export default function NotificationModal({ isOpen, onClose, notification }: NotificationModalProps) {
  const [createNotification, { isLoading: isCreating }] = useCreateNotificationMutation();
  const [updateNotification, { isLoading: isUpdating }] = useUpdateNotificationMutation();
  
  const isEditing = !!notification;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
  });

  const selectedColor = watch('color');
  const isActive = watch('isActive');

  useEffect(() => {
    if (notification) {
      reset({
        message: notification.message,
        link: notification.link || '',
        color: notification.color,
        isActive: notification.isActive,
      });
    } else {
      reset({
        message: '',
        link: '',
        color: '#3B82F6',
        isActive: true,
      });
    }
  }, [notification, reset]);

  const onSubmit = async (data: NotificationFormData) => {
    try {
      const submitData = {
        ...data,
        link: data.link || undefined,
      };

      if (isEditing && notification) {
        await updateNotification({
          id: notification.id,
          data: submitData,
        }).unwrap();
        toast.success('Notification updated successfully');
      } else {
        await createNotification(submitData).unwrap();
        toast.success('Notification created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update notification' : 'Failed to create notification');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Notification' : 'Create New Notification'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Enter notification message"
              rows={3}
              className="mt-1"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="link">Link (Optional)</Label>
            <Input
              id="link"
              {...register('link')}
              placeholder="https://example.com"
              className="mt-1"
            />
            {errors.link && (
              <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Optional link for users to click on the notification
            </p>
          </div>

          <div>
            <Label htmlFor="color">Background Color</Label>
            <div className="mt-2 space-y-3">
              <Input
                id="color"
                {...register('color')}
                placeholder="#3B82F6"
                className="font-mono"
              />
              
              <div className="grid grid-cols-4 gap-2">
                {predefinedColors.map((color) => (
                  <Button
                    key={color.value}
                    type="button"
                    variant={selectedColor === color.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setValue('color', color.value)}
                    className="flex items-center space-x-2"
                  >
                    <div 
                      className="w-4 h-4 rounded border border-gray-200"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-xs">{color.name}</span>
                  </Button>
                ))}
              </div>

              {selectedColor && (
                <div className="mt-3 p-3 rounded-lg border" style={{ backgroundColor: selectedColor }}>
                  <p className="text-white text-sm font-medium">
                    Preview: {watch('message') || 'Your notification message will appear here'}
                  </p>
                </div>
              )}
            </div>
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setValue('isActive', checked)}
            />
            <Label htmlFor="isActive">
              Active (notification will be displayed on the website)
            </Label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditing ? 'Update Notification' : 'Create Notification'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}