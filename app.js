require("dotenv").config();
const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// Middleware
app.use(express.json());

// CORS (important for Swagger UI)
app.use(
    cors({
        origin: "*", // tighten later if needed
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.get("/", (req, res) => {
    res.json(
        {
            "name": "load-track-backend",
            "developer": {
                "name": "Karoly Hornyak",
                "tel": "+447421411763",
                "email": "karoly.webdev@gmail.com",
                "web": "karolyhornyak.com"
            },
        }
    );
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
