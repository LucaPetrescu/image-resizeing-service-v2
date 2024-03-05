import path from "path";
import {
  setRandomId,
  convertResolution,
  resizeImage,
  countFilesInDirectory,
  getStats,
  checkImagePath,
} from "../src/helper/imagehelper";

describe("Methods from the imagehelper.ts file", () => {
  let filePath = null;
  let folderPath = null;

  beforeEach(() => {
    filePath = path.join(__dirname, "test_images", "test_image.jpg");
    folderPath = path.join(__dirname, "test_images");
  });

  it("Should return a random number", () => {
    const randomId: number = setRandomId();
    expect(randomId).toEqual(expect.any(Number));
  });

  it("Should return an object containing two numbers", () => {
    const { width, height } = convertResolution("100x100");
    expect({ width, height }).toEqual({ width: 100, height: 100 });
  });

  it("Should return a buffer for a resized mock image", async () => {
    const buff: Buffer = await resizeImage(filePath, 100, 100);
    console.log(buff);
    expect(buff).toEqual(expect.any(Buffer));
  });

  it("Should return the number of files in a directory", async () => {
    const noOfFiles = await countFilesInDirectory(folderPath);
    expect(noOfFiles).toEqual(1);
  });

  it("Should return the stats of the Redis Chache", async () => {
    let stringFilePath = path.join(__dirname, "test_files", "test_string.txt");
    const stats: Object = getStats(stringFilePath);

    const expectedStas = {
      hits: expect.any(Number),
      misses: expect.any(Number),
      noOfCaches: expect.any(Number),
      noOfOriginalFiles: expect.any(Number),
      hitRatio: expect.any(Number),
    };

    expect(stats).toEqual(expectedStas);
  });

  it("Should not return an error", async () => {
    const result = await checkImagePath(filePath);
    expect(result).not.toEqual(Error);
  });
});
