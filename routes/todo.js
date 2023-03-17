var router=require('express').Router();
const TodoSchema= require('../models/todo');


// Get all todo
router.get('/',(req,res)=>{
    // getting query
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 100
    // making skip amount
    const skiplist= (page-1)*limit;
    // getting all todo
    TodoSchema.find()
    .skip(skiplist)
    .limit(limit)
    .exec((err,todos)=>{
        if (err){
            return res.json({error:err})
        }
        return res.json({data:todos});
    });
    // res.send("Get route")
})

// create a todo
router.post('/',(req,res)=>{
    const todo= TodoSchema({
        title:req.body.title,
        content:req.body.content,
    });
    todo.save((err,todo)=>{
        if (err){
            return res.json({status:'failed',error:err})
        }
        return res.json({status:'success',message:"data inserted"});
    })
    // res.send("Create todo")
});

// update a todo
router.put('/:id',(req,res)=>{
    TodoSchema.findById(req.params.id).exec((err,todo)=>{
        if (err){
            res.json({message:"Invalid Id passed", error:err})
        }
        todo.title=req.body.title ?? todo.title;
        todo.content=req.body.content ?? todo.content;
        todo.completed=req.body.completed ?? todo.completed;
        todo.save((err,todo)=>{
            if (err){
                return res.json({message:"invalid data", error:err})
            }
            return res.json({message:"Record updated",data:todo})
        })
    });
});

// delete a todo
router.delete('/:id',(req,res)=>{
    TodoSchema.remove({
        _id:req.params.id
    }).exec((err,todo)=>{
        if (err){
            return res.json({message:"Could not delete",error:err});
        }
        return res.json({message:"Record deleted",data:todo});
    })
});

module.exports = router;