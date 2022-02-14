const router = require("express").Router();
const { Comment, User } = require("../models");



router.get("/", async (req, res) => {
  try {
    res.render("home", {
      title: "Home Page",
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page" });
});

router.get("//signup", (req, res) => {
  res.render("signup", { title: "Sign-Up Page" });
});

router.get("/display",  async (req, res) => {
  
  try {
    const commentPosts = await Comment.findAll();  
    const comments = commentPosts.map((posts) => posts.get({ plain:true}));
    res.render("display", {comments, title: "Log-In Page" });
    console.log(comments); 
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;









// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });






