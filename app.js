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
    $http.get("getTask.php")
    .then(function(response) {
        $scope.AllTasks = response.data;
//                $scope.todoList = response.data;
//            angular.forEach($scope.todoList, function(x) {
//                if (x.done)
                    $scope.TaskNotDone = 'pending <span class="glyphicon glyphicon-question-sign"></span>';
//                else
                    $scope.TaskDone = 'done <span class="glyphicon glyphicon-ok"></span>';
//            });
            $scope.dateChange();
//            if()
//    alert(response.data);
         });
         
    $scope.todoAdd = function() {
//        $scope.todoList.push({issueName:$scope.todoInput, done:false, date: 0, time:0});
//          var myEl = angular.element( document.querySelector( '#bodyId' ) );
//          myEIl.html("wait");
//            document.getElementById("#bodyId").innerHTML = "wait...";
            var time1 = $scope.time;
//            alert(time1);
//            alert($scope.dateMysql);

            $http.post('CreateUpdateDelete.php', {op:'create',issueName: $scope.todoInput, done:false, date: $scope.dateMysql, time: time1})
                    .success(function(data) {
  //                      alert("create read updated:"+data);
                        location.reload();
                   });
        $scope.todoInput = "";
    };
    $scope.done = function(mIndex1) {
              //ajax code to update database
                
                $http.post('CreateUpdateDelete.php', {op:'update',mIndex: mIndex1})
                    .success(function(data) {
//                        alert("create read updated:"+data);

                        location.reload();
                    });
    }
    $scope.remove = function(mIndex1) {
                //ajax code to remove from database
                $http.post('CreateUpdateDelete.php', {op:'delete',mIndex: mIndex1})
                    .success(function(data) {
//                        alert("create read updated:"+data);
                        location.reload();
                    });
            }

});