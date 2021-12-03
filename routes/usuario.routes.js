const express = require("express")
const router = express.Router();

const {
    mFind,
    minsertOne,
    FindAll,
    mDelete,
    mUpdate,
    FindAllP,
    mRestore
} = require("../controllers/usuario.controller.js")


router.post('/', mFind);
router.post('/crear', minsertOne);
router.post('/mostrar', FindAll);
router.post('/borrar', mDelete);
router.post('/cambiar', mUpdate);
router.post('/papelera', FindAllP);
router.post('/restaurar', mRestore);


module.exports = router;
