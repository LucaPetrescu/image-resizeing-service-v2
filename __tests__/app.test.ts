import request from "supertest";
import { app } from "../src/index";
import fs from "fs";
import path from "path";

beforeAll(async () => {
  await request(app).get("/app");
});

describe("API Endpoint /app", () => {
  let mockFile = null;
  beforeEach(() => {
    const filePath = path.join(__dirname, "test_images", "test-image.jpg");
    fs.writeFileSync(filePath, "This is some image content");
    mockFile = fs.readFileSync(filePath);
  });

  let filePath = path.join(__dirname, "test_images", "test-image.jpg");
  afterEach(() => fs.unlinkSync(filePath));

  it("should return stats data on GET /getStats", async () => {
    const resGetStats = await request(app).get("/app/getStats");
    const expectedStas = {
      RelevantInfo: expect.any(Object),
      OtherInfo: expect.any(Object),
    };
    expect(resGetStats.status).toEqual(200);
    expect(resGetStats.body).toEqual(expect.objectContaining(expectedStas));
  });

  it("should upload a mock image and recieve an object with the result", async () => {
    const resPostImage = await request(app)
      .post("/app/postImage")
      .attach("image", mockFile, "test-image.jpg");

    expect(resPostImage.status).toEqual(200);
    expect(resPostImage.body).toEqual(expect.any(Object));
  });

  it("should resize a picture with given parameters and return a buffer that is the resize image", async () => {
    const image_name = 233;
    const resolution = "80x80";
    const resResizeImage = await request(app)
      .get(`/app/resizeImage/${image_name}`)
      .query({ resolution: resolution });
    expect(resResizeImage.status).toEqual(200);
    expect(resResizeImage.body).toEqual(expect.any(Buffer));
  });
});
