var socketio = require('socket.io')
var admin_model = require('../model/admin_model');
var moment = require('moment');
module.exports.listen = function(app){
    io = socketio.listen(app)
    
    io.on('connection',function(socket) {
    	console.log('new connection')
    	socket.emit('news',{status:'connection'})
    	socket.on('checkNRP',function(data){
	    	admin_model.checkNRP(data.nrp,function(rows){
	    		socket.emit('nrpCekResult',rows);
	    	})

	    })
	    socket.on('saveData',function(data){
	    	var now = moment().format("YYYY-MM-DD HH:mm:ss");
			console.log(now)
			if(data.isNewUser)
			{
				admin_model.insertNewUser(data.nrp,data.nama,data.nohp,data.angkatan,function(result){
					admin_model.insertPeminjam(now,data.jaminan,data.picture,data.nrp,function(result){

					})
				})
			}
			else
			{
				admin_model.insertPeminjam(now,data.jaminan,data.picture,data.nrp,function(result){

				})
			}
	    })
	    socket.on('last_ten',function(data){
	    	admin_model.last_ten(function(rows){
	    		socket.emit('respond_last_ten',rows);
	    	})
	    })
    })
    
    return io
}

module.exports.sendEvent = function(eventName,data,io){
	io.emit(eventName,data);

}