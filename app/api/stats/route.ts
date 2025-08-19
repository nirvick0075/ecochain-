import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { createSuccessResponse, handleApiError } from '@/lib/utils/api';

// GET /api/stats - Get application statistics
export async function GET(request: NextRequest) {
  try {
    const users = db.users.findAll();
    const posts = db.posts.findAll();
    const products = db.products.findAll();
    
    const stats = {
      users: {
        total: users.length,
        recent: users.filter(user => {
          const createdAt = new Date(user.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return createdAt > weekAgo;
        }).length,
      },
      posts: {
        total: posts.length,
        published: posts.filter(post => post.published).length,
        draft: posts.filter(post => !post.published).length,
        recent: posts.filter(post => {
          const createdAt = new Date(post.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return createdAt > weekAgo;
        }).length,
      },
      products: {
        total: products.length,
        inStock: products.filter(product => product.inStock).length,
        outOfStock: products.filter(product => !product.inStock).length,
        categories: [...new Set(products.map(product => product.category))].length,
        averagePrice: products.length > 0 
          ? products.reduce((sum, product) => sum + product.price, 0) / products.length 
          : 0,
      },
      overview: {
        totalEntities: users.length + posts.length + products.length,
        lastUpdated: new Date().toISOString(),
      },
    };
    
    return createSuccessResponse(stats, 'Statistics retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}