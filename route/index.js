const router=require('express').Router();
const {check,validationResult}=require('express-validator');
const Book=require('../model');
router.get('/api',(req,res)=>{
    const booklist=[]
    const cursorobj=Book.find({},(err,val)=>{
        if(err){
            res.status(400).json(err);
        }
    }).select('name img summary -_id').lean().cursor();
    cursorobj.on('data',(book)=>{
        booklist.push(book);
    })
    cursorobj.on('end',()=>{
        res.status(200).json(booklist);
    })
});
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const ErrorArr = []
    errors.array().map(err => ErrorArr.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: ErrorArr,
    })
  }
router.post('/api',[
    check('name').isString(),
    check('img').isString(),
    check('summary').isString()
],
validate,
(req,res)=>{
    const book=new Book(req.body);
    book.save((err,val)=>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(val);
        }
    })
})
module.exports=router;