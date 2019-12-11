"use strict";

var app = angular.module('emi-form', []);

app.controller('emi-form-controller', function($scope) {
  $scope.interest_rate = 13;
  $scope.duration = 6;
});


// function toggleInterest () {
//   var flag = document.getElementById("no_cost_flag_input").checked;
//   console.log(flag);
//   console.log(document.getElementById("interest_rate_input").disabled);
//   document.getElementById("interest_rate_input").disabled = flag;
//   console.log(document.getElementById("interest_rate_input").disabled);
//   console.log(document.getElementById("interest_rate_input").value)
// }

var firstTime = true;

function changeDisplay () {
  var p_tags = document.querySelectorAll('p');
  var p_tag;
  for (p_tag of p_tags) {
    p_tag.style.display = "";
  }
  firstTime = false;
}

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

function calculateEMI () {
  var item_cost = document.getElementById("cost_input").value;
  var interest_rate = document.getElementById("interest_rate_input").value;
  var no_cost_flag = document.getElementById("no_cost_flag_input").checked;
  var duration = document.getElementById("duration_input").value;
  if (firstTime) {
    changeDisplay();
  }
  interest_rate = interest_rate/1200;
  var emi_amount = calculateEmiAmount(item_cost, interest_rate, duration, no_cost_flag);
  var principal_amount = calculatePrincipalAmount(item_cost, interest_rate, duration, no_cost_flag, emi_amount);
  var interest_amount = emi_amount*duration - principal_amount;
  var gst_amount = interest_amount * 0.18;
  var total_amount = emi_amount*duration + gst_amount;
  document.getElementById("emi-amount_span").innerHTML = emi_amount.toFixed(2);
  document.getElementById("principal-amount_span").innerHTML = principal_amount.toFixed(2);
  document.getElementById("interest-amount_span").innerHTML = interest_amount.toFixed(2);
  document.getElementById("gst-amount_span").innerHTML = gst_amount.toFixed(2);
  document.getElementById("total-amount_span").innerHTML = total_amount.toFixed(2);
}