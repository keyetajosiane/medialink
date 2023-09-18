const departement_formateurModels = require('../models/departement_formateurModels');
const formateur = require("../models/formateurModels");

exports.updateDepartement_formateur = async (req, res) => {
    const { formateur_id } = req.params
    const departemen = req.body;
    if (formateur_id) {
        return res.status(400).json({message: "formateur id is required"})
    }
    // check if formateur exists
    const formateurs = await formateur.findByFormateurId(formateur_id)
    if (!formateurs) {
        return res.status(404).json({message: "formteur not found"})
    }
    // get all current formateur departement
    const current_departement = await departement_formateurModels.findByDepartement_id(departement_id)
    const new_departement = []
    if(current_departement === null) new_departement = departemen
    else {
        // delete old departement that are not in incoming departement
        for(let departement_id of current_departement){
            if (!departemen.includes(departement_id)){
                await departement_formateurModels.deleteByDepatementId(departement_id)
            }
        }

        // filter new permissions
        for(let departement_id of departemen){
            if (!current_departement.includes(departement_id)){
                new_departement.push(departement_id)
            }
        }
    }
    // insert new departemet_formateur
    for(let departement_id of new_departement){
        await departement_formateurModels.insert({formateur_id, departement_id})
    }
    return res.json({message: " formateur_departement updated"})
}