const express = require('express');
const Category = require('../models/category');
const Product = require('../models/product');

const router = express.Router();

// Adding category
router.post('/',(req, res, next) => {
        let id = 0;
        Category.find()
            .then((cats) => {
                id = cats.length + 1;
                let ancestors = req.body.ancestors;
                return Category.create({
                    _id: id,
                    ...req.body,
                    parent: ancestors[ancestors.length - 1],
                })
            })
            .then((cat) => res.send(cat))
            .catch((err) => next(err));
    })

// For getting sub-categories
router.get('/:catId/get-subs', (req,res,next) => {
    Category.find({parent:req.params.catId},{_id:1,name:1,image:1})
        .then((cats) => {
            if(cats.length==0){
                res.redirect('/category/'+req.params.catId+"/get-products");
            }
            else{
                res.send(cats);
            }
        })
        .catch((err) => next(err));
})

// For getting products of catId and ancestors of catId
router.get('/:catId/get-products', (req, res, next) => {
    Category.find({ ancestors: req.params.catId }).distinct("_id")
        .then((cats) => {
            cats.push(Number(req.params.catId));
            return Product.find({ category: { $in: cats } });
        })
        .then((prods) => res.send(prods))
        .catch((err) => next(err));
})


module.exports = router;