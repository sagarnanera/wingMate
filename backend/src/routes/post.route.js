const KoaRouter = require("koa-router");
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost
} = require("../controllers/post.controller");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const staticValidate = require("../middlewares/staticValidate.middleware");
const {
  titleValidator,
  contentTypeValidator,
  textValidator,
  mediaValidator,
  feedTypeValidator,
  postIdValidator,
  skipValidator,
  limitValidator
} = require("../validators/post.validator");
const { userIdValidator } = require("../validators/user.validator");
const router = new KoaRouter({ prefix: "/api/v1/post" });

router.post(
  "/",
  authenticate(AllRoles),
  staticValidate([
    titleValidator,
    feedTypeValidator,
    contentTypeValidator,
    textValidator,
    mediaValidator
  ]),
  createPost
);

router.get(
  "/",
  authenticate(AllRoles),
  staticValidate([
    skipValidator,
    limitValidator,
    feedTypeValidator,
    userIdValidator
  ]),
  getPosts
);

router.get(
  "/:postId",
  authenticate(AllRoles),
  staticValidate([postIdValidator]),
  getPost
);

router.put(
  "/:postId",
  authenticate(AllRoles),
  staticValidate([
    postIdValidator,
    feedTypeValidator,
    titleValidator,
    contentTypeValidator,
    textValidator,
    mediaValidator
  ]),
  updatePost
);
router.delete(
  "/:postId",
  authenticate(AllRoles),
  staticValidate([postIdValidator]),
  deletePost
);

module.exports = router;
