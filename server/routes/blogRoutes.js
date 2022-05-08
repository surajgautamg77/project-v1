const express = require("express");
const blogConntroller = require("./../controllers/blogControllers");
const userConntroller = require("./../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(userConntroller.protect, blogConntroller.getAllBlogs)
  .post(
    userConntroller.protect,
    userConntroller.restrictTo("admin"),
    blogConntroller.createBlogs
  );

router
  .route("/:id")
  .get(userConntroller.protect, blogConntroller.getBlog)
  .patch(
    userConntroller.protect,
    userConntroller.restrictTo("admin"),
    blogConntroller.patchBlog
  )
  .delete(
    userConntroller.protect,
    userConntroller.restrictTo("admin"),
    blogConntroller.deleteBlog
  );

module.exports = router;
