// handlers/attractionHandler.js
const Attraction = require('../models/Attraction');

// Get all attractions
exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attractions', error: error.message });
    }
};

// Get a single attraction by ID
exports.getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.status(200).json(attraction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attraction', error: error.message });
    }
};

// Create a new attraction
exports.createAttraction = async (req, res) => {
    try {
        const newAttraction = new Attraction(req.body);
        await newAttraction.save();
        res.status(201).json(newAttraction);
    } catch (error) {
        // Mongoose validation errors often result in a 400 Bad Request
        res.status(400).json({ message: 'Error creating attraction', error: error.message });
    }
};

// Update an attraction
exports.updateAttraction = async (req, res) => {
    try {
        const updatedAttraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedAttraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.status(200).json(updatedAttraction);
    } catch (error) {
        res.status(400).json({ message: 'Error updating attraction', error: error.message });
    }
};

// Delete an attraction
exports.deleteAttraction = async (req, res) => {
    try {
        const deletedAttraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!deletedAttraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }
        res.status(200).json({ message: 'Attraction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attraction', error: error.message });
    }
};
