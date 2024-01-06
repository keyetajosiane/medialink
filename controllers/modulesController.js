const Modules = require('../models/modulesModel');
const _authController = require('./authController');

exports.getAllModules = async (req, res) => {
    try {
        const modules = await Modules.findAll();
        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: "Internal server error while fetching modules." });
    }
};

exports.getModuleById = async (req, res) => {
    try {
        const module_id = req.params.module_id;
        const module = await Modules.findById(module_id);
        if (module) {
            res.json(module);
        } else {
            res.status(404).json({ message: "Module not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error while fetching module." });
    }
};

exports.createModule = async (req, res) => {
    try {
        const { module_name, description } = req.body;
        const current_user = await _authController.getCurrentUser(req.user);
        
        // Basic validation
        if (!module_name || !description) {
            res.status(400).json({ message: "Missing fields. Name, description are required." });
            return;
        }

        // Additional validation checks can go here
        // ...

        const moduleData = { module_name, description };
        if(current_user){
            moduleData.created_by = current_user.user_id
        }
        const result = await Modules.insert(moduleData);
        if (result) {
            const newModule = await Modules.findById(result);
            res.status(201).json(newModule);
        } else {
            res.status(400).json({ message: "Failed to create module." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error while creating module." });
    }
};

exports.updateModule = async (req, res) => {
    try {
        const module_id = req.params.module_id;
        const moduleData = req.body;
        // validate module_id
        const module = await Modules.findById(module_id);
        if (!module) {
            res.status(404).json({ message: "Module not found." });
            return;
        }
        const result = await Modules.update(module_id, moduleData);
        if (result) {
            const updatedModule = await Modules.findById(module_id);
            res.json(updatedModule);
        } else {
            res.status(400).json({ message: "Failed to update module." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error while updating module." });
    }
};

exports.deleteModule = async (req, res) => {
    try {
        const module_id = req.params.module_id;
        // validate module_id
        const module = await Modules.findById(module_id);
        if (!module) {
            res.status(404).json({ message: "Module not found." });
            return;
        }
        const result = await Modules.delete(module_id);
        if (result) {
            res.json({ message: "Module deleted successfully." });
        } else {
            res.status(404).json({ message: "Module not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error while deleting module." });
    }
};