const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const folderPath = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ dest: 'upload' })


const ressourceControllers = require('../controllers/ressourceControllers');

router.get('/ressource/', ressourceControllers.count);
router.get('/ressource/get', ressourceControllers.getAll);
router.get('/ressource/:ressources_id', ressourceControllers.getRessourceById);
router.post('/insert', upload.array('files', 100), ressourceControllers.insert);
router.put('/ressource/:ressources_id', ressourceControllers.updateRessource);
router.put('/ressource/:titlle', ressourceControllers.updateTitlle);
router.put('/ressource/:description', ressourceControllers.updateDescription);
router.delete('/ressource/:ressources_id', ressourceControllers.deleteById);
router.delete('/ressource/:titlle', ressourceControllers.deleteByTitlle);

module.exports = router;