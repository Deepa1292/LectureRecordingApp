var videoController = angular.module('LectureDisplay', ['app.config']);


videoController.controller('videoController', ['$scope', '$http', 'VIDEO_URL', function($scope, $http, VIDEO_URL) {
   $scope.videoList = [];
   var req = {
      method: 'GET',
      //url: 'http://localhost:3000/lectures/iptk',
      url: VIDEO_URL,
      headers: {
         'Content-Type': 'application/json'
      }
   };



   $http(req).success(function(data, status, headers, config) {
      $scope.videoList = data;
      $scope.link = $scope.videoList[0].url;
      $scope.link2 = $scope.videoList[1].url;
      $scope.img1 = $scope.videoList[0].thumbnails;
      $scope.temp = "http://clls.rbg.informatik.tu-darmstadt.de/clls/lecturematerial/c1e7e95bf36082f4/0c4de5653ec56000/videos/video.mp4"
      //$scope.link = $sce.trustAsResourceUrl($scope.videoList[0].url);
      alert($scope.videoList[0].url);


         });
   ]};