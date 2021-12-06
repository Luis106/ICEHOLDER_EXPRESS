const express = require("express")
const router = express.Router();

const {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne,
    mRestoreOne,
    mPapelera,
    mFindFor
} = require("../controllers/Provedores.controller")



//http://localhost:3000/Task
router.get('/', mFindAll);
router.post('/create', minsertOne);
router.post('/update', mUpdateOne);
router.post('/delete', mDeleteOne);
router.post('/restore', mRestoreOne);
router.post('/Papelera', mPapelera);
router.post('/buscar', mFindFor);

module.exports = router;