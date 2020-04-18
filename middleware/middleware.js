//All the middleware goes here
var middlewareObj = {};

//Schema Setup
var Campground = require("../Models/campground.js");
var Comment    = require("../Models/comment.js");

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    //Is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back"); //goes back to previous page
            } else{
                //Check if foundCampground exists
                if(!foundCampground) {
                    req.flash("error", "Item not found");
                    return res.redirect("back");
                }
                //Does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    //Is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                res.redirect("back"); //goes back to previous page
            } else{
                //Check if foundComment exists
                if(!foundComment) {
                    req.flash("error", "Item not found");
                    return res.redirect("back");
                }
                //Does user own that comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj; 

