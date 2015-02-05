var app = angular.module('todo', []);
app.controller('todoController', ['$scope', '$compile', function ($scope, $compile) {
    $scope.addTodo = function () {
        document.getElementById('todo-here').appendChild($compile('<div todo class="todo-pane"></div>')($scope)[0]);
    }
}]);