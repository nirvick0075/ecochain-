import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { updateUserSchema } from '@/lib/validation';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  parseRequestBody,
} from '@/lib/utils/api';

interface RouteParams {
  params: { id: string };
}

// GET /api/users/[id] - Get user by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = db.users.findById(params.id);
    
    if (!user) {
      return createErrorResponse('User not found', 404);
    }
    
    return createSuccessResponse(user, 'User retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await parseRequestBody(request);
    const validatedData = updateUserSchema.parse(body);
    
    // Check if user exists
    const existingUser = db.users.findById(params.id);
    if (!existingUser) {
      return createErrorResponse('User not found', 404);
    }
    
    // Check if email is being updated and already exists
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const userWithEmail = db.users.findByEmail(validatedData.email);
      if (userWithEmail) {
        return createErrorResponse('User with this email already exists', 409);
      }
    }
    
    const updatedUser = db.users.update(params.id, validatedData);
    return createSuccessResponse(updatedUser, 'User updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const deleted = db.users.delete(params.id);
    
    if (!deleted) {
      return createErrorResponse('User not found', 404);
    }
    
    return createSuccessResponse(null, 'User deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}