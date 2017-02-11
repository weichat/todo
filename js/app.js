//1. 在主文件里面创建模块  ['todoApp.todoCtrl','todoApp.todoServ']
// 依赖todoApp.todoCtrl模块 依赖todoApp.todoServ模块
// 3.依赖路由模块
angular.module('todoApp',['todoApp.todoCtrl','todoApp.todoServ']);