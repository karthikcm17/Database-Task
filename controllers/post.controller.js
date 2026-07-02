const Post = require("../models/post.model");

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve posts", error: error.message });
    }
};

const addPosts = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = new Post({
            title,
            content
        });

        const savedPost = await newPost.save();
        res.status(201).json({ message: "Post created successfully", data: savedPost });
    } catch (error) {
        res.status(400).json({ message: "Failed to create post", error: error.message });
    }
};

const delPosts = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Target post not found" });
        }

        res.status(200).json({ message: "Post deleted from database successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete post", error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { title, content }, 
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Target post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", data: updatedPost });
    } catch (error) {
        res.status(500).json({ message: "Failed to update post", error: error.message });
    }
};

module.exports = { getPosts, addPosts, delPosts, updatePost };