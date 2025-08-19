// Simple in-memory database simulation
// In production, you'd use a real database like PostgreSQL, MongoDB, etc.

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage
let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful React framework...',
    authorId: '1',
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'API Routes in Next.js',
    content: 'Learn how to create API routes...',
    authorId: '2',
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let products: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop for developers',
    price: 1299.99,
    category: 'Electronics',
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Coffee Mug',
    description: 'Perfect mug for your morning coffee',
    price: 19.99,
    category: 'Home',
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Database operations
export const db = {
  // Users
  users: {
    findAll: () => users,
    findById: (id: string) => users.find(user => user.id === id),
    findByEmail: (email: string) => users.find(user => user.email === email),
    create: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
      const user: User = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(user);
      return user;
    },
    update: (id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>) => {
      const index = users.findIndex(user => user.id === id);
      if (index === -1) return null;
      users[index] = {
        ...users[index],
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      return users[index];
    },
    delete: (id: string) => {
      const index = users.findIndex(user => user.id === id);
      if (index === -1) return false;
      users.splice(index, 1);
      return true;
    },
  },

  // Posts
  posts: {
    findAll: () => posts,
    findById: (id: string) => posts.find(post => post.id === id),
    findByAuthor: (authorId: string) => posts.filter(post => post.authorId === authorId),
    create: (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
      const post: Post = {
        id: Date.now().toString(),
        ...postData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      posts.push(post);
      return post;
    },
    update: (id: string, postData: Partial<Omit<Post, 'id' | 'createdAt'>>) => {
      const index = posts.findIndex(post => post.id === id);
      if (index === -1) return null;
      posts[index] = {
        ...posts[index],
        ...postData,
        updatedAt: new Date().toISOString(),
      };
      return posts[index];
    },
    delete: (id: string) => {
      const index = posts.findIndex(post => post.id === id);
      if (index === -1) return false;
      posts.splice(index, 1);
      return true;
    },
  },

  // Products
  products: {
    findAll: () => products,
    findById: (id: string) => products.find(product => product.id === id),
    findByCategory: (category: string) => products.filter(product => product.category === category),
    create: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      const product: Product = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      products.push(product);
      return product;
    },
    update: (id: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>) => {
      const index = products.findIndex(product => product.id === id);
      if (index === -1) return null;
      products[index] = {
        ...products[index],
        ...productData,
        updatedAt: new Date().toISOString(),
      };
      return products[index];
    },
    delete: (id: string) => {
      const index = products.findIndex(product => product.id === id);
      if (index === -1) return false;
      products.splice(index, 1);
      return true;
    },
  },
};