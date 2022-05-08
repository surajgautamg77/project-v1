const express = require("express");
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json({ limit: "10kb" }));

// 3) ROUTES
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(401).json({
    status: "fail",
    data: {
      data: "sorry, no route",
    },
  });
});

module.exports = app;
