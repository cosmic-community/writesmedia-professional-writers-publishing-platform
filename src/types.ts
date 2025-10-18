// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Post interface
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    synopsis?: string;
    content_type?: {
      key: string;
      value: string;
    };
    content?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    tags?: Tag[];
    visibility?: {
      key: string;
      value: string;
    };
    copyright_text?: string;
    watermark_settings?: {
      mode?: string;
      text?: string;
    } | null;
    read_count?: number;
    like_count?: number;
    comment_count?: number;
    author?: string | User;
  };
}

// User interface
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    name?: string;
    username?: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    role?: {
      key: string;
      value: string;
    };
    verified?: boolean;
    social_links?: {
      twitter?: string;
      instagram?: string;
      website?: string;
    };
  };
}

// Tag interface
export interface Tag extends CosmicObject {
  type: 'tags';
  metadata: {
    name?: string;
    description?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isTag(obj: CosmicObject): obj is Tag {
  return obj.type === 'tags';
}

// Helper function to get author details
export function getAuthor(post: Post): User | null {
  if (!post.metadata.author) return null;
  if (typeof post.metadata.author === 'string') return null;
  return post.metadata.author as User;
}