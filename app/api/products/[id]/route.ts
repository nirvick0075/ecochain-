import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { updateProductSchema } from '@/lib/validation';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  parseRequestBody,
} from '@/lib/utils/api';

interface RouteParams {
  params: { id: string };
}

// GET /api/products/[id] - Get product by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const product = db.products.findById(params.id);
    
    if (!product) {
      return createErrorResponse('Product not found', 404);
    }
    
    return createSuccessResponse(product, 'Product retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await parseRequestBody(request);
    const validatedData = updateProductSchema.parse(body);
    
    const existingProduct = db.products.findById(params.id);
    if (!existingProduct) {
      return createErrorResponse('Product not found', 404);
    }
    
    const updatedProduct = db.products.update(params.id, validatedData);
    return createSuccessResponse(updatedProduct, 'Product updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const deleted = db.products.delete(params.id);
    
    if (!deleted) {
      return createErrorResponse('Product not found', 404);
    }
    
    return createSuccessResponse(null, 'Product deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}