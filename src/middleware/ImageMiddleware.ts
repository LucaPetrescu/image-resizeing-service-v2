import path from "path";
import multer from "multer";
import { setRandomId } from "../helper/imagehelper";

export default class ImageMiddleware {
  public static readonly memoryLoader = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 2097152, // 2 MByte
    },
  });

  public static readonly diskLoader = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, "../images/"));
      },
      filename: (req, file, cb) => {
        return cb(
          null,
          `${file.fieldname}_${setRandomId()}${path.extname(file.originalname)}`
        );
      },
    }),

    limits: {
      fileSize: 67108864, // 64 MByte
    },
  });
}
