require("dotenv").config();
const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const collectionRoutes = require("./src/routes/collection.routes");
const commentRoutes = require("./src/routes/comment.routes");

const app = express();

// Trust proxy (Render / Heroku / Nginx)
app.set("trust proxy", 1);

// Middleware
app.use(express.json());

// CORS
app.use(
    cors({
        origin: "*", // restrict in production
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Root info
app.get("/", (req, res) => {
    res.json({
        name: "collection-track-backend",
        developer: {
            name: "Karoly Hornyak",
            tel: "+447421411763",
            email: "karoly.webdev@gmail.com",
            web: "karolyhornyak.com"
        }
    });
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/collections", collectionRoutes);
app.use("/comments", commentRoutes);

module.exports = app;
