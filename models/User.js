const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    orgId:{
        type:Number,
        required : [true,"Please provide a orgId"],
        // min:3,
        // max:20,
        unique:true
    },
    name:{
        type:String,
        required : [true,"Please provide a name"],
        // min:3,
        // max:20,
        // unique:true
    },
    email:{
        type:String,
        required : [true,"Please provide a valid email"],
        max:50,
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password:{
        type: String,
        required : [true,"Please add a password "],
        minlength:6,
        select: false
    },
    // profilePicture:{
    //     type:String,
    //     default:""
    // },
    // coverPicture:{
    //     type:String,
    //     default:""
    // },
    // followers:{
    //     type:Array,
    //     default:[]
    // },
    // followings:{
    //     type:Array,
    //     default:[]
    // },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    // desc:{
    //     type:String,
    //     max:50,
    // },
    // city:{
    //     type:String,
    //     max:50
    // },
    // from:{
    //     type:String,
    //     max:50
    // },
    // relationship:{
    //     type:Number,
    //     enum:[1,2,3]
    // }
},
{timestamps:true}
)
UserSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
UserSchema.methods.matchPassword  = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports= mongoose.model('accounts',UserSchema);
 
