const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 8000;

const options = {
    definition: {
        "openapi": "3.0.3",
        "info": {
            "title": "Lorry Collection Load Track API",
            "version": "1.0.0",
            "description": "REST API for tracking lorry collections on a production site. Provides real-time visibility of lorry status, full status history, and role-based access for staff and administrators.",
            "contact": {
                "name": "Lorry Track Team",
                "email": "support@lorrytrack.local"
            }
        },
        "servers": [
            {
                "url": "http://localhost:{port}/api/v1",
                "description": "Local development server",
                "variables": {
                    "port": {
                        "default": "8000",
                        "enum": [
                            "3000",
                            "8000"
                        ]
                    }
                }
            },
            {
                "url": "https://lorry-track.example.com/api/v1",
                "description": "Production server"
            }
        ],
        "tags": [
            {
                "name": "Authentication",
                "description": "Login and authentication"
            },
            {
                "name": "Lorries",
                "description": "Lorry tracking and status management"
            },
            {
                "name": "Users",
                "description": "User and role management (Admin only)"
            }
        ],
        "paths": {
            "/auth/login": {
                "post": {
                    "summary": "User login",
                    "operationId": "loginUser",
                    "tags": [
                        "Authentication"
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LoginRequest"
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Login successful",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/LoginResponse"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Invalid credentials"
                        }
                    }
                }
            },
            "/lorries": {
                "get": {
                    "summary": "Get all lorries currently tracked",
                    "operationId": "getAllLorries",
                    "tags": [
                        "Lorries"
                    ],
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "List of lorries",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Lorry"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "post": {
                    "summary": "Check in a new lorry",
                    "operationId": "checkInLorry",
                    "tags": [
                        "Lorries"
                    ],
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LorryCheckInRequest"
                                }
                            }
                        }
                    },
                    "responses": {
                        "201": {
                            "description": "Lorry checked in successfully",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/Lorry"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/lorries/{lorryId}": {
                "get": {
                    "summary": "Get lorry by ID",
                    "operationId": "getLorryById",
                    "tags": [
                        "Lorries"
                    ],
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "parameters": [
                        {
                            "$ref": "#/components/parameters/LorryIdParam"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Lorry details",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/Lorry"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Lorry not found"
                        }
                    }
                },
                "delete": {
                    "summary": "Delete a lorry",
                    "operationId": "deleteLorry",
                    "tags": [
                        "Lorries"
                    ],
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "parameters": [
                        {
                            "$ref": "#/components/parameters/LorryIdParam"
                        }
                    ],
                    "responses": {
                        "204": {
                            "description": "Lorry deleted successfully"
                        },
                        "403": {
                            "description": "Forbidden – Admin access required"
                        },
                        "404": {
                            "description": "Lorry not found"
                        }
                    }
                }
            },
            "/lorries/{lorryId}/status": {
                "put": {
                    "summary": "Update lorry status",
                    "operationId": "updateLorryStatus",
                    "tags": [
                        "Lorries"
                    ],
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "parameters": [
                        {
                            "$ref": "#/components/parameters/LorryIdParam"
                        }
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UpdateStatusRequest"
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Status updated successfully",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/Lorry"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Invalid status transition"
                        }
                    }
                }
            },
            "/lorries/{lorryId}/history": {
                "get": {
                    "summary": "Get lorry status history",
                    "operationId": "getLorryHistory",
                    "tags": [
                        "Lorries"
                    ],
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "parameters": [
                        {
                            "$ref": "#/components/parameters/LorryIdParam"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Status history",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/StatusHistoryItem"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/users": {
                "get": {
                    "summary": "Get all users (Admin only)",
                    "operationId": "getAllUsers",
                    "tags": [
                        "Users"
                    ],
                    "security": [
                        {
                            "bearerAuth": []
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "List of users",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            },
            "parameters": {
                "LorryIdParam": {
                    "name": "lorryId",
                    "in": "path",
                    "required": true,
                    "description": "Unique lorry identifier",
                    "schema": {
                        "type": "string"
                    },
                    "example": "1"
                }
            },
            "schemas": {
                "LoginRequest": {
                    "type": "object",
                    "required": [
                        "username",
                        "password"
                    ],
                    "properties": {
                        "username": {
                            "type": "string",
                            "example": "jane.smith"
                        },
                        "password": {
                            "type": "string",
                            "example": "secret123"
                        }
                    }
                },
                "LoginResponse": {
                    "type": "object",
                    "properties": {
                        "token": {
                            "type": "string",
                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        },
                        "user": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                },
                "User": {
                    "type": "object",
                    "properties": {
                        "userId": {
                            "type": "string",
                            "example": "u-002"
                        },
                        "name": {
                            "type": "string",
                            "example": "Jane Smith"
                        },
                        "role": {
                            "type": "string",
                            "example": "Weighbridge Operator"
                        }
                    }
                },
                "Lorry": {
                    "type": "object",
                    "properties": {
                        "lorryId": {
                            "type": "string",
                            "example": "1"
                        },
                        "refNum": {
                            "type": "string",
                            "example": "vg123sd"
                        },
                        "registration": {
                            "type": "string",
                            "example": "pz65pwo"
                        },
                        "checkedInAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2025-12-27T08:40:00.000Z"
                        },
                        "checkedOutAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "example": null
                        },
                        "currentStatus": {
                            "$ref": "#/components/schemas/LorryStatus"
                        },
                        "statusHistory": {
                            "type": "array",
                            "items": {
                                "$ref": "#/components/schemas/StatusHistoryItem"
                            }
                        }
                    }
                },
                "StatusHistoryItem": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "$ref": "#/components/schemas/LorryStatus"
                        },
                        "timestamp": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2025-12-27T09:10:00.000Z"
                        },
                        "updatedBy": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                },
                "LorryStatus": {
                    "type": "string",
                    "enum": [
                        "CHECKED_IN",
                        "LOADING",
                        "LOADED",
                        "CHECKED_OUT"
                    ]
                },
                "LorryCheckInRequest": {
                    "type": "object",
                    "required": [
                        "refNum",
                        "registration"
                    ],
                    "properties": {
                        "refNum": {
                            "type": "string",
                            "example": "ab456xy"
                        },
                        "registration": {
                            "type": "string",
                            "example": "lm12abc"
                        }
                    }
                },
                "UpdateStatusRequest": {
                    "type": "object",
                    "required": [
                        "status"
                    ],
                    "properties": {
                        "status": {
                            "$ref": "#/components/schemas/LorryStatus"
                        }
                    }
                }
            }
        }
    },

    // Scan files that contain @openapi blocks
    apis: [],
};

module.exports = swaggerJSDoc(options);
