// const express = require("express");

// const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

// const {
//   addNewCommentToStory,
//   getAllCommentByStory,
//   commentLike,
//   getCommentLikeStatus,
//   deletecommentbyuser,
// } = require("../Controllers/comment");

// const {
//   checkStoryExist,
// } = require("../Middlewares/database/databaseErrorhandler");

// const router = express.Router();

// router.post(
//   "/:slug/addComment",
//   [getAccessToRoute, checkStoryExist],
//   addNewCommentToStory
// );

// router.get("/:slug/getAllComment", getAllCommentByStory);

// router.post("/:comment_id/like", commentLike);

// router.post("/:comment_id/getCommentLikeStatus", getCommentLikeStatus);

// router.delete("/:slug/delete", deletecommentbyuser);
// module.exports = router;
const express = require("express");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const {
  addNewCommentToStory,
  getAllCommentByStory,
  commentLike,
  getCommentLikeStatus,
  editCommentByUser,
  deleteCommentByUser,
} = require("../Controllers/comment");

const {
  checkStoryExist,
} = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router();

// Route to add a new comment to a story
router.post(
  "/:slug/addComment",
  [getAccessToRoute, checkStoryExist],
  addNewCommentToStory
);

// Route to get all comments for a story
router.get("/:slug/getAllComment", checkStoryExist, getAllCommentByStory);

// Route to like or unlike a comment
router.post("/:comment_id/like", getAccessToRoute, commentLike);

// Route to get the like status of a comment
router.post(
  "/:comment_id/getCommentLikeStatus",
  getAccessToRoute,
  getCommentLikeStatus
);

// Route to edit a comment by user
router.put("/:comment_id/edit", getAccessToRoute, editCommentByUser);

// Route to delete a comment by user
router.delete("/:comment_id/delete", getAccessToRoute, deleteCommentByUser);

module.exports = router;
