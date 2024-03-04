import fs from "fs";
import sharp from "sharp";

export function setRandomId(): number {
  return Math.floor(Math.random() * 1000);
}

export function checkImagePath(imagePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.stat(imagePath, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export async function resizeImage(
  imagePath: string,
  width: number,
  height: number
): Promise<Buffer | null> {
  try {
    const imageData = await sharp(imagePath).resize(width, height).toBuffer();
    return imageData;
  } catch (e) {
    return null;
  }
}

export async function decodeImage(buffer: Buffer) {
  try {
    const image = await sharp(buffer).toFormat("jpeg").toBuffer();
    const base64Image = image.toString();
    return base64Image;
  } catch (error) {
    return error;
  }
}

export function countFilesInDirectory(dirPath: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.length);
      }
    });
  });
}

export function convertResolution(resolution: string) {
  return {
    width: parseInt(resolution.split("x")[0], 10),
    height: parseInt(resolution.split("x")[0], 10),
  };
}

export function getStats(statsString: string) {
  const hitsMatch = statsString.match(/keyspace_hits:(\d+)/);
  const missesMatch = statsString.match(/keyspace_misses:(\d+)/);

  const regex = /keys=(\d+)/;
  const match = statsString.match(regex);

  let noOfCachedFiles = null;

  if (match) {
    noOfCachedFiles = parseInt(match[1], 10);
  } else {
    throw new Error("No file found!");
  }

  const hits = parseInt(hitsMatch ? hitsMatch[1] : "0");
  const misses = parseInt(missesMatch ? missesMatch[1] : "0");
  const hitRatio = hits / (hits + misses);

  return { hits, misses, hitRatio, noOfCachedFiles };
}
