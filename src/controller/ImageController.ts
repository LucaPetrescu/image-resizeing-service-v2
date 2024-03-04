import { Request, Response } from "express";
import path from "path";
import {
  checkImagePath,
  convertResolution,
  resizeImage,
  getStats,
  countFilesInDirectory,
} from "../helper/imagehelper";

import ImageCaching from "../helper/ImageCaching";

class ImageController {
  async resizeImage(req: Request, res: Response) {
    try {
      const imageName = req.params.image_name;
      const resolutionString = req.query.resolution as string;

      if (!imageName) throw new Error("Please fill in the params field");

      const imagePath = path.join(
        __dirname,
        "../",
        "images",
        `image_${imageName}.jpg`
      );
      await checkImagePath(imagePath);

      const resolution = convertResolution(resolutionString);
      const width = resolution.width;
      const height = resolution.height;

      const resizedImage = await resizeImage(imagePath, width, height);

      await ImageCaching.cacheImage(imagePath, width, resizedImage);

      res.setHeader("Content-Type", "image/jpeg");
      res.status(200).send(resizedImage);
    } catch (e: any) {
      res.status(500).json({
        message: e.message,
      });
    }
  }

  async postImage(req: Request, res: Response) {
    try {
      res.send({
        message: "File uploaded",
        result: req.file.filename,
        imageAvailableAt: `http://localhost:5000/images/${req.file.filename}`,
      });
    } catch (e) {
      res.send(e);
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      let statsString: string = await ImageCaching.getCacheStats();

      const { hits, misses, hitRatio, noOfCachedFiles } = getStats(statsString);

      const imageFolder = path.join(__dirname, "../", "images");

      const noOfOriginaFiles = await countFilesInDirectory(imageFolder);

      res.send({
        RelevantInfo: {
          hits,
          misses,
          noOfCachedFiles,
          noOfOriginaFiles,
          hitRatio,
        },
        OtherInfo: { statsString },
      });
    } catch (e) {
      res.send(e);
    }
  }
}

export default new ImageController();
