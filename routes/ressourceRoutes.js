const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const ressourceControllers = require('../controllers/ressourceControllers');
const upload = multer({ dest: 'upload/' })

router.get('/ressource/', ressourceControllers.count);
router.get('/ressource/get',  ressourceControllers.getAll);
router.get('/ressource/:ressources_id', ressourceControllers.getRessourceById);

router.post('/insert', authMiddleware.authenticateToken, permissionMiddleware.resourceCreatePermission, upload.array('files[]'), ressourceControllers.insert);

router.put('/ressource/:ressources_id',authMiddleware.authenticateToken, permissionMiddleware.resourceUpdatePermission, ressourceControllers.updateRessource);

router.delete('/ressource/:ressources_id',authMiddleware.authenticateToken, permissionMiddleware.resourceDeletePermission, ressourceControllers.deleteById);


module.exports = router;