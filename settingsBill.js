module.exports = function CalculateBillsSettings(){
    var callCost = 0.00;
    var smsCost = 0.00;
    var levelWarning = 0.00;
    var levelCritical = 0.00;
    var callCostTotal = 0.00;
    var smsCostTotal = 0.00;
    
    var actionList = [];

    function calculateTotalBills(checkedBill) {
        var overallTotal = getOverallTotalSettings();
       // console.log(overallTotal);
        if (overallTotal < levelCritical){
            if (checkedBill === 'call'){
                callCostTotal += callCost;
            }
            else if(checkedBill === 'sms'){
                smsCostTotal += smsCost;
            }
        }
    }

    function setCallCost(callCostParam){
        var  callCostSettingsAmount = 0;
        
        if (callCostParam !== ''){
            callCostSettingsAmount = parseFloat(callCostParam);
        }
        callCost = callCostSettingsAmount;
    }

    function setSmsCost(smsCostParam) {
        var smsCostSettingsAmount = 0;
        if (smsCostParam !== ''){
            smsCostSettingsAmount = parseFloat(smsCostParam);
        }
       
        smsCost = smsCostSettingsAmount;
    }

    function setWarningLevel(warningLevelCost){
        var warningLevelAmount = 0;
        if (warningLevelCost !== ''){
            warningLevelAmount = parseFloat(warningLevelCost);
        }
        levelWarning = warningLevelAmount;
    }

    function setCriticalLevel(criticalLeveCost) {
        var criticalLevelAmount = 0;
        if (criticalLeveCost !== '') {
            criticalLevelAmount = parseFloat(criticalLeveCost);
        }
        levelCritical = criticalLevelAmount;
    }

    function recordAction(action){
        var cost = 0;
        if (action === 'call'){
            cost = callCost;
        }else if (action === 'sms'){
            cost = smsCost;
        }

        if (action === 'call' || action === 'sms') {
            actionList.push({
                type: action,
                cost,
                timeframe: new Date()
            });
        }
    }

    function action(){
        return actionList;
    }

    function actionsFor(type){
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }

    function getCallCost(){
        return callCost;
    }

    function getSmsCost() {
        return smsCost;
    }

    function getWarningLevel(){
        return levelWarning;
    }

    function getCriticalLevel(){
        return levelCritical;
    }

    function getSettedTotal() {
        return getCallCost() + getSmsCost();
    }
    function getClassNameLevel(totalOverall){
        // console.log(totalOverall);
        // console.log(levelCritical);
        if (totalOverall === 0.00) {
            return 'totalSettings';
        }
        if (totalOverall >= levelCritical){
            return 'danger';
        }else if (totalOverall >= levelWarning){
            return 'warning';
        } 
    }

    function getCallCostTotal() {
        return callCostTotal;
    }

    function getSmsCostTotal() {
        return smsCostTotal;
    }

    function getOverallTotalSettings() {
        return getCallCostTotal() + getSmsCostTotal();
    }

    return {
        calculateTotalBills,
        getCallCostTotal,
        getSmsCostTotal,
        getOverallTotalSettings,
        getClassNameLevel,
        setCallCost,
        setSmsCost,
        setWarningLevel,
        setCriticalLevel,
        getSettedTotal,
        getCallCost,
        getSmsCost,
        getWarningLevel,
        getCriticalLevel,
        recordAction,
        action,
        actionsFor
    }
}