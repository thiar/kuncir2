var app = angular.module('kuncir2', ['chart.js']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})
app.controller('statistik', function($scope,$http) {
   
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
   $scope.refresh = function()
   {
   	$scope.labels = [];
   	$scope.data = [[]];
   	if($scope.graphicOpt=='time')getStatistikWaktuPeminjaman(socket)
   	else if($scope.graphicOpt=='angkatan')getStatistikAngkatan(socket)
   	
   }
   
})