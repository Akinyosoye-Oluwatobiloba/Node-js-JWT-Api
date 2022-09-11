const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get("/api",(req,res)=>{
    res.json({
        msg:"hey there,welcome to this api service"
    });
});
//create user
app.post("/api/posts",verifyToken,(req,res)=>{
    
    jwt.verify(req.token,"secretkey",(err,authData)=>{
        if(err){
            res.sendStatus(403);//forbidden
        }else{
            res.json({
                msg:"post created....",
                authData,
            });
        }
    })
    res.json({
        msg:'post created'
    });
});
//create session
app.post('/api/login',(req,res)=>{
    const user = {
        id:1,
        username:'john',
        email:"john@gmail.com"
    }
    jwt.sign({user:user},"secretkey",(err,token)=>{
        res.json({
            token,
            
    });
    });
});

//verify Token 
function verifyToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split('')[1];
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403); //forbidden
    }
}

app.listen(3000,(req,res)=>{
    console.log('server running at 3000');
});
