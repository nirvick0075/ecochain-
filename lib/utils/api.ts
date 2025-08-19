import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function createSuccessResponse<T>(
  data: T,
  message?: string,
  pagination?: ApiResponse['pagination']
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
    pagination,
  });
}

export function createErrorResponse(
  error: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    return createErrorResponse(
      `Validation error: ${error.errors.map(e => e.message).join(', ')}`,
      400
    );
  }

  if (error instanceof Error) {
    return createErrorResponse(error.message, 500);
  }

  return createErrorResponse('Internal server error', 500);
}

export async function parseRequestBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    throw new Error('Invalid JSON in request body');
  }
}

export function getSearchParams(request: NextRequest) {
  return Object.fromEntries(request.nextUrl.searchParams.entries());
}

export function paginate<T>(
  items: T[],
  page: number,
  limit: number
): { items: T[]; pagination: ApiResponse['pagination'] } {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    items: items.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}