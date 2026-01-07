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
router.post("/collection/:collectionId/status/:status", addComment);

// Read
router.get("/collection/:collectionId/status/:status", getAllComments);
router.get("/:commentId", getSingleComment);

// Update
router.patch("/:commentId", updateComment);

// Delete
router.delete("/:commentId", deleteComment);

module.exports = router;


