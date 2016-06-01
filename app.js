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
                //   alert(x.date+" added"+$scope.dateMysql);
                }
                else{
                //     alert(x.date+" not added"+$scope.dateMysql);
                }
            });
        }

        $scope.getIssues = function(){

            $http.get("getTask.php")
            .then(function(response) {
                $scope.AllTasks = response.data;
//                $scope.todoList = response.data;
//                angular.forEach($scope.todoList, function(x) {
//                if (x.done)
                    $scope.TaskNotDone = 'pending <span class="glyphicon glyphicon-question-sign"></span>';
//                else
                    $scope.TaskDone = 'done <span class="glyphicon glyphicon-ok"></span>';
//            });
                $scope.dateChange();
//            if()
//        alert(response.data);
            });
        }
        $scope.getIssues();        
    $scope.todoAdd = function() {
//        $scope.todoList.push({issueName:$scope.todoInput, done:false, date: $scope.dateMysql, time:$scope.time});
//          var myEl = angular.element( document.querySelector( '#bodyId' ) );
//          myEIl.html("wait");
//            document.getElementById("#bodyId").innerHTML = "wait...";

//            alert(time1);
//            alert($scope.dateMysql);
  //          $("#Tasktbl").css("display:none");
            $http.post('CreateUpdateDelete.php', {op:'create',issueName: $scope.todoInput, done:false, date: $scope.dateMysql, time: $scope.time})
                    .success(function(data) {
  //                      alert("create read updated:"+data);
//                        location.reload();
                        $scope.getIssues();
//                        $("#Tasktbl").fadeIn();
                        
                   });
        $scope.todoInput = "";
    };
    $scope.done = function(mIndex1) {
//                $("#btn"+mIndex1).html($scope.TaskDone);
//            $("#Tasktbl").fadeout();
                //ajax code to update database
                $http.post('CreateUpdateDelete.php', {op:'update',mIndex: mIndex1})
                    .success(function(data) {
  //                      alert("create read updated:"+data);
//                        location.reload();
                          $scope.getIssues();
//                          $("#Tasktbl").fadeIn();
                    });
    }
    $scope.remove = function(mIndex1) {
                //ajax code to remove from database
//                angular.forEach($scope.todoList, function(x){
//                            if(mIndex1 == x.mIndex){
//                                $scope.todoList.pop(x);
////                                 alert(x.issueName+" deleted");
//                            }
//                            else{
//  //                               alert(x.issueName+" not deleted");
//                            }
//                        });                
//            $("#Tasktbl").fadeout();
                $http.post('CreateUpdateDelete.php', {op:'delete',mIndex: mIndex1})
                    .success(function(data) {
//                      alert("create read updated:"+data);
//                      location.reload();     
                        $scope.getIssues();
//                         $("#Tasktbl").fadeIn();
                    });
            }
});