//创建模块  创建控制器
// 4.配置一个路由  依赖路由模块 在哪里使用路由就在哪里依赖
angular.module('todoApp.todoCtrl', ['todoApp.todoServ', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        //5.设置匹配路由的规则
        // $routeProvider.when('/', {
        //     templateUrl: 'todoViewAll.html',
        //     controller: 'todoCtrl'
        // }).when('/active', {
        //     templateUrl: 'todoViewActive.html',
        //     controller: 'todoCtrl'
        // }).when('/completed', {
        //     templateUrl: 'todoViewCompleted.html',
        //     controller: 'todoCtrl'
        // }).otherwise({
        //     redirectTo: '/'
        // });
        // when('/:参数名?/:第二个参数') 可提供可选参数 参数后面加个?
        $routeProvider.when('/:status', {
            templateUrl: 'todoView.html',
            controller: 'todoCtrl'
        }).when('/', {
            templateUrl: 'todoView.html',
            controller: 'todoCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }])
    .controller('todoCtrl', ['$scope', '$location', '$todoServ', '$routeParams', function($scope, $location, $todoServ, $routeParams) {
        console.log($routeParams.status);
        // 1.第一个 列表显示功能 列表的数据
        //列表的数据 todoList
        $scope.todoList = $todoServ.getData();
        $scope.addName = '';
        //2.实现添加
        $scope.add = function() {
            if ($scope.addName == "") {
                return;
            }
            $todoServ.addData($scope.addName);
            $scope.addName = '';
        };
        //3.实现 删除功能
        $scope.remove = function(removeId) {
            $todoServ.removeData(this.$index);
        };
        $scope.isSelectAll = false;
        //4.实现全选 和取消全选
        $scope.selectAll = function() {
            $todoServ.selectAll($scope.isSelectAll);
        };
        //5.实现记录已完成数量
        $scope.count = 0;
        $scope.$watch('todoList', function(newValue, oldValue) {
            $scope.count = 0;
            for (var i = 0; i < $scope.todoList.length; i++) {
                if ($scope.todoList[i].isCompleted == true) {
                    $scope.count++;
                }
            }
        }, true);
        //6.清空所有已完成方法
        $scope.clear = function() {
            $todoServ.clearCompleted();
        };
        //7.弹出编辑输入框
        $scope.isUpdate = false;
        $scope.update = function() {
            for (var i = 0; i < $scope.todoList.length; i++) {
                $scope.todoList[i].isUpdate = false;
            }
            this.value.isUpdate = true;

        };
        //8.实现编辑完成后保存修改
        $scope.save = function() {
            this.value.isUpdate = false;
            // 这里是输入输入完毕后就会执行的函数 说明已经改完了 当数据模型里面的todoList变化了之后 更新一下存储中的todList
            $todoServ.setData();
        };
        $scope.status = {
            isCompleted: ''
        };
        //9.锚点跳转变化列表
        // $scope.location = $location;
        // $scope.$watch('location.url()', function(newValue, oldValue) {

        // });
        $scope.isSelected = 'all';
        switch ($routeParams.status) {
            case undefined:
                $scope.status = {
                    isCompleted: ''
                };
                // console.log($scope.status);
                $scope.isSelected = 'all';
                break;
            case 'active':
                $scope.status = {
                    isCompleted: false
                };
                $scope.isSelected = 'active';
                // console.log($scope.status);
                break;
            case 'completed':
                $scope.status = {
                    isCompleted: true
                };
                $scope.isSelected = 'completed';
                // console.log($scope.status);
                break;
        }
        //10.实现存储功能

        $scope.$watch('todoList', function(newValue, oldValue) {
            // window.localStorage.setItem('todolist', JSON.stringify($scope.todoList));
            //当数据模型里面的值发生变化就通知存储 立马存储数据
            $todoServ.setData();
        }, true);
    }]);
