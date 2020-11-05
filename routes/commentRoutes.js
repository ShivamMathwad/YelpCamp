var express = require("express");
var router = express.Router();

//Schema Setup
var Campground = require("../Models/campground.js");
var Comment    = require("../Models/comment.js");

//Middleware
var middleware = require("../middleware/middleware.js");

//NEW route
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
    //find campground by id
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("Comments/new.ejs",{campground:campground});
        }
    });
});

//CREATE route
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{ 
            //create new comment
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();  //save comment
                    campground.comments.push(comment); //connect new comment to a campground
                    campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+campground._id); //redirect to campgrounds show page
                }
            });
        }
    });
});

//EDIT route - show form to edit existing comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.render("Comments/edit.ejs", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE route - update comment
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE route
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;