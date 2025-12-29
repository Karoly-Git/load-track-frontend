const data = require("../__mocks__/lorry.data");
const LORRY_STATUSES_ENUM = require("../constants/lorry-statuses");

/**
 * Helper: find comment with references
 */
const findCommentById = (commentId) => {
    for (const lorry of data) {
        for (const statusEntry of lorry.statusHistory) {
            const comment = statusEntry.comments.find(c => c.id === commentId);
            if (comment) {
                return { lorry, statusEntry, comment };
            }
        }
    }
    return null;
};

/**
 * Add comment to a lorry status
 */
const addComment = (req, res) => {
    const { lorryId, status } = req.params;
    const { userId, text } = req.body;

    const missingFields = [];
    if (!lorryId) missingFields.push("lorryId");
    if (!status) missingFields.push("status");
    if (!userId) missingFields.push("userId");
    if (!text) missingFields.push("text");

    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing required field(s) or param(s): '${missingFields.join(", ")}'`
        });
    }

    if (!Object.values(LORRY_STATUSES_ENUM).includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    const lorry = data.find(l => l.lorryId === lorryId);
    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${lorryId}' not found`
        });
    }

    const statusEntry = lorry.statusHistory.find(s => s.status === status);
    if (!statusEntry) {
        return res.status(404).json({
            message: `Status '${status}' not found for lorry '${lorryId}'`
        });
    }

    const timestamp = new Date().toISOString();

    const newComment = {
        id: `c-${Date.now()}`,
        userId,
        text,
        timestamp
    };

    statusEntry.comments.push(newComment);

    return res.status(201).json({
        message: "Comment added successfully.",
        comment: newComment
    });
};

/**
 * Get all comments of a specific status of a lorry
 */
const getAllComments = (req, res) => {
    const { lorryId, status } = req.params;

    const lorry = data.find(l => l.lorryId === lorryId);
    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${lorryId}' not found`
        });
    }

    const statusEntry = lorry.statusHistory.find(s => s.status === status);
    if (!statusEntry) {
        return res.status(404).json({
            message: `Status '${status}' not found for lorry '${lorryId}'`
        });
    }

    return res.status(200).json(statusEntry.comments);
};

/**
 * Get single comment
 */
const getSingleComment = (req, res) => {
    const { commentId } = req.params;

    if (!commentId) {
        return res.status(400).json({
            message: "Missing commentId",
        });
    }

    for (const lorry of data) {
        for (const statusEntry of lorry.statusHistory) {
            const comment = statusEntry.comments.find(
                c => c.id === commentId
            );

            if (comment) {
                return res.status(200).json(comment);
            }
        }
    }

    return res.status(404).json({
        message: `Comment with id '${commentId}' not found`,
    });
};
/**
 * Update a comment
 */
const updateComment = (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            message: "Text is required"
        });
    }

    const result = findCommentById(commentId);
    if (!result) {
        return res.status(404).json({
            message: `Comment with id '${commentId}' not found`
        });
    }

    result.comment.text = text;
    result.comment.timestamp = new Date().toISOString();

    return res.status(200).json({
        message: "Comment updated successfully.",
        comment: result.comment
    });
};

/**
 * Delete a comment
 */
const deleteComment = (req, res) => {
    const { commentId } = req.params;

    for (const lorry of data) {
        for (const statusEntry of lorry.statusHistory) {
            const index = statusEntry.comments.findIndex(c => c.id === commentId);
            if (index !== -1) {
                const deletedComment = statusEntry.comments.splice(index, 1)[0];
                return res.status(200).json({
                    message: "Comment deleted successfully.",
                    deletedComment
                });
            }
        }
    }

    return res.status(404).json({
        message: `Comment with id '${commentId}' not found`
    });
};

module.exports = {
    addComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment
};
