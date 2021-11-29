const express = require("express")
const router = express.Router();

const {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne,
    mRestoreOne
} = require("../controllers/Producto.controller")



//http://localhost:3000/Task
router.get('/', mFindAll);
router.post('/create', minsertOne);
router.post('/update', mUpdateOne);
router.post('/delete', mDeleteOne);
router.post('/restore', mRestoreOne);

module.exports = router;