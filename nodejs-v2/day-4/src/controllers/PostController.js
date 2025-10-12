import PostService from "../Services/PostService.js";
import asyncHandler from "../util/asyncHandler.js";

class PostController {
  getAll = asyncHandler(async (req, res) => {
    const posts = await PostService.getAll();

    if (!posts.length) {
      return res.status(404).json({
        message: "No posts found",
      });
    }

    res.status(200).json(posts);
  });

  create = asyncHandler(async (req, res) => {
    const post = await PostService.create(req.body);
    res.status(201).json(post);
  });

  getById = asyncHandler(async (req, res) => {
    const post = await PostService.getById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  });

  update = asyncHandler(async (req, res) => {
    const post = await PostService.update(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  });

  delete = asyncHandler(async (req, res) => {
    const deleted = await PostService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  });
}

export default new PostController();
