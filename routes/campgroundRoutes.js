var express = require("express");
var router = express.Router();

//Schema Setup
var Campground = require("../Models/campground.js");
var Comment    = require("../Models/comment.js");

//Middleware
var middleware = require("../middleware/middleware.js");

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


//INDEX route - show all campgrounds
router.get("/campgrounds",function(req,res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //Get all campgrounds that match the search query string
        Campground.find({name: regex}, function(err,allCampgrounds){
            if(err){
                console.log(err);
            } else{
                if(allCampgrounds.length==0){
                    req.flash("error","No matches found");
                    return res.redirect("back");
                }
                res.render("Campgrounds/index.ejs", {campgrounds: allCampgrounds});
            }
        });
    } else {
        //Get all campgrounds from DB
        Campground.find({}, function(err,allCampgrounds){
            if(err){
                console.log(err);
            } else{
                res.render("Campgrounds/index.ejs", {campgrounds: allCampgrounds});
            }
        });
    }
});

//CREATE route - add new campground to DB
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){   //GET-campgrounds and POST-campgrounds are two different routes
    //Get data from form and add to DB
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, price:price, image:image, description:desc, author:author}; 
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else{
            //redirect back to GET-campgrounds
            res.redirect("/campgrounds");
        }
    });
});

//NEW route - show form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
    res.render("Campgrounds/new.ejs"); 
});

//SHOW route - show only one campground in detail
router.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else{
            //render show template with that campground 
            res.render("Campgrounds/show.ejs", {campground:foundCampground});
        }
    });  
});

//EDIT route - show form to edit existing campground
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        res.render("Campgrounds/edit.ejs", {campground:foundCampground});        
    });
});

//UPDATE route - update campground
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            //redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err,campgroundRemoved){
        if(err){
            res.redirect("/campgrounds");
        } else{
            Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, function(err){
                if(err){
                    console.log(err);
                }
                res.redirect("/campgrounds");
            });
        }
    });
});

module.exports = router;