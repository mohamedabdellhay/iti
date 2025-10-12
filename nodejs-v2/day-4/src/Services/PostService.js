import PostModel from "../models/Post.js";

class PostService {
  async getAll() {
    const posts = await PostModel.find().populate("userId");
    return posts;
  }

  async getById(id) {
    const post = await PostModel.findById(id).populate("userId");
    return post;
  }

  async create(data) {
    const post = await PostModel.create(data);
    return post;
  }

  async update(id, data) {
    const updatedPost = await PostModel.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("userId");
    return updatedPost;
  }

  async delete(id) {
    const deletedPost = await PostModel.findByIdAndDelete(id);
    return deletedPost;
  }
}

export default new PostService();
