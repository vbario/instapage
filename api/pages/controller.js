var Page = require('./model.js');

exports.index = function(req, res) {
  // Page.find().populate('user').exec()
  Page.find().populate('user').exec()
  .then((pages) => res.send(pages));
}

exports.show = function(req, res) {
  Page.findById(req.params.id)
  .then((pages) => res.send(pages))
  .catch((err) => res.send(404));
}

exports.update = function(req, res) {
  Page.findById(req.params.id)
  .then((page) => {

    page.title = req.body.title;
    page.description = req.body.description;
    page.image = req.body.image;
    page.imageLink = req.body.imageLink;
    page.buttonLink = req.body.buttonLink;
    page.buttonText = req.body.buttonText;    
    
    // page.user = req.body.user;
    // run script in script directory first and then copy use ID from the DB and paste here line 25 and on line 46.
    page.user = req.user._id;;
    /* // to add
    page.publishStartDate: req.body.publishStartDate;
    page.publishEndDate: req.body.publishEndDate;
    */

    page.save()
    .then(function(page) {
      res.send(page);
    })
    .catch(function(err) {
      res.status(422);
      res.send(err);
    });
  })
  .catch(() => res.send(404))
}

exports.create = function(req, res) {
  var page = new Page();

  page.title = req.body.title;
  page.description = req.body.description;
  page.image = req.body.image;
  page.imageLink = req.body.imageLink;
  page.buttonLink = req.body.buttonLink;
  page.buttonText = req.body.buttonText;  
  page.user = req.user._id;;

  page.save()
  .then(function(page) {
    res.send(page);
  }).catch(function(err) {
    res.status(422);
    res.send(err);
  });
}

exports.delete = function(req, res, next) {
  Page.remove({_id: req.params.id})
  .then(() => res.send(200))
  .catch(next)
}