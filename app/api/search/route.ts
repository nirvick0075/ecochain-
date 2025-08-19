import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { paginationSchema } from '@/lib/validation';
import {
  createSuccessResponse,
  handleApiError,
  getSearchParams,
  paginate,
} from '@/lib/utils/api';

// GET /api/search - Global search across all entities
export async function GET(request: NextRequest) {
  try {
    const searchParams = getSearchParams(request);
    const { page, limit } = paginationSchema.parse(searchParams);
    const query = searchParams.q?.toLowerCase() || '';
    
    if (!query) {
      return createSuccessResponse([], 'Search query is required');
    }
    
    const results: any[] = [];
    
    // Search users
    const users = db.users.findAll().filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    ).map(user => ({
      ...user,
      type: 'user',
      relevance: calculateRelevance(query, [user.name, user.email]),
    }));
    
    // Search posts
    const posts = db.posts.findAll().filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    ).map(post => ({
      ...post,
      type: 'post',
      relevance: calculateRelevance(query, [post.title, post.content]),
    }));
    
    // Search products
    const products = db.products.findAll().filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    ).map(product => ({
      ...product,
      type: 'product',
      relevance: calculateRelevance(query, [product.name, product.description, product.category]),
    }));
    
    // Combine and sort by relevance
    results.push(...users, ...posts, ...products);
    results.sort((a, b) => b.relevance - a.relevance);
    
    const { items: paginatedResults, pagination } = paginate(results, page, limit);
    
    return createSuccessResponse(
      paginatedResults,
      `Found ${results.length} results for "${searchParams.q}"`,
      pagination
    );
  } catch (error) {
    return handleApiError(error);
  }
}

function calculateRelevance(query: string, fields: string[]): number {
  let score = 0;
  const queryWords = query.split(' ').filter(word => word.length > 0);
  
  for (const field of fields) {
    const fieldLower = field.toLowerCase();
    
    // Exact match gets highest score
    if (fieldLower.includes(query)) {
      score += 10;
    }
    
    // Word matches get medium score
    for (const word of queryWords) {
      if (fieldLower.includes(word)) {
        score += 5;
      }
    }
    
    // Starting with query gets bonus
    if (fieldLower.startsWith(query)) {
      score += 3;
    }
  }
  
  return score;
}