import express from "express";
import qr from "qr-image";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Render the homepage
app.get("/", (req, res) => {
    res.render("index", { qrCodeBase64: null, error: null });
});

// Handle QR Code Generation
app.post("/generate", (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.render("index", { qrCodeBase64: null, error: "Please enter a URL" });
    }

    // Generate QR code as a Base64 string (no file saving)
    const qrSvg = qr.imageSync(url, { type: "png" });
    const qrBase64 = "data:image/png;base64," + qrSvg.toString("base64");

    res.render("index", { qrCodeBase64: qrBase64, error: null });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
