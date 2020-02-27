const Joi=require('@hapi/joi');

class Validation{

    registerValidation=(data)=>{
        
        const schema=Joi.object({
            name:Joi.string().min(6).required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(6).max(100).required()
        });
    
        return schema.validate(data);
    }
    
    loginValidation=(data)=>{
        
        const schema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().min(6).max(100).required()
        });
    
        return schema.validate(data);
    }
}


module.exports=Validation;
