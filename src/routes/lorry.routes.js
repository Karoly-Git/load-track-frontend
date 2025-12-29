const express = require("express");
const router = express.Router();

const {
    addLorry,
    getAllLorries,
    getLorryById,
    getLorryStatusHistory,
    updateRegNum,
    updateMaterialName,
    updateCustomerName,
    updateCollectionRefNum,
    updateLorryStatus,
    deleteLorry
} = require("../controllers/lorry.controller");

// Create
router.post("/add-lorry", addLorry);

// Read
router.get("/", getAllLorries);
router.get("/:id", getLorryById);
router.get("/:id/history", getLorryStatusHistory);

// Update
router.put("/:id/update-registration-number", updateRegNum);
router.put("/:id/update-material-name", updateMaterialName);
router.put("/:id/update-customer-name", updateCustomerName);
router.put("/:id/update-collection-reference-number", updateCollectionRefNum);
router.put("/:id/update-status", updateLorryStatus);

// Delete
router.delete("/:id/delete", deleteLorry);

module.exports = router;