var app = angular.module('kuncir2', ['chart.js']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})
app.controller('statistik', function($scope,$http) {
   $scope.MonthValues = [{
	  id: 1,
	  label: 'Januari',
	  value : 'Jan'
	}, {
	  id: 2,
	  label: 'Februari',
	  value : 'Feb'
	}, {
	  id: 3,
	  label: 'Maret',
	  value : 'Mar'
	}, {
	  id: 4,
	  label: 'April',
	  value : 'Apr'
	}, {
	  id: 5,
	  label: 'Mei',
	  value : 'May'
	}, {
	  id: 6,
	  label: 'Juni',
	  value : 'Jun'
	}, {
	  id: 7,
	  label: 'Juli',
	  value : 'Jul'
	}, {
	  id: 8,
	  label: 'Agustus',
	  value : 'Aug'
	}, {
	  id: 9,
	  label: 'September',
	  value : 'Sep'
	}, {
	  id: 10,
	  label: 'Oktober',
	  value : 'Oct'
	}, {
	  id: 11,
	  label: 'November',
	  value : 'Nov'
	}, {
	  id: 12,
	  label: 'Desember',
	  value : 'Dec'
	}];
   $scope.labels = [];
   $scope.series = ['Series A'];
   $scope.data = [[]];
   $scope.colours =[{
	    fillColor: '#6BB9F0',
	    strokeColor: '#34495E',
	    highlightFill: '#19B5FE',
	    highlightStroke: '#22313F'
	}];
   var socket = io.connect();
   getStatistikWaktuPeminjaman(socket)

   $scope.$watch('graphicOpt',function(){
   	$scope.labels = [];
   	$scope.data = [[]];
   	if($scope.graphicOpt=='time')getStatistikWaktuPeminjaman(socket);
   	else if($scope.graphicOpt=='angkatan')getStatistikAngkatan(socket);
   	else if($scope.graphicOpt=='peminjaman')getStatistikPeminjaman(socket);
   })
   $scope.$watch('month',function(){

   	getStatistikPeminjaman(socket);
   })
   socket.on('resultStatistikWaktuPeminjaman',function(data){
   	$scope.labels = [];
   	$scope.data = [[]];
   	for(i=0; i<data.length ;i++)
   	{
   		$scope.labels.push("jam:"+data[i].time)
   		$scope.data[0].push(data[i].counter)	
   	}
   	console.log($scope.data)
   	$scope.$apply();
   	
   })
   socket.on('resultStatistikPeminjaman',function(data){
   	$scope.labels = [];
   	$scope.data = [[]];
   	for(i=0; i<data.length ;i++)
   	{
   		$scope.labels.push(data[i].date)
   		$scope.data[0].push(data[i].counter)	
   	}
   	if($scope.data[0].length==0)
   	{
   		$scope.labels.push(0)
   		$scope.data[0].push(0)
   		console.log('0')
   	}
   	$scope.$apply();
   	
   })
   socket.on('resultStatistikAngkatan',function(data){
   	$scope.labels = [];
   	$scope.data = [];
   	for(i=0; i<data.length ;i++)
   	{
   		$scope.labels.push(data[i].angkatan)
   		$scope.data.push(data[i].counter)	
   	}
   	console.log($scope.data)
   	$scope.$apply();
   	
   })
   function getStatistikAngkatan(socket)
   {
   	socket.emit('getStatistikAngkatan')
   }
   function getStatistikWaktuPeminjaman(socket)
   {
   	socket.emit('getStatistikWaktuPeminjaman')
   }
   function getStatistikPeminjaman(socket)
   {
   	var data = {
   		month : $scope.month.value
   	}
   	socket.emit('getStatistikPeminjaman',data)
   }
   $scope.refresh = function()
   {
   	$scope.labels = [];
   	$scope.data = [[]];
   	if($scope.graphicOpt=='time')getStatistikWaktuPeminjaman(socket);
   	else if($scope.graphicOpt=='angkatan')getStatistikAngkatan(socket);
   	else if($scope.graphicOpt=='peminjaman')getStatistikPeminjaman(socket);
   	
   }
   
})