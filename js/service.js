//创建一个todlist的服务模块
angular.module('todoApp.todoServ', [])
    .service('$todoServ', function() {
        var todoList = JSON.parse(window.localStorage.getItem('todolist')) || [];   
        //1. 定义获取数据的方法
        this.getData = function() {
            //	服务里面的没有$scope只能用变量接收
            return todoList;
        };
        //2. 定义添加数据的方法
        this.addData = function(addName) {
            todoList.push({
                id: Math.random(),
                isCompleted: false,
                name: addName,
                isUpdate: false
            });
            //自己调用自己写的存储方法
        };
        //4. 定义删除数据的方法
        this.removeData = function(index) {
            todoList.splice(index, 1);
        };
        //5. 定义全选方法
        this.selectAll = function(isSelectAll) {
            for (var i = 0; i < todoList.length; i++) {
                todoList[i].isCompleted = isSelectAll;
            }
        };
        //6. 清空所有已完成任务
        this.clearCompleted = function() {
            for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].isCompleted == true) {
                    todoList.splice(i, 1);
                    i--;
                }
            }
        };
        //3.定义一个存储数据的方法
        this.setData = function() {
            // console.log(todoList);
            window.localStorage.setItem('todolist', JSON.stringify(todoList));
        }
    });
