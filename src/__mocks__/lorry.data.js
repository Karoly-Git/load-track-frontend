const LORRY_STATUS_ENUM = require("./lorry-status.enum");

const lorryTrackData = [
    {
        lorryId: "1",
        refNum: "vg123sd",
        registration: "pz65pwo",

        checkedInAt: "2025-12-27T08:40:00Z",
        checkedOutAt: null,
        currentStatus: LORRY_STATUS_ENUM.CHECKED_IN,

        statusHistory: [
            {
                status: LORRY_STATUS_ENUM.CHECKED_IN,
                timestamp: "2025-12-27T08:40:00Z",
                updatedBy: {
                    userId: "u-002",
                    name: "Jane Smith",
                    role: "Weighbridge Operator"
                }
            }
        ]
    },

    {
        lorryId: "2",
        refNum: "ab456xy",
        registration: "lm12abc",

        checkedInAt: "2025-12-27T08:55:00Z",
        checkedOutAt: null,
        currentStatus: LORRY_STATUS_ENUM.LOADING,

        statusHistory: [
            {
                status: LORRY_STATUS_ENUM.CHECKED_IN,
                timestamp: "2025-12-27T08:55:00Z",
                updatedBy: {
                    userId: "u-002",
                    name: "Jane Smith",
                    role: "Weighbridge Operator"
                }
            },
            {
                status: LORRY_STATUS_ENUM.LOADING,
                timestamp: "2025-12-27T09:10:00Z",
                updatedBy: {
                    userId: "u-003",
                    name: "Artur T",
                    role: "FLT Driver"
                }
            }
        ]
    },

    {
        lorryId: "3",
        refNum: "cd789ef",
        registration: "qr34def",

        checkedInAt: "2025-12-27T07:50:00Z",
        checkedOutAt: null,
        currentStatus: LORRY_STATUS_ENUM.LOADED,

        statusHistory: [
            {
                status: LORRY_STATUS_ENUM.CHECKED_IN,
                timestamp: "2025-12-27T07:50:00Z",
                updatedBy: {
                    userId: "u-002",
                    name: "Jane Smith",
                    role: "Weighbridge Operator"
                }
            },
            {
                status: LORRY_STATUS_ENUM.LOADING,
                timestamp: "2025-12-27T08:05:00Z",
                updatedBy: {
                    userId: "u-003",
                    name: "Artur T",
                    role: "FLT Driver"
                }
            },
            {
                status: LORRY_STATUS_ENUM.LOADED,
                timestamp: "2025-12-27T09:00:00Z",
                updatedBy: {
                    userId: "u-003",
                    name: "Artur T",
                    role: "FLT Driver"
                }
            }
        ]
    },

    {
        lorryId: "4",
        refNum: "gh012ij",
        registration: "st56ghi",

        checkedInAt: "2025-12-27T06:45:00Z",
        checkedOutAt: "2025-12-27T08:30:00Z",
        currentStatus: LORRY_STATUS_ENUM.CHECKED_OUT,

        statusHistory: [
            {
                status: LORRY_STATUS_ENUM.CHECKED_IN,
                timestamp: "2025-12-27T06:45:00Z",
                updatedBy: {
                    userId: "u-002",
                    name: "Jane Smith",
                    role: "Weighbridge Operator"
                }
            },
            {
                status: LORRY_STATUS_ENUM.LOADING,
                timestamp: "2025-12-27T07:00:00Z",
                updatedBy: {
                    userId: "u-004",
                    name: "Ralph L",
                    role: "FLT Driver"
                }
            },
            {
                status: LORRY_STATUS_ENUM.LOADED,
                timestamp: "2025-12-27T07:55:00Z",
                updatedBy: {
                    userId: "u-004",
                    name: "Ralph L",
                    role: "FLT Driver"
                }
            },
            {
                status: LORRY_STATUS_ENUM.CHECKED_OUT,
                timestamp: "2025-12-27T08:30:00Z",
                updatedBy: {
                    userId: "u-002",
                    name: "Jane Smith",
                    role: "Weighbridge Operator"
                }
            }
        ]
    }
];

module.exports = lorryTrackData;
