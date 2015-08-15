var driver = require('../config/database/driver/mysql/mysqldriver.js');

/*always give fn parameter to return your data*/
module.exports.selectDB = function(fn) {
					driver.query("select * from db",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows);
						}
					);
				}

module.exports.showUser = function(fn) {
					driver.query("select * from user",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}

module.exports.auth = function(user,pass,fn) {
					driver.query("select * from lab",function(err, rows, fields) {
				  			var login = false;
				  			if (err) throw err;
				  			for (var i = rows.length - 1; i >= 0; i--) {
				  				if(user == rows[i].namalab && pass == rows[i].pass)
				  				{
				  					login = true;
				  					break;
				  				}
				  				
				  			};
				  			fn(login)
						}
					);
				}

module.exports.checkNRP = function(nrp,fn){
					driver.query("select * from peminjam_terdaftar where NRP='"+nrp+"'",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows);
						}
					);
				}
module.exports.last_ten = function(fn){
					driver.query("select DATE_FORMAT(waktu, '%Y-%m-%d') DATEONLY,DATE_FORMAT(waktu,'%H:%i:%s') TIMEONLY,nama,nrp,picture,jaminan from peminjam join peminjam_terdaftar on peminjam.peminjam_terdaftar_NRP = peminjam_terdaftar.NRP limit  10",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows);
						}
					);
				}

module.exports.insertNewUser = function(nrp,nama,nohp,angkatan,fn){
					driver.query("insert into peminjam_terdaftar(NRP,nama,nohp,angkatan) values('"+nrp+"','"+nama+"','"+nohp+"','"+angkatan+"') ",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows);
						}
					);
				}

module.exports.insertPeminjam = function(waktu,jaminan,picture,nrp,fn){
					driver.query("insert into peminjam(idpeminjam,waktu,jaminan,picture,peminjam_terdaftar_NRP) values('','"+waktu+"','"+jaminan+"','"+picture+"','"+nrp+"') ",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows);
						}
					);
				}

