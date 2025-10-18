import { createBucketClient } from '@cosmicjs/sdk';
import type { Post, Tag } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.COSMIC_READ_KEY,
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all posts with connected data
export async function getAllPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Get post by slug
export async function getPostBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug: slug
      })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Get user by slug
export async function getUserBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'users',
        slug: slug
      })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get all tags
export async function getAllTags() {
  try {
    const response = await cosmic.objects
      .find({ type: 'tags' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Get posts by tag
export async function getPostsByTag(tagSlug: string) {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter((post: Post) => {
      const tags = post.metadata?.tags;
      if (!tags || !Array.isArray(tags)) return false;
      return tags.some((tag: Tag) => tag.slug === tagSlug);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}