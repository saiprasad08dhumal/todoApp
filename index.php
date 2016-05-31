<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-sanitize.js"></script>
<script src="app.js" > </script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="main.css">
<body ng-app="myApp" ng-controller="todoCtrl" id="bodyId">
    <div id="todoContent">
<h2>Appointment booking</h2>

<form ng-submit="todoAdd()">
<br>
<input type="date"  id="datePicker" ng-model="date.value" placeholder="yyyy-MM-dd" ng-change="dateChange()"  required /><br><br>

<div ng-repeat="x in todoList | orderBy: 'time'">
 <!--   <input type="text" id="indexValue" style="//display: none;" ng-model="x.mIndex">
    
    <input type="checkbox" ng-model="x.done"> -->
    <span ng-bind="x.time"></span>    
    <span ng-bind="x.issueName"></span> 

 

    <div type="button" class="btn btn-default btn-sm" id="btn{{x.mIndex}}" ng-click="done(x.mIndex)" ng-bind-html="x.done ==1?TaskDone:TaskNotDone"> 
    </div>
    
    <button type="button" class="btn btn-default btn-sm" ng-click="remove(x.mIndex)">
          <span class="glyphicon glyphicon-remove"></span> delete 
        </button>
    <br><br>
</div>
<br>

    
    <input type="text" ng-model="todoInput" size="25" placeholder="New appointment"style="margin: 10px;">
    <input type="text" id="timeId" pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}" title="12:34:56"  ng-model="time" placeholder="hh:mm:ss" min="00:00:00" max="23:59:59" >
    <input type="submit">

</form>
</div>
</body>
</html>
