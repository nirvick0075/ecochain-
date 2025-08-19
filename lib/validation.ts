import { z } from 'zod';

// User validation schemas
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
  email: z.string().email('Invalid email format').optional(),
});

// Post validation schemas
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.string().min(1, 'Author ID is required'),
  published: z.boolean().default(false),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  published: z.boolean().optional(),
});

// Product validation schemas
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  inStock: z.boolean().default(true),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  price: z.number().positive('Price must be positive').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  inStock: z.boolean().optional(),
});

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val) || 1),
  limit: z.string().transform(val => Math.min(parseInt(val) || 10, 100)),
});

export const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  published: z.string().transform(val => val === 'true').optional(),
});