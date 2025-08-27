'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray, FieldArrayPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ServiceDTO } from '@/types';
import { useCreateServiceMutation, useUpdateServiceMutation } from '@/redux/apis/servicesApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  iconKey: z.string().min(1, 'Icon key is required'),
  description: z.string().min(1, 'Description is required'),
  details: z.string().optional(),
  // ✅ non-optional with defaults
  extraDescription: z.array(z.string()).default(['']),
  features: z.array(z.string()).min(1, 'At least one feature is required').default(['']),
  included: z.array(z.string()).default(['']),
  notIncluded: z.array(z.string()).default(['']),
  terms: z.array(z.string()).default(['']),
  faqs: z.array(z.object({
    q: z.string().min(1, 'Question is required'),
    a: z.string().min(1, 'Answer is required'),
  })).default([{ q: '', a: '' }]),
});

type PrimitiveArrayName =
  | 'features'
  | 'extraDescription'
  | 'included'
  | 'notIncluded'
  | 'terms';

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServiceDTO | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  
  const isEditing = !!service;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      features: [''],
      extraDescription: [''],
      included: [''],
      notIncluded: [''],
      terms: [''],
      faqs: [{ q: '', a: '' }],
    },
  });
// ✅ string arrays
const featuresArray = useFieldArray<ServiceFormData>({
  control,
  name: 'features' as any,          // 👈 cast
});
const extraDescArray = useFieldArray<ServiceFormData>({ control, name: 'extraDescription' as any });
const includedArray  = useFieldArray<ServiceFormData>({ control, name: 'included' as any });
const notIncludedArray = useFieldArray<ServiceFormData>({ control, name: 'notIncluded' as any });
const termsArray = useFieldArray<ServiceFormData>({ control, name: 'terms' as any });

// OBJECT ARRAY — fully typed
const faqsArray = useFieldArray<ServiceFormData, 'faqs'>({
  control,
  name: 'faqs',
});
  useEffect(() => {
    if (service) {
      reset({
        title: service.title,
        iconKey: service.iconKey,
        description: service.description,
        details: service.details || '',
        extraDescription: service.extraDescription || [''],
        features: service.features.length ? service.features : [''],
        included: service.included || [''],
        notIncluded: service.notIncluded || [''],
        terms: service.terms || [''],
        faqs: service.faqs || [{ q: '', a: '' }],
      });
    } else {
      reset({
        title: '',
        iconKey: '',
        description: '',
        details: '',
        extraDescription: [''],
        features: [''],
        included: [''],
        notIncluded: [''],
        terms: [''],
        faqs: [{ q: '', a: '' }],
      });
    }
  }, [service, reset]);

  const onSubmit = async (data: ServiceFormData) => {
    try {
      // Filter out empty strings from arrays
      const cleanData = {
        ...data,
        extraDescription: data.extraDescription?.filter(item => item.trim()) || undefined,
        features: data.features.filter(item => item.trim()),
        included: data.included?.filter(item => item.trim()) || undefined,
        notIncluded: data.notIncluded?.filter(item => item.trim()) || undefined,
        terms: data.terms?.filter(item => item.trim()) || undefined,
        faqs: data.faqs?.filter(faq => faq.q.trim() && faq.a.trim()) || undefined,
      };

      if (isEditing && service) {
        await updateService({
          id: service._id,
          data: cleanData,
        }).unwrap();
        toast.success('Service updated successfully');
      } else {
        await createService(cleanData).unwrap();
        toast.success('Service created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update service' : 'Failed to create service');
    }
  };

// ✅ ArrayField that registers using the actual form key

const ArrayField = ({
  label,
  name,
  fields,
  append,
  remove,
  register,
  error,
}: {
  label: string;
  name: PrimitiveArrayName;
  fields: { id: string }[];
  append: (value: string) => void;  // stays string
  remove: (index: number) => void;
  register: ReturnType<typeof useForm<ServiceFormData>>['register'];
  error?: any;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <Label>{label}</Label>
      <Button type="button" variant="outline" size="sm" onClick={() => append('')}>
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </div>

    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2">
          <Input
            {...register(`${name}.${index}` as const)}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          {fields.length > 1 && (
            <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>

    {error && typeof error.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )}
  </div>
);
const FaqsField = ({
  fields,
  append,
  remove,
  register,
  error,
}: {
  fields: { id: string }[];
  append: (value: { q: string; a: string }) => void; // object value
  remove: (index: number) => void;
  register: ReturnType<typeof useForm<ServiceFormData>>['register'];
  error?: any;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <Label>FAQs</Label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ q: '', a: '' })}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </div>

    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Input
            {...register(`faqs.${index}.q` as const)}
            placeholder="Question"
          />
          <Input
            {...register(`faqs.${index}.a` as const)}
            placeholder="Answer"
          />
          <div className="md:col-span-2">
            <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>

    {error && typeof error.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )}
  </div>
);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Service' : 'Create New Service'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Service title"
                    className="mt-1"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="iconKey">Icon Key</Label>
                  <Input
                    id="iconKey"
                    {...register('iconKey')}
                    placeholder="Globe, Server, etc."
                    className="mt-1"
                  />
                  {errors.iconKey && (
                    <p className="text-red-500 text-sm mt-1">{errors.iconKey.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Brief service description"
                  rows={3}
                  className="mt-1"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="details">Details (Optional)</Label>
                <Textarea
                  id="details"
                  {...register('details')}
                  placeholder="Detailed service description"
                  rows={4}
                  className="mt-1"
                />
              </div>
            </TabsContent>

           <TabsContent
  value="features"
  className="space-y-4 mt-6 data-[state=inactive]:hidden"
  forceMount
>
<ArrayField
  label="Features"
  name="features"
  fields={featuresArray.fields}
  append={featuresArray.append as unknown as (v: string) => void} // narrow just here
  remove={featuresArray.remove}
  register={register}
  error={errors.features}
/>


  <ArrayField
    label="Extra Description"
    name="extraDescription"
    fields={extraDescArray.fields}
    append={extraDescArray.append as unknown as (v: string) => void}
    remove={extraDescArray.remove}
    register={register}
  />
</TabsContent>

<TabsContent
  value="details"
  className="space-y-4 mt-6 data-[state=inactive]:hidden"
  forceMount
>
  <ArrayField
    label="Included"
    name="included"
    fields={includedArray.fields}
    append={includedArray.append as unknown as (v: string) => void}
    remove={includedArray.remove}
    register={register}
  />

  <ArrayField
    label="Not Included"
    name="notIncluded"
    fields={notIncludedArray.fields}
    append={notIncludedArray.append as unknown as (v: string) => void}
    remove={notIncludedArray.remove}
    register={register}
  />

  <ArrayField
    label="Terms"
    name="terms"
    fields={termsArray.fields}
    append={termsArray.append as unknown as (v: string) => void}
    remove={termsArray.remove}
    register={register}
  />
</TabsContent>


            <TabsContent value="faqs" className="space-y-4 mt-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>FAQs</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => faqsArray.append({ q: '', a: '' })}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add FAQ
                  </Button>
                </div>
                <div className="space-y-4">
                  {faqsArray.fields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">FAQ {index + 1}</span>
                        {faqsArray.fields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => faqsArray.remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          {...register(`faqs.${index}.q`)}
                          placeholder="Enter question"
                        />
                        <Textarea
                          {...register(`faqs.${index}.a`)}
                          placeholder="Enter answer"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditing ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}