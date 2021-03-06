const router = require("express").Router();
const usersRouter = require("./users-router");
const commentRouter = require("./comment-router");

router.use("/users", usersRouter);
router.use("/comment", commentRouter); 

module.exports = router;
