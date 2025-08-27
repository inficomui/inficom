'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Testimonial } from '@/types';
import {
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
} from '@/redux/apis/testimonialsApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

/**
 * Zod schema:
 * - When creating: imageFile required
 * - When editing: imageFile optional (keep existing image if none selected)
 */
const baseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  text: z.string().min(1, 'Testimonial text is required'),
  // We'll store the File in RHF as `imageFile` (not a URL)
  imageFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Image must be 5MB or smaller'
    )
    .refine(
      (file) => !file || /^image\/(png|jpe?g|webp|gif|svg\+xml)$/i.test(file.type),
      'Only PNG, JPG, JPEG, WEBP, GIF, or SVG images are allowed'
    ),
  stars: z.number().min(1).max(5),
  size: z.enum(['small', 'large']),
});

type TestimonialFormData = z.infer<typeof baseSchema>;

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial?: Testimonial | null;
}

export default function TestimonialModal({ isOpen, onClose, testimonial }: TestimonialModalProps) {
  const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();

  const isEditing = !!testimonial;
  const isLoading = isCreating || isUpdating;

  // Build a schema that requires imageFile only when creating
  const schema = useMemo(() => {
    if (isEditing) return baseSchema; // optional on edit
    // require on create
    return baseSchema.extend({
      imageFile: baseSchema.shape.imageFile.refine((file) => !!file, 'Image is required'),
    });
  }, [isEditing]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      role: '',
      text: '',
      imageFile: undefined,
      stars: 5,
      size: 'small',
    },
  });

  // Local preview URL for the selected file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Watch file selection
  const imageFile = watch('imageFile');

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const file = imageFile as File;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (testimonial) {
      reset({
        name: testimonial.name,
        role: testimonial.role,
        text: testimonial.text,
        imageFile: undefined, // keep empty; existing image shown via testimonial.image
        stars: testimonial.stars,
        size: testimonial.size,
      });
      setPreviewUrl(null);
    } else {
      reset({
        name: '',
        role: '',
        text: '',
        imageFile: undefined,
        stars: 5,
        size: 'small',
      });
      setPreviewUrl(null);
    }
  }, [testimonial, reset]);

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('role', data.role);
      formData.append('text', data.text);
      formData.append('stars', String(data.stars));
      formData.append('size', data.size);

      // Only append image if a new file is selected
      if (data.imageFile instanceof File) {
        formData.append('image', data.imageFile);
      }

      if (isEditing && testimonial) {
        await updateTestimonial({
          id: testimonial._id,
          data: formData,
        }).unwrap();
        toast.success('Testimonial updated successfully');
      } else {
        await createTestimonial(formData).unwrap();
        toast.success('Testimonial created successfully');
      }

      onClose();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update testimonial' : 'Failed to create testimonial');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          sm:max-w-[680px]
          p-0
          overflow-hidden
          !rounded-2xl
          shadow-2xl
          border
          border-white/10
          bg-gradient-to-b from-background to-background/95
          flex flex-col
          max-h-[92vh]
        "
      >
        {/* Sticky Header */}
        <DialogHeader
          className="
            sticky top-0 z-10
            px-6 pt-6 pb-4
            border-b
            bg-gradient-to-r from-blue-600/10 to-orange-500/10
            backdrop-blur
          "
        >
          <DialogTitle className="text-lg md:text-xl font-extrabold tracking-tight">
            {isEditing ? (
              <>
                Edit <span className="text-blue-600">Testimonial</span>
              </>
            ) : (
              <>
                Create <span className="text-blue-600">Testimonial</span>
              </>
            )}
          </DialogTitle>

          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 text-xs text-muted-foreground"
          >
            Provide honest feedback and optionally upload an avatar image.
          </motion.p>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="px-6 py-5 overflow-y-auto grow">
          <form id="testimonial-form" onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* Identity */}
            <section>
              <motion.h4
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-semibold text-blue-600"
              >
                Identity
              </motion.h4>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-[13px] font-medium">
                    Name
                  </Label>
                  <Input id="name" {...register('name')} placeholder="Customer name" className="mt-1" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="role" className="text-[13px] font-medium">
                    Role
                  </Label>
                  <Input id="role" {...register('role')} placeholder="Job title, Company" className="mt-1" />
                  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                </div>
              </div>
            </section>

            {/* Testimonial */}
            <section>
              <motion.h4
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="text-sm font-semibold text-blue-600"
              >
                Testimonial
              </motion.h4>
              <div className="mt-3">
                <Label htmlFor="text" className="text-[13px] font-medium">
                  Testimonial Text
                </Label>
                <Textarea
                  id="text"
                  {...register('text')}
                  placeholder="What did they say?"
                  rows={4}
                  className="mt-1"
                />
                {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
              </div>
            </section>

            {/* Media & Meta */}
            <section>
              <motion.h4
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="text-sm font-semibold text-blue-600"
              >
                Media & Meta
              </motion.h4>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File picker (no URL) */}
                <div>
                  <Label htmlFor="imageFile" className="text-[13px] font-medium">
                    Image (PNG/JPG/WEBP/GIF/SVG)
                  </Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
                    className="mt-1"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      // Register expects a value set through setValue for controlled files
                      setValue('imageFile', file as File | undefined, { shouldValidate: true });
                    }}
                  />
                  {errors.imageFile && (
                    <p className="text-red-500 text-xs mt-1">{errors.imageFile.message as string}</p>
                  )}

                  {/* Preview: prefer newly selected file; otherwise show existing (edit mode) */}
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image width={100} height={100}
                      src={previewUrl}
                      alt="Preview"
                      className="mt-2 h-16 w-16 rounded-full object-cover border"
                    />
                  ) : isEditing && testimonial?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={testimonial.image}
                      alt="Existing"
                      className="mt-2 h-16 w-16 rounded-full object-cover border"
                    />
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stars" className="text-[13px] font-medium">
                      Rating
                    </Label>
                    <Select
                      value={watch('stars')?.toString()}
                      onValueChange={(v) => setValue('stars', parseInt(v))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((r) => (
                          <SelectItem key={r} value={String(r)}>
                            {r} Star{r > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.stars && (
                      <p className="text-red-500 text-xs mt-1">{errors.stars.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="size" className="text-[13px] font-medium">
                      Size
                    </Label>
                    <Select
                      value={watch('size')}
                      onValueChange={(v) => setValue('size', v as 'small' | 'large')}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size.message}</p>}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Sticky Footer */}
        <div
          className="
            sticky bottom-0 z-10
            w-full border-t
            bg-background/85 backdrop-blur
            supports-[backdrop-filter]:bg-background/60
          "
        >
          <div className="flex justify-end gap-3 px-6 py-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="testimonial-form" disabled={isLoading}>
              {isLoading ? 'Saving…' : isEditing ? 'Update Testimonial' : 'Create Testimonial'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
