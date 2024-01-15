const departement_formateurModels = require('../models/departement_formateurModels');
const formateur = require("../models/formateurModels");

exports.updateDepartement_formateur = async (formateur_id, departments) => {
    if (!formateur_id) {
        const error = new Error("Formateur id is required");
        error.code = 400; // HTTP status code for Bad Request
        throw error;
    }
    // check if formateur exists
    const formateurs = await formateur.findById(formateur_id)
    if (!formateurs) {
        const error = new Error("Formateur not found");
        error.code = 404; // HTTP status code for Not Found
        throw error;
    }
    // get all current formateur departement
    let current_departements = await departement_formateurModels.findByFormateurId(formateur_id)
    const new_departements = []
    if (current_departements === null) new_departements = departments
    else {
        current_departements = current_departements.map(departement => departement.departement_id)
        // if no change in departement, then return true
        if (current_departements === departments) return true
        // delete old departement that are not in incoming departement
        for (let departement_id of current_departements) {
            if (!departments.includes(departement_id)) {
                await departement_formateurModels.deleteByDepatementId(departement_id)
            }
        }
        // filter new permissions
        for (let departement_id of departments) {
            if (!current_departements.includes(departement_id)) {
                new_departements.push(departement_id)
            }
        }
    }
    // insert new departemet_formateur
    // Map each department_id to an array of values
    const values = new_departements.map(departement_id => ({
        formateur_id, departement_id
    }));

    // Construct a single query to insert all rows
    if (values.length > 0) {
        try {
            await departement_formateurModels.bulkInsert(values);
        } catch (err) {
            const error = new Error("internal server error");
            error.code = 500;
            throw error;
        }
    }
    return true
}