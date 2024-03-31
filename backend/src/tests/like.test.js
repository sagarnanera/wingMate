const request = require("./index");
// const app = require("../app");
// const request = supertest.agent(app.listen());
const likeQueries = require("../DB/like.db");
const userQueries = require("../DB/user.db");
const generateUUID = require("../utils/generateUUID");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlYzAxNWIwNy04OTI3LTQyYjEtYTJkNi1mODc5ZDZmMGYwODciLCJpYXQiOjE3MDg5MjkwNzEsImV4cCI6MTcwOTc5MzA3MX0.1raJWtdYRpPM24J3VSnA30sFtTG2uYwgF3P4hMGxolY";

describe("Likes Module", () => {
  const _findUser = userQueries.findUser;
  const _findLike = likeQueries.findLike;
  const _findLikes = likeQueries.findLikes;
  const _insertLike = likeQueries.insertLike;

  beforeEach(() => {
    userQueries.findUser = jest.fn((userData) => {
      return {};
    });

    likeQueries.findLike = jest.fn((likeData) => {
      const _id = generateUUID();
      return { _id, ...likeData };
    });
  });

  afterEach(() => {
    userQueries.findUser = _findUser;
    likeQueries.findLike = _findLike;
    likeQueries.findLikes = _findLikes;
    likeQueries.insertLike = _insertLike;
  });

  it("should like a post", async () => {
    const postId = "ceaf5eaf-b90c-4504-90b3-a4b4263b9dc2";
    const response = await request
      .post(`/api/v1/like/${postId}`)
      .set("Cookie", `token=${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("message", "Post liked successfully");
  });

  //   it("should unlike a post", async () => {
  //     const postId = "ceaf5eaf-b90c-4504-90b3-a4b4263b9dc2"; // Replace with a valid post ID
  //     const response = await request(app).post(`/api/v1/like/${postId}`).send();
  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("success", true);
  //     expect(response.body).toHaveProperty(
  //       "message",
  //       "Post UnLiked successfully"
  //     );
  //   });
});
