const router = require("express").Router();
const usersRouter = require("./users-router");
const exampleRouter = require("./example-router");
const commentRouter = require("./comment-router");

router.use("/users", usersRouter);
router.use("/example", exampleRouter);
router.use("/comment", commentRouter); 

module.exports = router;
