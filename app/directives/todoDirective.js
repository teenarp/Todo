function todoDirective(){
  return {
    restrict : 'A',
    scope: true,
    link : function($scope, $elem, $attrs){
      $scope.tasks = [];
      $scope.tagFilter = {};

      $scope.tasks.tags = [''];
      $scope.tagFilter.tag = $scope.tasks.tags[0];

      $scope.addTask = function (task) {
        if(task.title){
          if(task.hasOwnProperty('tags')){
            task.tags.forEach(function(tag){
              if($scope.tasks.tags.indexOf(tag) === -1){
                $scope.tasks.tags.push(tag);
              }
            });
          }
          $scope.tasks.push(task);
          $scope.task = '';//empty the input model
        }
      };

      $scope.initializeTask = function (title, tags){
        var task = {title: title, done:false, tags: (tags && tags.split(',')) || ['']};
        return task;
      };

      $scope.addTag = function(tag){
        console.log(tag);
        if(tag){
          if($scope.tasks.tags.indexOf(tag) === -1){
            $scope.tasks.tags.push(tag);
          }
        }
      }
    }
  }
};
