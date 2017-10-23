'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:PersonalearningarchivesCtrl
 * @description
 * # PersonalearningarchivesCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('PersonalearningarchivesCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
        $scope.startDate = '';
        $scope.endDate = '';
        //请求个人学习档案信息
        $scope.table_show_one = false;
        $scope.table_show_two = false;
        $scope.table_show_three = false;
        $scope.Show_table = function(id) {
            if (id == "one") {
                $scope.table_show_one = !$scope.table_show_one;
            } else if (id == "two") {
                $scope.table_show_two = !$scope.table_show_two;
            } else {
                $scope.table_show_three = !$scope.table_show_three;
            }
        };

        $scope.paginationConf = [{ //学习课程获得学时
                currentPage: 1,
                totalItems: 10,
                itemsPerPage: 5, //每页显示的条数one
                pagesLength: 6,
                perPageOptions: [10, 20, 30, 40, 50]
            },
            { //参加测试获得学时
                currentPage: 1,
                totalItems: 10,
                itemsPerPage: 5, //每页显示的条数
                pagesLength: 6,
                perPageOptions: [10, 20, 30, 40, 50]
            },
            { //培训获得学时
                currentPage: 1,
                totalItems: 10,
                itemsPerPage: 5, //每页显示的条数
                pagesLength: 6,
                perPageOptions: [10, 20, 30, 40, 50]
            }
        ];
        $scope.n = 0;
        $scope.refresh = function(options) {
            $loading.start('personalArchive');
            var newParams = $.extend({}, ALL_PORT.StudyStatistics.data, options);
            commonService.getData(ALL_PORT.StudyStatistics.url, "post",
                    newParams)
                .then(function(response) {
                    $loading.finish('personalArchive');
                    $scope.Data = response.Data;
                    $scope.paginationConf[0].totalItems = response.Data.ViewBag.StudyCount;
                    $scope.paginationConf[1].totalItems = response.Data.ViewBag.ExamFinishCount;
                    $scope.paginationConf[2].totalItems = response.Data.ViewBag.TrainingCount;
                    if ($scope.n == 0) {
                        $scope.startDate = response.Data.ViewBag.StartDate;
                        $scope.endDate = response.Data.ViewBag.EndDate;
                        $scope.n = 1;
                    } else {}
                });
        };

        $scope.$watch('paginationConf[0].currentPage', function() {
            // 发送给后台的请求学习课程获得学时
            var pageOptions = {
                page: $scope.paginationConf[0].currentPage,
                startDate: $scope.startDate,
                endDate: $scope.endDate
            };
            $scope.refresh(pageOptions);
        });
        $scope.$watch('paginationConf[1].currentPage', function() {
            // 发送给后台的请求参加测试获得学时
            var pageOptions = {
                page: $scope.paginationConf[1].currentPage,
                startDate: $scope.startDate,
                endDate: $scope.endDate
            };
            $scope.refresh(pageOptions);
        });
        $scope.$watch('paginationConf[2].currentPage', function() {
            // 发送给后台的请求培训获得学时
            var pageOptions = {
                page: $scope.paginationConf[2].currentPage,
                startDate: $scope.startDate,
                endDate: $scope.endDate
            };
            $scope.refresh(pageOptions);
        });
    });
