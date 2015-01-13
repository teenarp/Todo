var app = angular.module('todo',[]);

app.controller('todoController', ['$scope',function ($scope){
  $scope.tasks = [];
  $scope.tasks.tags = [];

  $scope.addTask = function (task) {
    if(task.hasOwnProperty('tags')){
      task.tags.forEach(function(tag){
        if($scope.tasks.tags.indexOf(tag) === -1){
          $scope.tasks.tags.push(tag);
        }
      });
    }
    $scope.tasks.push(task);
  }

  $scope.initializeTask = function (title, tags){
    var task = {title: title, done:false, tags: (tags && tags.split(',')) || []};
    return task;
  }
}]);
