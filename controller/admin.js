var express = require('express');
var router = express.Router();
var http= require('http');
var io = require('../socket/socket.js')
var admin_model = require('../model/admin_model');

router.get('/', function(req, res, next) {
  if(req.session.login)
  {
  	res.redirect('/admin/home');
  }
  else
  {
  	res.redirect('/admin/login');
  }
});

router.get('/home', function(req, res, next) {
  if(req.session.login)
  {
  	res.render('admin/home',{title: 'Kuncir2',login:req.session.login});
  }
  else
  {
  	res.redirect('/admin/login');
  }

});
router.get('/statistik', function(req, res, next) {
  if(req.session.login)
  {
    res.render('admin/statistik',{title: 'Kuncir2',login:req.session.login});
  }
  else
  {
    res.redirect('/admin/login');
  }

});
router.get('/login', function(req, res, next) {
  res.render('admin/login', {title: 'Kuncir2',login:req.session.login});	
});
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    // cannot access session here
  })
  res.render('admin/login');  
});

router.post('/login', function(req, res, next) {
  var user =  req.body.username;
  var pass = req.body.pass;
  admin_model.auth(user,pass,function(rows){
  	if(rows)
  	{
  		var sess = req.session;
  		sess.login = true;
  		sess.user = user
  		sess.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  		io.sendEvent('newLogin', {namaLab: user},globalIo);
  		res.redirect('/admin/');
  	}
  	else
  	{
  		res.redirect('/admin/login?login=false');
  	}
  })
  
});

module.exports = router;
