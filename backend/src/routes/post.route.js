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
const router = new KoaRouter({ prefix: "/api/v1/post" });

router.post("/", authenticate(AllRoles), createPost);
router.get("/", authenticate(AllRoles), getPosts);
router.get("/:postId", authenticate(AllRoles), getPost);
router.put("/:postId", authenticate(AllRoles), updatePost);
router.delete("/:postId", authenticate(AllRoles), deletePost);

module.exports = router;
