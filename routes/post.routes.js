const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/get", postController.getPosts);
router.post("/add", postController.addPosts);
router.delete("/delete/:id", postController.delPosts);
router.patch("/update/:id", postController.updatePost);

module.exports = router;