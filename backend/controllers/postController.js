import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    console.log("CREATE POST:");
    console.log(post);

    res.status(201).json(post);
  } catch (err) {
    console.log("CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find(filter).skip(skip).limit(limit);

    const total = await Post.countDocuments(filter);

    console.log("GET ALL POSTS:");
    console.log("Filter:", filter);
    console.log("Page:", page, "Limit:", limit);
    console.log("Result Count:", posts.length);

    res.json({
      page,
      limit,
      totalPosts: total,
      totalPages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (err) {
    console.log("GET ALL ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("GET SINGLE: Post not found:", req.params.id);
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("GET SINGLE POST:");
    console.log(post);

    res.json(post);
  } catch (err) {
    console.log("GET SINGLE ERROR:", err.message);
    res.status(400).json({ error: "Invalid ID" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!post) {
      console.log("UPDATE: Post not found:", req.params.id);
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("UPDATE POST:");
    console.log(post);

    res.json(post);
  } catch (err) {
    console.log("UPDATE ERROR:", err.message);
    res.status(400).json({ error: "Invalid ID" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      console.log("DELETE: Post not found:", req.params.id);
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("DELETE POST:");
    console.log("Deleted ID:", req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err.message);
    res.status(400).json({ error: "Invalid ID" });
  }
};
