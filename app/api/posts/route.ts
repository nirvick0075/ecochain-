import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { createPostSchema, paginationSchema, searchSchema } from '@/lib/validation';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  parseRequestBody,
  getSearchParams,
  paginate,
} from '@/lib/utils/api';

// GET /api/posts - Get all posts with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = getSearchParams(request);
    const { page, limit } = paginationSchema.parse(searchParams);
    const { q, published } = searchSchema.parse(searchParams);
    
    let posts = db.posts.findAll();
    
    // Filter by published status
    if (published !== undefined) {
      posts = posts.filter(post => post.published === published);
    }
    
    // Search in title and content
    if (q) {
      const searchTerm = q.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by creation date (newest first)
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const { items: paginatedPosts, pagination } = paginate(posts, page, limit);
    
    return createSuccessResponse(paginatedPosts, 'Posts retrieved successfully', pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);
    const validatedData = createPostSchema.parse(body);
    
    // Verify author exists
    const author = db.users.findById(validatedData.authorId);
    if (!author) {
      return createErrorResponse('Author not found', 404);
    }
    
    const post = db.posts.create(validatedData);
    return createSuccessResponse(post, 'Post created successfully');
  } catch (error) {
    return handleApiError(error);
  }
}