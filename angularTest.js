"use strict";

function calculateEmiAmount (item_cost, interest_rate, duration, no_cost_flag) {
  if (no_cost_flag) {
    return item_cost/duration;
  }
  return (item_cost*interest_rate*(1+interest_rate)**duration)/((1+interest_rate)**duration-1);
}

function calculatePrincipalAmount (item_cost, interest_rate, duration, no_cost_flag, emi_amount) {
  if (no_cost_flag) {
    return (emi_amount*((1+interest_rate)**duration-1))/(interest_rate*(1+interest_rate)**duration);
  }
  return item_cost*1;
}


var app = angular.module('emi-form', []);

app.controller('emi-form-controller', function($scope) {
  $scope.interest_rate = 13;
  $scope.duration = 6;
  $scope.result_show = false;

  $scope.displayEMI = function (form_valid_flag) {
    $scope.result_show = false;
    if (!form_valid_flag) {
      return
    }
    let interest_rate = ($scope.interest_rate)/1200;
    $scope.emi_amount = parseFloat(calculateEmiAmount($scope.item_cost, interest_rate, $scope.duration, $scope.no_cost_flag).toFixed(2));
    $scope.principal_amount = parseFloat(calculatePrincipalAmount($scope.item_cost, interest_rate, $scope.duration, $scope.no_cost_flag, $scope.emi_amount).toFixed(2));
    $scope.interest_amount = parseFloat(($scope.emi_amount*$scope.duration - $scope.principal_amount).toFixed(2));
    $scope.gst_amount = parseFloat(($scope.interest_amount * 0.18).toFixed(2));
    $scope.total_amount = parseFloat(($scope.emi_amount*$scope.duration + $scope.gst_amount).toFixed(2));
    console.log($scope)
    $scope.result_show = true;
  }
});
