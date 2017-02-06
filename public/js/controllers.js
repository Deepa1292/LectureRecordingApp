/*  Module
 *
 * Description
 */
var cllsControllers = angular.module('CllsControllers', ['app.config']);
cllsControllers.controller('LecturesCtrl', ['$scope', '$http', 'LECTURES_URL', function($scope, $http, LECTURES_URL) {
   $scope.lecturesList = [];
   var req = {
      method: 'GET',
      //url: 'http://localhost:3000/lectures',
      url: LECTURES_URL,
      headers: {
         'Content-Type': 'application/json'
      }
   };

   $http(req).success(function(data, status, headers, config) {
      $scope.lecturesList = data;
      
      /* Filtering */
      var allModuleCategories = data.map(function(item) {
         return item.moduletitle;
      });

      var filteredModules = [];
      allModuleCategories.forEach(function(item) {
         if (filteredModules.indexOf(item) < 0 && item) {
            filteredModules.push(item);
         }
      });

		$scope.modules = filteredModules;
      
      $scope.filter = { modules: "" };

      $scope.isFiltered = function(val) {
         return !$scope.filter.modules[val.moduletitle];
      }      
   });
}]);

cllsControllers.controller('clickController', function($scope, $location, $http, $window) {
   var $urlval;
   $scope.rowClick = function() {
     // alert(this.lecture.url); // pop up the selected lecture URI
      $urlval = this.lecture.url;
		/*var data = [{"url":$urlval}];
      	$http.post('/lectures', data).success(function (data, status, headers){
      		//seems like this is a blocking operation
      		//inseting new window calls here din't work
      		
      		//$location.path('/addressbook');

      	});*/
      	//alert("Post sent")
         var str = $urlval;
         var result = str.slice(-33);
      	

         $window.location.href = '/lectures/' + result;
      	$window.location.href;

         }

   $scope.admin = function() {
      alert("Invoked");
      $urlval = this.lecture.url;
      var str = $urlval;
         var result = str.slice(-33);
         

         $window.location.href = '/lectures/admin/' + result;
         $window.location.href;
   }
      		
      //$scope.selected = this.lecture;
      //console.log($scope.selected);
      //alert($urlval);
      //$scope.openLink() = function ($urlval) {
      	// body...
      	//alert("i am running");
      	
      	//$scope.openLink();

      

});
