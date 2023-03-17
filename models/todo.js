const mongoose= require('mongoose');

const schema= mongoose.Schema;
const model= mongoose.model;

const todoSchema= new schema({
    title: {
        type:String,
        require:true
    },
    content:{
        type:String,
        require:false
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    // creates timestamp
    timestamps:true
});

module.exports= model('TodoSchema',todoSchema);