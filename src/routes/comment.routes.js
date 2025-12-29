const express = require("express");
const router = express.Router();

const {
    addComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment
} = require("../controllers/comment.controller");

// Create
router.post("/:lorryId/:status", addComment);

// Read
router.get("/:lorryId/:status", getAllComments);
router.get("/:commentId", getSingleComment);

// Update
router.put("/:commentId", updateComment);

// Delete
router.delete("/:commentId", deleteComment);

module.exports = router;
