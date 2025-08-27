'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Post } from '@/types';
import { useCreatePostMutation, useUpdatePostMutation } from '@/redux/apis/blogApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image as ImageIcon, UploadCloud, Loader2 } from 'lucide-react';
import clsx from 'clsx';

// Accept http(s) URL OR a local /uploads path
const postSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(1),
  date: z.string().min(1),
  comments: z.coerce.number().min(0),
  rating: z.coerce.number().min(1).max(5),
  desc: z.string().min(1),
  href: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal('')),
});
type PostFormData = z.infer<typeof postSchema>;

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: Post | null;
}

const categories = [
  'Solution',
  'Technology',
  'Business',
  'Marketing',
  'Development',
  'Design',
  'SEO',
  'Tips & Tricks',
];

export default function BlogModal({ isOpen, onClose, post }: BlogModalProps) {
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const isEditing = !!post;
  const isSubmitting = isCreating || isUpdating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } =
    useForm<PostFormData>({ resolver: zodResolver(postSchema) });

  // File kept outside RHF
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageUrl = watch('imageUrl') || '';

  // Preview: file takes precedence
  const previewSrc = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return imageUrl || '';
  }, [imageFile, imageUrl]);

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        category: post.category,
        author: post.author,
        date: post.date,
        comments: post.comments,
        rating: post.rating,
        desc: post.desc,
        href: post.href,
        imageUrl: post.image?.startsWith('http') ? post.image : '', // keep URL if external
      });
    } else {
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
      reset({ title: '', category: '', author: 'Admin', date: today, comments: 0, rating: 5, desc: '', href: '', imageUrl: '' });
      setImageFile(null);
    }
  }, [post, reset]);

  useEffect(() => {
    return () => { if (imageFile) URL.revokeObjectURL(previewSrc); };
  }, [imageFile, previewSrc]);

  function onFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // optional: clear URL field when picking a file
      setValue('imageUrl', '');
    }
  }

  const onSubmit = async (data: PostFormData) => {
    try {
      if (!imageFile && !data.imageUrl) {
        toast.error('Please select an image file or provide an image URL');
        return;
      }

      // Build multipart form
      const form = new FormData();
      form.append('title', data.title);
      form.append('category', data.category);
      form.append('author', data.author);
      form.append('date', data.date);
      form.append('comments', String(data.comments));
      form.append('rating', String(data.rating));
      form.append('desc', data.desc);
      form.append('href', data.href);

      // The controller checks: req.file OR req.body.image
      if (imageFile) {
        form.append('image', imageFile);            // <-- file field
      } else if (data.imageUrl) {
        form.append('image', data.imageUrl);        // <-- text field
      }

      if (isEditing && post) {
        await updatePost({ id: String(post._id), body: form }).unwrap();
        toast.success('Blog post updated successfully');
      } else {
        await createPost(form).unwrap();
        toast.success('Blog post created successfully');
      }
      onClose();
    } catch (e) {
      toast.error(isEditing ? 'Failed to update blog post' : 'Failed to create blog post');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: main fields */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} placeholder="Enter blog post title" className="mt-1" />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={watch('category')} onValueChange={(value) => setValue('category', value, { shouldValidate: true })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" {...register('author')} placeholder="Author name" className="mt-1" />
                  {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  {...register('desc')}
                  placeholder="Brief description of the blog post"
                  rows={4}
                  className="mt-1"
                />
                {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="href">URL Slug</Label>
                  <Input id="href" {...register('href')} placeholder="/blog/your-post-slug" className="mt-1" />
                  {errors.href && <p className="text-red-500 text-sm mt-1">{errors.href.message}</p>}
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" {...register('date')} placeholder="May 02, 2025" className="mt-1" />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={watch('rating')?.toString()}
                    onValueChange={(value) => setValue('rating', parseInt(value), { shouldValidate: true })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} Star{rating > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                </div>

                <div>
                  <Label htmlFor="comments">Comments Count</Label>
                  <Input
                    id="comments"
                    type="number"
                    {...register('comments', { valueAsNumber: true })}
                    placeholder="0"
                    min={0}
                    className="mt-1"
                  />
                  {errors.comments && <p className="text-red-500 text-sm mt-1">{errors.comments.message}</p>}
                </div>
              </div>
            </div>

            {/* Right: image card */}
            {/* Right: image */}
            <div className="space-y-3">
              <Label>Featured Image</Label>
              <div className="aspect-video w-full rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center">
                {previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewSrc} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-sm">No image selected</div>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setImageFile(f);
                      setValue('imageUrl', '');
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Or paste Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg or leave empty"
                  {...register('imageUrl')}
                  onChange={(e) => {
                    // typing URL clears selected file
                    setImageFile(null);
                    setValue('imageUrl', e.target.value, { shouldValidate: true });
                  }}
                  className="mt-1"
                />
                {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
             <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : isEditing ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
