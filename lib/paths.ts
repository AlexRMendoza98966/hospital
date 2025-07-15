/**
 * Helper function to get the correct asset path for GitHub Pages
 * @param path - The asset path starting with /
 * @returns The full path including basePath if in production
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/hospital' : '';
  return `${basePath}${path}`;
}

/**
 * Base path for the application
 */
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/hospital' : '';
