const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

const commonError = (err, res) => {
  if (err) {
    res.status(500);
    res.json({ success: false, message: err });
    return false;
  } else {
    return true;
  }
};
// index
router.get("/", (req, res, next) => {
  Post.find({})
    .sort("-createdAt")
    .exec((err, posts) => {
      if (commonError(err, res)) {
        res.json({
          success: true,
          message: "data found",
          data: posts
        });
      }
    });
});

// new - 미사용
router.get("/new", (req, res, next) => {
  res.send("new post here");
});

// create
router.post(
  "/",
  (req, res, next) => {
    Post.findOne({})
      .sort({ _id: -1 })
      .exec((err, post) => {
        if (err) {
          res.status(500);
          return res.json({ success: false, message: err });
        } else {
          res.locals.lastId = post ? post._id : 0;
          next();
        }
      });
  },
  (req, res, next) => {
    const newPost = new Post(req.body);
    newPost._id = res.locals.lastId + 1;
    newPost.save((err, post) => {
      if (err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: post });
      }
    });
  }
);
// show
router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params._id }, (err, post) => {
    if (err) {
      res.status(500);
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, data: post });
    }
  });
});
// edit - 미사용
router.get("/:id/edit", (req, res, next) => {});

// update
router.put("/:id", (req, res, next) => {
  Post.findOneAndupdate({ _id: req.params._id }, req.body).exec((err, post) => {
    if (commonError(err, res)) {
      if (!post) {
        res.json({ success: false, message: "post not found" });
      } else {
        res.json({ success: true });
      }
    }
  });
});

// destroy
router.delete("/:id", (req, res) => {
  Post.findOneAndRemove({ _id: req.params._id }).exec((err, post) => {
    if (commonError(err, res)) {
      if (!post) {
        res.json({ success: false, message: "post not found" });
      } else {
        res.json({ success: true });
      }
    }
  });
});

module.exports = router;
