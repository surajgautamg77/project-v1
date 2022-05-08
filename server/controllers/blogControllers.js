const Blog = require("./../models/blogModel");
exports.getAllBlogs = async (req, res) => {
  try {
    const data = await Blog.find();
    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: error,
    });
  }
};

exports.createBlogs = async (req, res) => {
  try {
    const newblog = await Blog.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        data: newblog,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      data: {
        data: error,
      },
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const data = await Blog.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        data: data,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      data: {
        data: error,
      },
    });
  }
};

exports.patchBlog = async (req, res) => {
  try {
    const data = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        data: data,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      data: {
        data: error,
      },
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        data: "deleted",
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      data: {
        data: error,
      },
    });
  }
};
