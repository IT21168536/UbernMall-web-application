const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi")
const passwordComplexity = require("joi-password-complexity");

const SupplierSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },  
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

//Generate web token for Supplier
SupplierSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
};

const Supplier = mongoose.model("Supplier",SupplierSchema);

//Validation
const validate = (data) =>{
    const schema = joi.object({
        firstName:joi.string().required().label("First Name"),
        lastName:joi.string().required().label("Last Name"),
        address:joi.string().required().label("Address"),
        contactNo:joi.string().required().label("Contact No"),
        email:joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password")
    });
    return schema.validate(data)
};

module.exports = { Supplier, validate };
