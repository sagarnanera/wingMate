const KoaRouter = require("koa-router");
const authenticate = require("../middlewares/auth.middleware");
const { AllRoles, ROLES } = require("../utils/constants");
const staticValidate = require("../middlewares/staticValidate.middleware");
const {
  contentValidator,
  commentIdValidator
} = require("../validators/comment.validator");
const dbValidate = require("../middlewares/dbValidate.middleware");
const {
  postExistValidator,
  commentExistValidator,
  isLikedValidator
} = require("../validators/db.validator");
const {
  skipValidator,
  limitValidator
} = require("../validators/common.validator");
const { postIdValidator } = require("../validators/post.validator");
const { getLikes, addRemoveLike } = require("../controllers/like.controller");
const { likeIdValidator } = require("../validators/like.validator");
const router = new KoaRouter({ prefix: "/api/v1/like" });

router.post(
  "/:postId",
  authenticate(AllRoles),
  staticValidate([postIdValidator, commentIdValidator]),
  dbValidate([postExistValidator, commentExistValidator, isLikedValidator]),
  addRemoveLike
);

router.get(
  "/:postId",
  authenticate(AllRoles),
  staticValidate([
    postIdValidator,
    commentIdValidator,
    skipValidator,
    limitValidator
  ]),
  dbValidate([postExistValidator, commentExistValidator]),
  getLikes
);

// router.delete(
//   "/:likeId",
//   authenticate(AllRoles),
//   staticValidate([likeIdValidator]),
//   deleteLike
// );

module.exports = router;
