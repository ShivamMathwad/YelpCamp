var express        = require("express");
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var passport       = require("passport");
var LocalStrategy  = require("passport-local");
var flash          = require("connect-flash");
var methodOverride = require("method-override");
var seedDB         = require("./seeds.js"); 
var app = express();

app.locals.moment = require("moment");

//Route Setup
var commentRoutes    = require("./routes/commentRoutes.js");
var campgroundRoutes = require("./routes/campgroundRoutes.js");
var indexRoutes      = require("./routes/indexRoutes");

//mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});  //Local mongoDB
mongoose.connect("mongodb+srv://shivammad:shivam25@cluster0-ywjfs.mongodb.net/test?retryWrites=true&w=majority",{    //mongoDB Atlas 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}); 

app.use(bodyParser.urlencoded({extended:true}) );
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  //seed the database

//Schema Setup
var User       = require("./Models/user.js");
var Campground = require("./Models/campground.js");
var Comment    = require("./Models/comment.js");

//Passport Configuration
app.use(require("express-session")({
    secret: "Bubu is the cutest dog in the world!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Routes
app.use(indexRoutes);      //Auth Routes and landing-page route
app.use(campgroundRoutes); //Campground Routes
app.use(commentRoutes);    //Comment Routes


let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}
app.listen(port,function(){
    console.log("YelpCamp Server has started!!");
});