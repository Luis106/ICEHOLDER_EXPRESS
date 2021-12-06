const express = require("express")
const router = express.Router();

const {
    mFind,
    minsertOne,
    FindAll,
    mDelete,
    mUpdate,
    FindAllP,
    mRestore,
    mFindFor
} = require("../controllers/usuario.controller.js")


router.post('/', mFind);
router.post('/crear', minsertOne);
router.post('/mostrar', FindAll);
router.post('/borrar', mDelete);
router.post('/cambiar', mUpdate);
router.post('/papelera', FindAllP);
router.post('/restaurar', mRestore);
router.post('/buscar', mFindFor);



module.exports = router;
