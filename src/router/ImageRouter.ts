import BaseRoutes from "./base/BaseRouter";
import ImageController from "../controller/ImageController";
import ImageMiddleware from "../middleware/ImageMiddleware";
class NoteRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/resizeImage/:image_name", ImageController.resizeImage);

    this.router.post(
      "/postImage",
      ImageMiddleware.diskLoader.single("image"),
      ImageController.postImage
    );

    this.router.get("/getStats", ImageController.getStats);
  }
}

export default new NoteRoutes().router;
