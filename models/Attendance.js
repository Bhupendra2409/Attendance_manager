const mongoose = require('mongoose');


const AttendanceSchema = new mongoose.Schema({
    orgId:{
        type:Number,
        required : [true,"Please provide a orgId"],
    },
    name:{
        type:String,
        required : [true,"Please provide a name"],
    },
    // desc:{
    //     type:String,
    //     max:500
    // },
    // photo:{
    //     type:String
    // },
    // likes:{
    //     type:Array,
    //     default:[]
    // },
    // comment:{
    //     type:Array,
    //     default:[]
    // },
    date:{
        type:Date
    },
},
{timestamps:true}
)

module.exports = mongoose.model('attendance',AttendanceSchema);