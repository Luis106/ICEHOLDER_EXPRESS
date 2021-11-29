const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        ////Nombre del servicio
        Productos:{
            type: Array,
            required: true,
        },
        Cantidades:{
            type: Array,
            required: true,   
        },
        Fecha:{
            type: String,
            default: "dd/MM/yyyyy"
        },
        Hora:{
            type: String,
            default: "hh:mm"
        },
        Personal: {
            type: String,
            default: ""
        },
        del:{
            type: Boolean,
            default: true
        },
        Montos:{
            type: Array,
            required: true
        }
    }
)
const Venta = mongoose.model("Venta",todoShema);

module.exports = {
    Venta
}