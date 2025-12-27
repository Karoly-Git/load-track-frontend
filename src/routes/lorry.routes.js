const express = require("express");
const router = express.Router();

const {
    getAllLorries,
    getLorryById,
    getLorryStatusHistory,
    addLorry,
    updateLorryStatus,
    deleteLorry
} = require("../controllers/lorry.controller");

// Creata
router.post("/", addLorry);

// Read
router.get("/", getAllLorries);
router.get("/:id", getLorryById);
router.get("/:id/history", getLorryStatusHistory);

// Update
router.put("/:id", updateLorryStatus);

// Delete
router.delete("/:id", deleteLorry);

module.exports = router;