var mongoose = require("mongoose");
var Campground = require("./Models/campground.js");
var Comment = require("./Models/comment.js");


var data = [
    {
        name: "Night sky",
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nisi. Mollitia reprehenderit excepturi maiores doloribus, ab corporis, dolore fuga, pariatur sapiente optio amet magnam molestias sed quasi unde incidunt culpa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis accusantium consequuntur dignissimos vitae odit sed. Quam animi exercitationem illum nulla voluptatem nobis excepturi ducimus natus praesentium, est cumque quis assumenda!" 
    },
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nisi. Mollitia reprehenderit excepturi maiores doloribus, ab corporis, dolore fuga, pariatur sapiente optio amet magnam molestias sed quasi unde incidunt culpa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis accusantium consequuntur dignissimos vitae odit sed. Quam animi exercitationem illum nulla voluptatem nobis excepturi ducimus natus praesentium, est cumque quis assumenda!"
    },
    {
        name: "Daisy Mountain",
        image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nisi. Mollitia reprehenderit excepturi maiores doloribus, ab corporis, dolore fuga, pariatur sapiente optio amet magnam molestias sed quasi unde incidunt culpa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis accusantium consequuntur dignissimos vitae odit sed. Quam animi exercitationem illum nulla voluptatem nobis excepturi ducimus natus praesentium, est cumque quis assumenda!" 
    }
];


function seedDB(){
    Campground.deleteMany({}, function(err){         //Campground.deleteMany() is same as Campground.remove(), it is used to avoid Deprecation warning
        /*
        if(err){
            console.log(err);
        }
        console.log("Removed all campgrounds!!");

        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet!",
                            author: "Homer" 
                        }, function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
            });
        });*/
    });
}

module.exports = seedDB;
