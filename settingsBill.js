"use strict";

//Exporting the Moment modules
const Moment = require('moment');
let moment = Moment();
module.exports = function () {
    let callsTotalBill = 0;
    let smsTotalBill = 0;
    let totalCostbill = 0;

    let warningVariable = 0;
    let criticalVariable = 0;
    let smsCostVariable = 0;
    let callCostVariable = 0;

    let color = '';

    let billArray = [];

    function setCallCost(itemCall) {
        callCostVariable = parseFloat(itemCall);
    }

    function setSmsCost(itemSmS) {
        smsCostVariable = parseFloat(itemSmS);
    }

    function setCriticalWarning(itemCritical) {
        criticalVariable = parseFloat(itemCritical);
    }

    function setWarning(warning) {
        warningVariable = parseFloat(warning);
    }

    function addTotal(billItems) {
        // update the correct total


        if (totalCostbill < criticalVariable) 
        {

            let bill = {
                Type: billItems,
                TimeStamp: new Date()
            }

            if (billItems === "call") {
                callsTotalBill += callCostVariable;
                bill.Cost = callCostVariable.toFixed(2);

            } else if (billItems === "sms") {
                smsTotalBill += smsCostVariable;
                bill.Cost = smsCostVariable.toFixed(2);
            }
            billArray.unshift(bill);
        }

    }


    function colorChangeRadio() {
        if (totalCostbill > criticalVariable) {
            color = 'danger';
            return color;

        } else if (totalCostbill > warningVariable) {
            color = 'warning';
            return color;
        }
    }


    function callTotal() {
        return callsTotalBill.toFixed(2);
    }

    function smsTotal() {
        return smsTotalBill.toFixed(2);
    }

    function getCallCost() {
        return callCostVariable.toFixed(2);
    }

    function getSMSCost() {
        return smsCostVariable.toFixed(2);
    }

    function getCriticalValue() {
        return criticalVariable.toFixed(2);
    }

    function getWarningValue() {
        return warningVariable.toFixed(2);
    }

    function getBillRecords(type) {
        if (type === "" || type === undefined) {
            return billArray;
        } else {

            return billArray.filter(current => current.Type === type);
        }

    }

    function total() {
        totalCostbill = callsTotalBill + smsTotalBill;
        return totalCostbill.toFixed(2);
    }

    // function resetValues (){
    //     resetPriveValues = 
    //     {
    //         callsTotalBill : 0.00,
    //         smsTotalBill : 0.00,
    //         totalCostbill :0.00  
    //     }

    // }


    return {

        calls: setCallCost,
        sms: setSmsCost,
        critical: setCriticalWarning,
        warning: setWarning,


        sumCall: callTotal,
        sumSms: smsTotal,
        getWarning: getWarningValue,
        getCritical: getCriticalValue,


        getCallPrice: getCallCost,
        getSMSPrice: getSMSCost,
        sumTotal: total,
        sumBill: addTotal,
        colors: colorChangeRadio,
        getBill: getBillRecords

        // getResetValues: resetPriveValues

    }
}