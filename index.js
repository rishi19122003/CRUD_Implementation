const express=require("express");
const app=express();
const port=3000;
const path=require("path");
var methodOverride = require('method-override');

const { v4: uuidv4 } = require('uuid');

let posts=[
    {
        username  : "Rishi",
        content  : "I love Coding And wants to become a software Developer",
        id : uuidv4()
    },
    {
        username  : "Devansh",
        content  : "practice makes a mman perfect",
        id : uuidv4()
    },
    {
        username  : "Pushkar",
        content  : "Hey wants to become a software or mern developer contact me!",
        id : uuidv4()
    }
];
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get("/",(req,res)=>{
    res.send("Hi Welcome to thee page");
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    // res.send("post is successfullu updated");
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");

});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
    

});
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let{newcontent}=req.body;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})


app.listen(port,(req,res)=>{
    console.log(`App is listening on port ${port}`);
});
