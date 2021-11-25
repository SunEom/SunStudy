const express = require('express');
const router = express.Router();
const db = require('../lib/database');

router.get('/keyword/:keyword',(req,res,next)=>{
    let word = "%" + req.params.keyword + "%";
    db.query(`SELECT post.post_num,artist,title,post_body,created_date,post.updated_date,post.id as writer_id,post.genre,count(comment.post_num) as comment_count FROM post LEFT JOIN comment on post.post_num = comment.post_num GROUP BY post_num having title LIKE ? ORDER BY post.created_date DESC`,
    [word],
    (err,result)=>{
        if(err){
            next(err);
        }
        res.status(200).send({code : 200, payload : result});
    });
});

router.get('/genres/:genres',(req,res,next)=>{
    let word = req.params.genres;
    db.query(`SELECT post.post_num,artist,title,post_body,created_date,post.updated_date,post.id as writer_id,post.genre,count(comment.post_num) as comment_count FROM post LEFT JOIN comment on post.post_num = comment.post_num GROUP BY post_num having genre LIKE ? ORDER BY post.created_date DESC`,
    [word],
    (err,result)=>{
        if(err){
            next(err);
        }
        res.status(200).send({code : 200, payload : result});
    });
});

module.exports = router;