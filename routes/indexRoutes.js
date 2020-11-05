var express  = require("express");
var passport = require("passport");
var router = express.Router();

//Schema Setup
var User = require("../Models/user.js");


//Landing page 
router.get("/",function(req,res){
    res.render("landing.ejs");
});

//Show the register form
router.get("/register",function(req,res){
    res.render("register.ejs");
});

//Handle sign up logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            return res.render("register.ejs",{"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show login form
router.get("/login",function(req,res){
    res.render("login.ejs");
});

//Handle login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome to YelpCamp!"
    }), function(req,res){
});

//Logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;