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

function create_table_data (principal_amount, interest_rate, emi_amount, duration) {
  let iter = 0; 
  let table_data = [];
  let total_principal_amount = 0, total_interest_amount = 0, total_gst_amount = 0, total_amount = 0;
  while (iter<duration) {
    let interest_amount_month = principal_amount * interest_rate;
    let gst_amount_month = interest_amount_month * 0.18;
    let principal_amount_month = emi_amount - interest_amount_month;
    principal_amount = principal_amount - principal_amount_month;
    let total_amount_month = principal_amount_month + interest_amount_month + gst_amount_month;
    let table_row = {
      'month': ++iter,
      'principal_amount_month': parseFloat(principal_amount_month.toFixed(2)),
      'interest_amount_month': parseFloat(interest_amount_month.toFixed(2)),
      'gst_amount_month': parseFloat(gst_amount_month.toFixed(2)),
      'total_amount_month': parseFloat(total_amount_month.toFixed(2))
    };
    total_principal_amount += principal_amount_month;
    total_interest_amount += interest_amount_month;
    total_gst_amount += gst_amount_month;
    total_amount += total_amount_month;
    table_data.push(table_row);
  }
  let table_total_row = {
    'month': 'Total',
    'principal_amount_month': parseFloat(total_principal_amount.toFixed(2)),
    'interest_amount_month': parseFloat(total_interest_amount.toFixed(2)),
    'gst_amount_month': parseFloat(total_gst_amount.toFixed(2)),
    'total_amount_month': parseFloat(total_amount.toFixed(2))
  };
  table_data.push(table_total_row);
  return table_data;
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

    let emi_amount = calculateEmiAmount($scope.item_cost, interest_rate, $scope.duration, $scope.no_cost_flag);
    let principal_amount = calculatePrincipalAmount($scope.item_cost, interest_rate, $scope.duration, $scope.no_cost_flag, emi_amount);
    let interest_amount = emi_amount*$scope.duration - principal_amount;
    let gst_amount = interest_amount * 0.18;
    let total_amount = emi_amount*$scope.duration + gst_amount;

    $scope.emi_amount = parseFloat(emi_amount.toFixed(2));
    $scope.principal_amount = parseFloat(principal_amount.toFixed(2));
    $scope.interest_amount = parseFloat(interest_amount.toFixed(2));
    $scope.gst_amount = parseFloat(gst_amount.toFixed(2));
    $scope.total_amount = parseFloat(total_amount.toFixed(2));
    $scope.table_data = create_table_data(principal_amount, interest_rate, emi_amount, $scope.duration);
    $scope.result_show = true;
  }
});
