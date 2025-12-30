const LORRY_STATUS_ENUM = require("../constants/lorry-statuses");
const data = require("../__mocks__/lorry.data");

/**
 * Add new lorry
 */
const addLorry = (req, res) => {
    const { regNum, materialName, customerName, collectionRefNum, updatedBy, comment } = req.body;

    const missingFields = [];

    // if (!regNum) missingFields.push("regNum"); // it is commented out because not required
    if (!materialName) missingFields.push("materialName");
    if (!customerName) missingFields.push("customerName");
    if (!collectionRefNum) missingFields.push("collectionRefNum");
    if (!updatedBy.userId) missingFields.push("updatedBy.userId");
    // if (!comment) missingFields.push("comment"); // it is commented out because not required


    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing required field(s) or param(s): '${missingFields.join(", ")}'`,
        });
    }

    const lastId = data.length
        ? parseInt(data[data.length - 1].lorryId, 10) || 0
        : 0;

    const newId = String(lastId + 1);
    const timestamp = new Date().toISOString();

    const newLorry = {
        lorryId: newId,
        regNum: regNum || "",
        materialName,
        customerName,
        collectionRefNum,
        checkedInAt: timestamp,
        checkedOutAt: null,
        currentStatus: LORRY_STATUS_ENUM.CHECKED_IN,
        statusHistory: [
            {
                status: LORRY_STATUS_ENUM.CHECKED_IN,
                timestamp,
                updatedBy: { userId: updatedBy.userId },
                comments: comment
                    ? [
                        {
                            userId: updatedBy.userId,
                            text: comment,
                            timestamp,
                        },
                    ]
                    : [],
            },
        ],
    };

    data.push(newLorry);
    return res.status(200).json({ message: "Lorry added successfully.", newLorry });
};

/**
 * Get all lorries
 */
const getAllLorries = (req, res) => {
    try {
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Failed to load data" });
    }
};

/**
 * Get a lorry
 */
const getLorryById = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing lorry id" });
    }

    const lorry = data.find(el => el.lorryId === id);

    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    res.status(200).json(lorry);
};

/**
 * Get lorry status history
 */
const getLorryStatusHistory = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing lorry id" });
    }

    const lorry = data.find(el => el.lorryId === id);

    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    res.status(200).json(lorry.statusHistory);
};

/**
 * Update lorry registration number
 */
const updateRegNum = (req, res) => {
    const { id } = req.params;
    const { regNum } = req.body;

    const missingFields = [];

    if (!id) missingFields.push("id");
    if (!regNum) missingFields.push("regNum");

    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing required field(s) or param(s): '${missingFields.join(", ")}'`,
        });
    }

    const lorry = data.find(el => el.lorryId === id);

    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    lorry.regNum = regNum;

    return res.status(200).json({ message: "Lorry registration number updated successfully.", lorry });
};

/**
 * Update the collected material name
 */
const updateMaterialName = (req, res) => {
    const { id } = req.params;
    const { materialName } = req.body;

    if (!materialName) {
        return res.status(400).json({ message: "materialName is required." });
    }

    const lorry = data.find(l => l.lorryId === id);
    if (!lorry) {
        return res.status(404).json({ message: `Lorry with id ${id} not found.` });
    }

    lorry.materialName = materialName;
    return res.status(200).json({ message: "Material name updated successfully.", lorry });
};

/**
 * Update the customer name
 */
const updateCustomerName = (req, res) => {
    const { id } = req.params;
    const { customerName } = req.body;

    if (!customerName) {
        return res.status(400).json({ message: "customerName is required." });
    }

    const lorry = data.find(l => l.lorryId === id);
    if (!lorry) {
        return res.status(404).json({ message: `Lorry with id ${id} not found.` });
    }

    lorry.customerName = customerName;
    return res.status(200).json({ message: "Customer name updated successfully.", lorry });
};

/**
 * Update the reference number
 */
const updateCollectionRefNum = (req, res) => {
    // Read lorry's id and collection's reference number from URL params
    const { id } = req.params;
    const { collectionRefNum } = req.body;


    // Collect any missing required params
    const missingFields = [];

    // Validate presence of required params
    if (!id) missingFields.push("id");
    if (!collectionRefNum) missingFields.push("collectionRefNum");

    // Reject request if any required params are missing
    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing required field(s) or param(s): '${missingFields.join(", ")}'`,
        });
    }

    // Look up the lorry by id
    const lorry = data.find(el => el.lorryId === id);

    // Reject if the lorry does not exist
    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    // Update the collection’s reference number
    lorry.collectionRefNum = collectionRefNum;

    // Return the updated lorry record
    return res.status(200).json({ message: "Collection reference number updated successfully.", lorry });
};

/**
 * Update lorry status
 */
const updateLorryStatus = (req, res) => {
    // Read lorry id from URL params
    const { id } = req.params;

    // Read status update payload from request body
    const { status, updatedBy, comment } = req.body;

    // Collect names of any missing required fields
    const missingFields = [];

    // Validate presence of required fields
    if (!id) missingFields.push("id");
    if (!status) missingFields.push("status");
    if (!updatedBy?.userId) missingFields.push("updatedBy.userId");
    //if (!updatedBy?.name) missingFields.push("updatedBy.name");
    //if (!updatedBy?.role) missingFields.push("updatedBy.role");

    // Reject request if any required fields are missing
    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing required field(s) or param(s): '${missingFields.join(", ")}'`,
        });
    }

    // Ensure status value is a valid enum entry
    if (!Object.values(LORRY_STATUS_ENUM).includes(status)) {
        return res.status(400).json({
            message: "Invalid status value",
        });
    }

    // Look up the lorry by id
    const lorry = data.find(el => el.lorryId === id);

    // Reject if the lorry does not exist
    if (!lorry) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    // Prevent applying the same status more than once
    if (
        lorry.currentStatus === status ||
        lorry.statusHistory.some(el => el.status === status)
    ) {
        return res.status(409).json({
            message: `Status '${status}' has already been applied to lorry with id '${id}'`,
        });
    }

    // Create timestamp for the status change
    const timestamp = new Date().toISOString();

    // Update the lorry’s current status
    lorry.currentStatus = status;

    if (status === LORRY_STATUS_ENUM.CHECKED_OUT) {
        lorry.checkedOutAt = timestamp;
    }


    // Append the new status entry to history
    lorry.statusHistory.push({
        status,
        timestamp,
        updatedBy,
        comments: comment
            ? [
                {
                    userId: updatedBy.userId,
                    text: comment,
                    timestamp,
                },
            ]
            : [],
    });

    // Return the updated lorry record
    return res.status(200).json({ message: "Lorry status updated successfully.", lorry });
};

/**
 * Delete a lorry
 */
const deleteLorry = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Missing lorry id",
        });
    }

    const index = data.findIndex(el => el.lorryId === id);

    if (index === -1) {
        return res.status(404).json({
            message: `Lorry with id '${id}' not found`,
        });
    }

    const deletedLorry = data.splice(index, 1)[0];
    const newData = data.filter(el => el.lorryId !== id);

    return res.status(200).json(newData);
};

module.exports = {
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
};