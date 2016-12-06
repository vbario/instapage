var User = require('../api/users/model');
var Page = require('../api/pages/model');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instapage');

var u = new User();
u.email = 'test@example.org';
u.name = 'Test User';

u.save()
.then(function(u) {
  console.log("User created:", u, "ID:", u.id);  
  var p = new Page();
  p.title = "First Post Ever";
  p.description = "This is just a bunch of random text to fill up the page with nothing concrete and just spew it all out like there is no tomorrow and no commas or periods or semicolons or question marks it's all just one big blog of nonsense that I'm surprise you're still reading until now holy shit you're still going you should stop or I will think that you're crazy that's it you're definitely crazy for reading this far I give up.";
  p.buttonLink = "http://www.reactnativeexpress.com/";
  p.buttonText = "Check This Out!";
  p.image = "http://cdn.rawgit.com/dabbott/react-native-express/master/static/logo.png";
  p.imageLink = "http://www.reactnativeexpress.com/";
  p.user = u;

  p.save().then(function(p) { 
    console.log("Post created:", p);
    console.log("Press CTRL+C to exit the script.");
  });


  // Post.find().then((posts) => {
  //   posts.forEach((post) => {
  //     post.user = u._id;

  //     if (post.comments.length == 0) {
  //       post.comments.push({ user: u._id, content: "Test Comment 1"});
  //       post.comments.push({ user: u._id, content: "Test Comment 2"});
  //     }

  //     if (post.likedBy.length == 0) {
  //       post.likedBy.push(u._id);
  //     }

  //     post.save();
  //   })
  // });
  return;  
});
