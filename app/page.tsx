export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive REST API with full CRUD operations for Users, Posts, and Products.
            Built with Next.js 15, TypeScript, and Zod validation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Users API</h3>
            <p className="text-gray-600 mb-4">Manage user accounts with full CRUD operations, email validation, and pagination.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                <code className="text-gray-700">/api/users</code>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">POST</span>
                <code className="text-gray-700">/api/users</code>
              </div>
              <div className="flex items-center">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-2">PUT</span>
                <code className="text-gray-700">/api/users/[id]</code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Posts API</h3>
            <p className="text-gray-600 mb-4">Create and manage blog posts with author relationships, publishing status, and search.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                <code className="text-gray-700">/api/posts</code>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">POST</span>
                <code className="text-gray-700">/api/posts</code>
              </div>
              <div className="flex items-center">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium mr-2">DEL</span>
                <code className="text-gray-700">/api/posts/[id]</code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Products API</h3>
            <p className="text-gray-600 mb-4">Manage product catalog with categories, pricing, inventory tracking, and filtering.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                <code className="text-gray-700">/api/products</code>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">POST</span>
                <code className="text-gray-700">/api/products</code>
              </div>
              <div className="flex items-center">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-2">PUT</span>
                <code className="text-gray-700">/api/products/[id]</code>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Endpoints</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                  <code className="text-gray-700">/api/health</code>
                </div>
                <span className="text-sm text-gray-500">Health Check</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                  <code className="text-gray-700">/api/stats</code>
                </div>
                <span className="text-sm text-gray-500">Statistics</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                  <code className="text-gray-700">/api/search</code>
                </div>
                <span className="text-sm text-gray-500">Global Search</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Full CRUD Operations</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Input Validation with Zod</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Pagination & Filtering</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Error Handling</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">TypeScript Support</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Search Functionality</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Test</h3>
          <p className="text-gray-600 mb-6">
            All APIs are now live and ready for testing. Use tools like Postman, curl, or your favorite HTTP client.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/api/health"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Test Health Check
            </a>
            <a
              href="/api/stats"
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Statistics
            </a>
            <a
              href="/api/users"
              target="_blank"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Users
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}