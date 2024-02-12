const KoaRouter = require("koa-router");
const {
  addComment,
  getComments,
  deleteComment,
  updateComment
} = require("../controllers/comment.controller");
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
  commentExistValidator
} = require("../validators/db.validator");
const {
  skipValidator,
  limitValidator
} = require("../validators/common.validator");
const { postIdValidator } = require("../validators/post.validator");
const router = new KoaRouter({ prefix: "/api/v1/comment" });

router.post(
  "/",
  authenticate(AllRoles),
  staticValidate([postIdValidator, commentIdValidator, contentValidator]),
  dbValidate([postExistValidator, commentExistValidator]),
  addComment
);

router.get(
  "/:postId",
  authenticate(AllRoles),
  staticValidate([
    postIdValidator,
    skipValidator,
    limitValidator,
    commentIdValidator
  ]),
  dbValidate([postExistValidator]),
  getComments
);

router.put(
  "/:commentId",
  authenticate(AllRoles),
  staticValidate([commentIdValidator, contentValidator]),
  updateComment
);

router.delete(
  "/:commentId",
  authenticate(AllRoles),
  staticValidate([commentIdValidator]),
  deleteComment
);

module.exports = router;
