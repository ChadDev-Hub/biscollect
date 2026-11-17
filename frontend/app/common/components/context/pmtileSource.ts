import type { Source } from "pmtiles";

export class CachePMTilesSource implements Source {
  private blob: Blob | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getBytes(
    offset: number,
    length: number
  ): Promise<{ data: ArrayBuffer; etag?: string; cacheControl?: string; expires?: string }> {
    if (!this.blob) {
      const cache = await caches.open("maptile-provider");
      const response = await cache.match(this.url);

      if (!response) {
        throw new Error(`PMTiles not found in cache: ${this.url}`);
      }

      this.blob = await response.blob();

      console.log(
        "PMTiles loaded from Cache Storage:",
        this.blob.size
      );
    }

    const data = await this.blob
      .slice(offset, offset + length)
      .arrayBuffer();

    return {
      data,
      etag: `"${this.blob.size}"`,
    };
  }

  getKey(): string {
    return this.url;
  }
}