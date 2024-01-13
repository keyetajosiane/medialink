const FormateurModule = require('../models/formateurModulesModel');

class FormateurModuleController {
    static async assignFormateurToModule(req, res) {
        try {
            const { formateur_id, module_id, academic_year } = req.body;
            const assignmentId = await FormateurModule.insert(formateur_id, module_id, academic_year);
            if (assignmentId) {
                res.status(201).json({ message: 'Formateur assigned to Module successfully', assignmentId });
            } else {
                res.status(500).json({ message: 'Failed to assign Formateur to Module' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async batchAssignFormateursToModule(req, res) {
        try {
            const assignments = req.body; // Expecting an array of assignment objects
            const results = await FormateurModule.batchInsert(assignments);
            if (results) {
                res.status(201).json({ message: 'Batch assignment successful', results });
            } else {
                res.status(500).json({ message: 'Failed to perform batch assignment' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async getAllAssignments(req, res) {
        try {
            const assignments = await FormateurModule.findAll();
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async getAssignmentsByFormateur(req, res) {
        try {
            const { formateur_id } = req.params;
            const assignments = await FormateurModule.findByFormateur(formateur_id);
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async getAssignmentsByModule(req, res) {
        try {
            const { module_id } = req.params;
            const assignments = await FormateurModule.findByModule(module_id);
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async unassignFormateurFromModule(req, res) {
        try {
            const { formateur_id, module_id, academic_year } = req.params;
            const success = await FormateurModule.delete(formateur_id, module_id, academic_year);
            if (success) {
                res.status(200).json({ message: 'Formateur unassigned from Module successfully' });
            } else {
                res.status(404).json({ message: 'Assignment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async getModulesIDs(formateur_id, academic_year) {
        try {
            const modules = await FormateurModule.findFormateurModulesIDs(formateur_id, academic_year);
            res.status(200).json(modules);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

module.exports = FormateurModuleController;