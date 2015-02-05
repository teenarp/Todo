
//app.module('todo.todoDirective',[]);

app.directive('todo', function () {
    return {
        controller: function () {
            this.tags = {};

            this.addTags = function (tag) {
                tag = tag.toLowerCase();
                if (this.tags.hasOwnProperty(tag)) {
                    this.tags[tag] += 1;
                } else {
                    this.tags[tag] = 1;
                }
            };

            this.delTags = function (tag) {
                tag = tag.toLowerCase();
                if (this.tags.hasOwnProperty(tag)) {
                    this.tags[tag] -= 1;
                    if (this.tags[tag] === 0) {
                        delete this.tags[tag];
                    }
                }
            };
        },
        templateUrl: "./app/partials/todoPane.html",
        require: 'todo',
        restrict: 'A',
        scope: true,
        link: function ($scope, $elem, $attrs, $ctrl) {

            var getTagList = function (task) {
                return task.split('#').splice(1);
            };

            var getTitle = function (task) {
                return task.split('#')[0];
            }

            $scope.title = '';
            $scope.tasks = [];

            $scope.listColor = (['#ffee86', '#BDB6FF', '#CDFFD7', '#FCCDFF', '#DBCDFF'])[Math.floor(Math.random() * 10) % 5];

            $scope.getTags = function () {
                return $ctrl.tags;
            };

            $scope.addTask = function (task) {
                var newTask;
                if (getTitle(task)) {
                    // initialize task
                    newTask = { title: getTitle(task), done: false, tags: getTagList(task) };
                    // push tags in tags list
                    if (newTask.tags.length > 0) {
                        newTask.tags.forEach(function (tag) {
                            $ctrl.addTags(tag);
                        });
                    }
                    $scope.tasks.push(newTask);
                    $scope.task = '';
                }
            };
        }
    };
});


app.directive('task', function () {
    return {
        require: '^todo',
        restrict: 'A',
        link: function ($scope, $elem, $attrs, $ctrl) {
            $scope.addTags = function (tag) {
                tag = tag.toLowerCase();
                if ($scope.task.tags.indexOf(tag) < 0) {
                    $scope.task.tags.push(tag);
                    $ctrl.addTags(tag);
                }
                $scope.tag = '';
            };

            $scope.delTags = function (tag) {
                if ($scope.task.tags.indexOf(tag) > -1) {
                    $scope.task.tags.splice($scope.task.tags.indexOf(tag), 1);
                    $ctrl.delTags(tag);
                }
            };
        }
    }
});
