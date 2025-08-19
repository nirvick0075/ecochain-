import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { createUserSchema, paginationSchema } from '@/lib/validation';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  parseRequestBody,
  getSearchParams,
  paginate,
} from '@/lib/utils/api';

// GET /api/users - Get all users with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = getSearchParams(request);
    const { page, limit } = paginationSchema.parse(searchParams);
    
    const allUsers = db.users.findAll();
    const { items: users, pagination } = paginate(allUsers, page, limit);
    
    return createSuccessResponse(users, 'Users retrieved successfully', pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);
    const validatedData = createUserSchema.parse(body);
    
    // Check if user with email already exists
    const existingUser = db.users.findByEmail(validatedData.email);
    if (existingUser) {
      return createErrorResponse('User with this email already exists', 409);
    }
    
    const user = db.users.create(validatedData);
    return createSuccessResponse(user, 'User created successfully', undefined);
  } catch (error) {
    return handleApiError(error);
  }
}