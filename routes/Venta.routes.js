const express = require("express")
const router = express.Router();

const {
    minsertOne,
    mFindAll,
    mRestore,
    mDeleteOne,
    mMontoD,
    mMontopDia,
    VentaspDia
} = require("../controllers/Venta.controller")

//http://localhost:3000/Task
router.post('/create', minsertOne);
router.get('/', mFindAll);
router.post('/restore', mRestore);
router.post('/delete', mDeleteOne);
router.post('/corte', mMontoD);
router.post('/cortepordia', mMontopDia);
router.post('/ventaspordia', VentaspDia);

module.exports = router;