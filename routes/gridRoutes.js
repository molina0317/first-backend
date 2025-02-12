const express = require("express");
const router = express.Router();
const GridData = require("../models/GridData");
const authMiddleware = require("../middleware/authMiddleware");

// Upload Excel Data to MongoDB
router.post("/upload", authMiddleware, async (req, res) => {
    try {
        const { data, mergedCells } = req.body;
        const userId = req.user.id;

        let gridData = await GridData.findOne({ userId });
        if (!gridData) {
            gridData = new GridData({ userId, data, mergedCells });
        } else {
            gridData.data = data;
            gridData.mergedCells = mergedCells;
        }

        await gridData.save();
        res.json({ message: "Excel data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Fetch saved Grid Data from MongoDB
router.get("/grid", authMiddleware, async (req, res) => {
    try {
        const gridData = await GridData.findOne({ userId: req.user.id });

        if (gridData) {
            res.json({ data: gridData.data, mergedCells: gridData.mergedCells });
        } else {
            res.json({ data: [], mergedCells: [] });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Save edited Grid Data back to MongoDB
router.post("/update", authMiddleware, async (req, res) => {
    try {
        const { data, mergedCells } = req.body;
        const userId = req.user.id;

        let gridData = await GridData.findOne({ userId });
        if (!gridData) {
            return res.status(404).json({ error: "No data found!" });
        }

        gridData.data = data;
        gridData.mergedCells = mergedCells;
        await gridData.save();

        res.json({ message: "Grid data updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
