module.exports = function(req, res, next) {
	
	/* if checking for admin */
	//if (req.user && req.user.type == 'admin') {
	if (req.user) {
		next();
	} else {
		res.send(401);
	}
}