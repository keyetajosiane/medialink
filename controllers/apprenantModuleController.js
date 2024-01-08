const ApprenantModule = require('../models/apprenantModulesModel');

class ApprenantModuleController {
    static async enrollApprenantToModule(req, res) {
        try {
            const { apprenant_id, module_id, academic_year } = req.body;
            const enrollmentId = await ApprenantModule.insert(apprenant_id, module_id, academic_year);
            if (enrollmentId) {
                res.status(201).json({ message: 'Enrollment created successfully', enrollmentId });
            } else {
                res.status(500).json({ message: 'Failed to create enrollment' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async batchEnrollApprenantsToModule(req, res) {
        try {
            const enrollments = req.body; // Expecting an array of enrollment objects
            const results = await ApprenantModule.batchInsert(enrollments);

            if (results) {
                res.status(201).json({ message: 'Batch enrollment successful', results });
            } else {
                res.status(500).json({ message: 'Failed to perform batch enrollment' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async getAllEnrollments(req, res) {
        try {
            const enrollments = await ApprenantModule.findAll();
            res.status(200).json(enrollments);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async getEnrollmentsByApprenant(req, res) {
        try {
            const { apprenant_id } = req.params;
            const enrollments = await ApprenantModule.findByApprenant(apprenant_id);
            res.status(200).json(enrollments);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async getEnrollmentsByModule(req, res) {
        try {
            const { module_id } = req.params;
            const enrollments = await ApprenantModule.findByModule(module_id);
            res.status(200).json(enrollments);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    static async withdrawEnrollment(req, res) {
        try {
            const { module_id, academic_year } = req.body;
            const { apprenant_id } = req.params;
            const success = await ApprenantModule.delete(apprenant_id, module_id, academic_year);
            if (success) {
                res.status(200).json({ message: 'Enrollment withdrawn successfully' });
            } else {
                res.status(404).json({ message: 'Enrollment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

module.exports = ApprenantModuleController;