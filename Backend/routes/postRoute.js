const express = require("express");
const postController = require("../controller/posts");

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.addPost);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);

module.exports = router;