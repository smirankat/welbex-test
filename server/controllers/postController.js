const uuid = require("uuid");
const path = require("path");
const { Post } = require("../models/models");
const ApiError = require("../error/ApiError");

class PostController {
  async create(req, res, next) {
    try {
      const { date, text, author, userId } = req.body;
      let imgFileName;
      let videoFileName;

      if (req.files) {
        if (req.files.img) {
          imgFileName = uuid.v4() + ".jpg";
          req.files.img.mv(
            path.resolve(__dirname, "..", "static", imgFileName)
          );
        }
        if (req.files.video) {
          videoFileName = uuid.v4() + ".mp4";
          req.files.video.mv(
            path.resolve(__dirname, "..", "static", videoFileName)
          );
        }
      }
      const post = await Post.create({
        date,
        text,
        author,
        img: imgFileName,
        video: videoFileName,
        userId,
      });
      return res.json(post);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    const posts = await Post.findAll();
    return res.json(posts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const posts = await Post.findOne({ where: { id } });
    return res.json(posts);
  }

  async updateOne(req, res) {
    const { id, text } = req.body;
    const posts = await Post.update({ text }, { where: { id } });
    return res.json(posts);
  }

  async deleteOne(req, res) {
    const { id } = req.params;
    const posts = await Post.destroy({ where: { id } });
    return res.json(posts);
  }
}

module.exports = new PostController();
