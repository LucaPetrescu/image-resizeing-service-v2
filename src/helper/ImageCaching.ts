import { getRedisClient } from "../helper/redisConnect";

class ImageCaching {
  constructor() {}
  public async getClient() {
    let client = await getRedisClient();
    return client;
  }

  public async getCachedImage(
    imagePath: string,
    width: number
  ): Promise<String> | null {
    const cacheKey: string = `image:${imagePath}-${width}`;
    const cachedBuffer = await (await this.getClient()).get(cacheKey);

    if (cachedBuffer) {
      return cachedBuffer;
    }

    return null;
  }

  public async cacheImage(
    imagePath: string,
    width: number,
    imageBuffer: Buffer
  ): Promise<void> {
    const cacheKey: string = `image:${imagePath}-${width}`;
    await (await this.getClient()).set(cacheKey, imageBuffer);
  }

  public async getCacheStats() {
    let client = await getRedisClient();
    return await client.info();
  }
}

export default new ImageCaching();
