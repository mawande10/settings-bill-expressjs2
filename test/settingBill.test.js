const assert = require('assert');
const moment = require('moment')
const SettingsBill = require('../settings-bill')

describe('settings-bills', function(){
    const settingsBill = SettingsBill(moment);

    context('Recording calls', function(){
        it('should be able to record calls', function(){
            settingsBill.recordAction('call');
            settingsBill.recordAction('call')
            assert.equal(2, settingsBill.actionsFor('call').length);
        });
    });
    
    context('Recording smss', function(){
        it('should be able to record sms', function(){
            settingsBill.recordAction('sms');
            assert.deepEqual(1, settingsBill.actionsFor('sms').length);
        });
    });

    context('Setting the costs', function(){
        it('should be able to set call cost settings', function(){
            settingsBill.setCallCost(2.30);
            assert.equal(2.30, settingsBill.getCallCost());
        });
    
        it('should be able to set sms cost settings', function(){
            settingsBill.setSmsCost(1.30);
            assert.equal(1.30, settingsBill.getSmsCost());
        });
    
        it('should be able to set warning level settings', function(){
            settingsBill.setWarningLevel(10.00);
            assert.equal(10.00, settingsBill.getWarningLevel());
        });
    
        it('should be able to set critical level settings', function(){
            settingsBill.setCriticalLevel(20.00);
            assert.equal(20.00, settingsBill.getCriticalLevel());
        });
    });
    
    context('Calculating the totals', function(){
        it('should be able to calculate the right totals from the setted settings', function(){
            
            settingsBill.setCallCost(2.40);
            settingsBill.setSmsCost(1.30);
            settingsBill.setWarningLevel(10.00);
            settingsBill.setCriticalLevel(20.00);

            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('sms');

            assert.strictEqual(2.40, settingsBill.getCallCostTotal());
            assert.strictEqual(1.30, settingsBill.getSmsCostTotal());
            assert.strictEqual(3.70, settingsBill.getOverallTotalSettings());
        });
    });


    context('Calculating totals for multiple actions', function(){
        it('should be able to calculate the right totals for multiple actions', function(){
            const settingsBill = SettingsBill(moment);
            settingsBill.setCallCost(2);
            settingsBill.setSmsCost(1);
            settingsBill.setWarningLevel(10.00);
            settingsBill.setCriticalLevel(20.00);

            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('sms');

            assert.strictEqual(4, settingsBill.getCallCostTotal());
            assert.strictEqual(1, settingsBill.getSmsCostTotal());
            assert.strictEqual(5, settingsBill.getOverallTotalSettings());
        });
    });

    context('With no setted call cost', function(){
        it('should return a total of 0.00 for a call', function(){
            const settingsBill = SettingsBill(moment);
            settingsBill.setCallCost();
            settingsBill.calculateTotalBills('call');
            assert.strictEqual(0.00, settingsBill.getCallCostTotal());
        });
    });

    context('With no setted sms cost', function(){
        it('should return a total of 0.00 for an sms', function(){
            const settingsBill = SettingsBill(moment);
            settingsBill.setSmsCost();
            settingsBill.calculateTotalBills('sms');
            assert.strictEqual(0.00, settingsBill.getSmsCostTotal());
        });
    });

    context('Notice warning level', function(){
        it('the overall total should change color when warning level is reached', function(){
            const settingsBill = SettingsBill(moment);
            settingsBill.setCallCost(3);
            settingsBill.setSmsCost(2);
            settingsBill.setWarningLevel(10.00);
            settingsBill.setCriticalLevel(20.00);

            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('sms');
            settingsBill.calculateTotalBills('sms');

            
            assert.strictEqual(6, settingsBill.getCallCostTotal());
            assert.strictEqual(4, settingsBill.getSmsCostTotal());
            assert.strictEqual(10, settingsBill.getOverallTotalSettings());
           assert.strictEqual('warning', settingsBill.getClassNameLevel(settingsBill.getOverallTotalSettings()))
        });
    });

    context('Notice critical level', function(){
        it('the overall total should change color when critical level is reached and stop add new costs', function(){
            const settingsBill = SettingsBill(moment);
            settingsBill.setCallCost(3);
            settingsBill.setSmsCost(2);
            settingsBill.setWarningLevel(10.00);
            settingsBill.setCriticalLevel(20.00);

            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('call');
            settingsBill.calculateTotalBills('sms');
            settingsBill.calculateTotalBills('sms');
            settingsBill.calculateTotalBills('sms');
            
            assert.strictEqual(15, settingsBill.getCallCostTotal());
            assert.strictEqual(6, settingsBill.getSmsCostTotal());
            assert.strictEqual(21, settingsBill.getOverallTotalSettings());
            assert.strictEqual('danger', settingsBill.getClassNameLevel(settingsBill.getOverallTotalSettings()))
        });
    });
});