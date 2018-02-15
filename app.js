// MODULE
var taskKeeperApp = angular.module('taskKeeperApp', ['ngRoute', 'ngStorage']);

// ROUTES
taskKeeperApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    .when('/done', {
        templateUrl: 'pages/done.htm',
        controller: 'doneTaskController'
    })
});

// SERVICES
taskKeeperApp.service('taskService', function() {  
    this.taskKeeper = [];
});

// CONTROLLERS
taskKeeperApp.controller('homeController', ['$scope', '$routeParams', 'taskService', '$localStorage', function($scope, $routeParams, taskService, $localStorage) {

    $scope.taskKeeper = taskService.taskKeeper;
    console.log($scope.taskKeeper);
    $scope.$watch('taskKeeper', function(){
        taskService.taskKeeper = $scope.taskKeeper;
    });
      
    $scope.tasks = $localStorage.tasks;
    console.log($scope.taskKeeper);

    $scope.$watch('[tasks]', function() {
        $localStorage.tasks = $scope.tasks;
        console.log($scope.taskKeeper);
    }, true);

    $scope.$watch(function() {
        return angular.toJson($localStorage);
    }, function() {
        $scope.tasks = $localStorage.tasks;
        if ($scope.tasks === undefined) {
            $scope.taskKeeper = [];
        } else {
            $scope.taskKeeper = $scope.tasks;
        }
    });

    $scope.submit = function() {};
    
    $scope.addTask = function(){
        console.log($scope.taskKeeper);
        $scope.taskKeeper.push($scope.newTask);
        $scope.tasks = $scope.taskKeeper;
        $scope.newTask = {};
    };
    
    $scope.doneTask = function(index) {
        $scope.taskKeeper[index].done = true;
        $scope.tasks = $scope.taskKeeper;
    }
    
}]);

taskKeeperApp.controller('doneTaskController', ['$scope', '$routeParams', 'taskService', '$localStorage', function($scope, $routeParams, taskService, $localStorage) {
    $scope.taskKeeper = taskService.taskKeeper;
    $scope.$watch('taskKeeper', function(){
        taskService.taskKeeper = $scope.taskKeeper;
    });
    
    // $scope.taskKeeper = $localStorage.tasks;

    $scope.$watch('[tasks]', function() {
        $localStorage.tasks = $scope.taskKeeper;
    }, true);

    $scope.$watch(function() {
        return angular.toJson($localStorage);
    }, function() {
        $scope.tasks = $localStorage.tasks;
        if ($scope.tasks === undefined) {
            $scope.taskKeeper = [];
        } else {
            $scope.taskKeeper = $scope.tasks;
        }
    });
    
    $scope.undoneTask = function(index) {
        $scope.taskKeeper[index].done = false;
        $scope.tasks = $scope.taskKeeper;
        console.log($scope.tasks);
    }   
}]);





