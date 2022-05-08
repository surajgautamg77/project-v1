const express = require("express");
const userConntroller = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", userConntroller.signup);
router.post("/login", userConntroller.login);

router
  .route("/")
  .get(
    userConntroller.protect,
    userConntroller.restrictTo("admin"),
    userConntroller.getAllUsers
  );
//   .post(blogConntroller.createBlogs);

// router
//   .route("/:id")
//   .get(blogConntroller.getBlog)
//   .patch(blogConntroller.patchBlog)
//   .delete(blogConntroller.deleteBlog);

module.exports = router;
