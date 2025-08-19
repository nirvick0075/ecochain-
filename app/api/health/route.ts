import { NextRequest } from 'next/server';
import { createSuccessResponse } from '@/lib/utils/api';

// GET /api/health - Health check endpoint
export async function GET(request: NextRequest) {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
  };
  
  return createSuccessResponse(healthData, 'Service is healthy');
}