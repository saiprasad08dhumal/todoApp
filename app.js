var app = angular.module('myApp', ['ngSanitize']);
app.controller('todoCtrl', function($scope, $http) {
    var dt =  new Date();
    $scope.time =dt.getHours() + ":"+dt.getMinutes()+":"+dt.getSeconds();
    $scope.date = {
         value: new Date()
       };
       $scope.formatMysqlDate =  function(date1) {
            return date1.getFullYear() + '-' +
            (date1.getMonth() < 9 ? '0' : '') + (date1.getMonth()+1) + '-' +
            (date1.getDate() < 10 ? '0' : '') + date1.getDate();
        }
    
        $scope.dateChange = function(){
            $scope.todoList = [];
            $scope.dateMysql = $scope.formatMysqlDate($scope.date.value);

            angular.forEach($scope.AllTasks, function(x){
                if($scope.dateMysql == x.date){
                    $scope.todoList.push(x)
                
                }
                else{
                
                }
            });
        }

        $scope.getIssues = function(){

            $http.get("getTask.php")
            .then(function(response) {
                $scope.AllTasks = response.data;
                    $scope.TaskNotDone = 'pending <span class="glyphicon glyphicon-question-sign"></span>';

                    $scope.TaskDone = 'done <span class="glyphicon glyphicon-ok"></span>';

                $scope.dateChange();
            });
        }
        $scope.getIssues();        
    $scope.todoAdd = function() {
            $http.post('CreateUpdateDelete.php', {op:'create',issueName: $scope.todoInput, done:false, date: $scope.dateMysql, time: $scope.time})
                    .success(function(data) {
                        $scope.getIssues();

                   });
        $scope.todoInput = "";
    };
    $scope.done = function(mIndex1) {
                $http.post('CreateUpdateDelete.php', {op:'update',mIndex: mIndex1})
                    .success(function(data) {
                          $scope.getIssues();
                    });
    }
    $scope.remove = function(mIndex1) {

                $http.post('CreateUpdateDelete.php', {op:'delete',mIndex: mIndex1})
                    .success(function(data) {

                        $scope.getIssues();

                    });
            }
});
