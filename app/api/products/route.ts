import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { createProductSchema, paginationSchema, searchSchema } from '@/lib/validation';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  parseRequestBody,
  getSearchParams,
  paginate,
} from '@/lib/utils/api';

// GET /api/products - Get all products with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = getSearchParams(request);
    const { page, limit } = paginationSchema.parse(searchParams);
    const { q, category } = searchSchema.parse(searchParams);
    
    let products = db.products.findAll();
    
    // Filter by category
    if (category) {
      products = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Search in name and description
    if (q) {
      const searchTerm = q.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by creation date (newest first)
    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const { items: paginatedProducts, pagination } = paginate(products, page, limit);
    
    return createSuccessResponse(paginatedProducts, 'Products retrieved successfully', pagination);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);
    const validatedData = createProductSchema.parse(body);
    
    const product = db.products.create(validatedData);
    return createSuccessResponse(product, 'Product created successfully');
  } catch (error) {
    return handleApiError(error);
  }
}