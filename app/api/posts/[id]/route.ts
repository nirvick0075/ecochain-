import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { updatePostSchema } from '@/lib/validation';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  parseRequestBody,
} from '@/lib/utils/api';

interface RouteParams {
  params: { id: string };
}

// GET /api/posts/[id] - Get post by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const post = db.posts.findById(params.id);
    
    if (!post) {
      return createErrorResponse('Post not found', 404);
    }
    
    // Get author information
    const author = db.users.findById(post.authorId);
    const postWithAuthor = {
      ...post,
      author: author ? { id: author.id, name: author.name, email: author.email } : null,
    };
    
    return createSuccessResponse(postWithAuthor, 'Post retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/posts/[id] - Update post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await parseRequestBody(request);
    const validatedData = updatePostSchema.parse(body);
    
    const existingPost = db.posts.findById(params.id);
    if (!existingPost) {
      return createErrorResponse('Post not found', 404);
    }
    
    const updatedPost = db.posts.update(params.id, validatedData);
    return createSuccessResponse(updatedPost, 'Post updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/posts/[id] - Delete post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const deleted = db.posts.delete(params.id);
    
    if (!deleted) {
      return createErrorResponse('Post not found', 404);
    }
    
    return createSuccessResponse(null, 'Post deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}