/** Resolve public asset paths under the configured Vite base URL (e.g. GitHub Pages subpath). */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
