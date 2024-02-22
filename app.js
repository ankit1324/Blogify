require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const checkForAuthCookie = require("./middleware/auth");
const Blog = require("./models/blog");

const PORT = process.env.PORT;

//connectMongodb
const url = process.env.MONGODB_URL;
mongoose.connect(url).then((e) => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
