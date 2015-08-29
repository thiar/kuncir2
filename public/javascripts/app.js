var app = angular.module('kuncir2', []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})
app.controller('admin', function($scope,$http) {

   var socket = io.connect();
   last_ten(socket)
   Webcam.set({
        width: 320,
        height: 240,
        dest_width: 640,
        dest_height: 480,
        image_format: 'jpeg',
        jpeg_quality: 90,
        force_flash: false,
        flip_horiz: true,
        fps: 45
    });
   Webcam.attach('#my_camera' );

   $scope.isNewUser = true;
   $scope.jaminan = [];
   $scope.nama =null;
   $scope.noHp = null;
   $scope.last_ten = []
   socket.on('nrpCekResult', function (data) {
	   console.log(data);
	   if(data.length >0)
	   {
	   	 $scope.nama = data[0].nama
	   	 $scope.noHp = data[0].nohp
	   	 $scope.isNewUser = false;
	   }
	   else $scope.isNewUser = true;
	   $scope.$apply();

	});
   socket.on('respond_last_ten',function (data){
   	console.log(data)
   	$scope.last_ten = data;
   	$scope.$apply()
   })
   function last_ten(socket){
   	var data ={

   	}
   	socket.emit('last_ten',data);
   }
   $scope.isBorrowed = false;
   
   $scope.$watch('nrp',function(){
   	$scope.nama = []
	  $scope.noHp = []
	  $scope.angkatan = []
   	if(String($scope.nrp).length==10){
   		$scope.angkatan = "20" + String($scope.nrp).substring(2,4);
   		var data = {
   			nrp: $scope.nrp
   		}
   		socket.emit('checkNRP',data);
   		console.log($scope.nrp,$scope.nama)	
   	}
   	else
   	{
   		$scope.isNewUser = false
   	}
   	
   })
   $scope.BorrowKey = function()
   {
   	
   	if($scope.nama.length < 1 || $scope.noHp.length < 1 || $scope.angkatan.length < 1 || $scope.nrp.length < 1 || $scope.jaminan.length < 1)
   	{
   		$('#alert').foundation('reveal','open');
   	}
   	else
   	{
	   	 Webcam.snap( function(data_uri) {
	        document.getElementById('falseFoto').innerHTML = '<img style="width:320px;height:240px;" id="falseFaces" src="'+data_uri+'"/>';
	        $('#falseFaces').faceDetection({
              complete: function (faces) {
                  console.log(faces.length)
                  if(faces.length==0)
                  {
                    $('#fotoAlert').foundation('reveal','open');
                  }
                  else
                  {
                    document.getElementById('my_result').innerHTML = '<img id="result" src="'+data_uri+'"/>';
                    $scope.isBorrowed = true;
                    socket.emit('saveData',data);
                  }
              }
          })
	        var data = {
	   			nrp: $scope.nrp,
	   			nama: $scope.nama,
	   			nohp: $scope.noHp,
	   			jaminan:$scope.jaminan,
	   			angkatan:$scope.angkatan,
	   			picture:data_uri,
	   			isNewUser : $scope.isNewUser
	   		}
        


	    });   		
   	}

   	$scope.ReturnKey = function(){
   		$scope.isBorrowed = false;
		$scope.nrp = null
   		$scope.nama = null
		$scope.noHp = null
		$scope.jaminan = null
		$scope.angkatan = null
		last_ten(socket);
   	}
   }
})
