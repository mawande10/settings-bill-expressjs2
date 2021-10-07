let assert = require('assert');

let settingBill = require('../settingsBill.js');

describe('Testing SettingsBill', function(){

   

    it('Should return warning ', function(){
        let SettingBill = settingBill();
        SettingBill.calls(2.75);
        SettingBill.sms(0.75);
        SettingBill.critical(8.00);
        SettingBill.warning(5.75);
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        SettingBill.sumBill('sms');
        SettingBill.colors(SettingBill.sumTotal());

        assert.equal(SettingBill.colors(), 'warning');
    } )
    it('Should return danger ', function(){
        let SettingBill = settingBill();
        SettingBill.calls(2.75);
        SettingBill.sms(0.75);
        SettingBill.critical(7.00);
        SettingBill.warning(5.75);
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        SettingBill.sumBill('sms');
        SettingBill.colors(SettingBill.sumTotal());

        assert.equal(SettingBill.colors(), 'danger');
    } )

    it('Should return the critical level 1', function(){
        let SettingBill = settingBill();
        SettingBill.calls(2.00);
        SettingBill.sms(1.00);
        SettingBill.critical(7.00);
        SettingBill.warning(5.75);
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        
        SettingBill.sumBill('sms');
        SettingBill.sumBill('call');
 

        assert.equal(SettingBill.sumTotal(), '9.00');
    } )


    it('Should return the critical level 2', function(){
        let SettingBill = settingBill();
        SettingBill.calls(2.00);
        SettingBill.sms(1.00);
        SettingBill.critical(7.00);
        SettingBill.warning(5.75);
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        
        SettingBill.sumBill('sms');
        SettingBill.sumBill('call');
        SettingBill.sumBill('sms');
        SettingBill.sumBill('call');

        assert.equal(SettingBill.sumTotal(), '12.00');
    } )


    it('Should return the critical level 3', function(){
        let SettingBill = settingBill();
        SettingBill.calls(2.00);
        SettingBill.sms(1.00);
        SettingBill.critical(12.00);
        SettingBill.warning(5.75);
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        SettingBill.sumBill('call');
        
        SettingBill.sumBill('sms');
        SettingBill.sumBill('call');
        SettingBill.sumBill('sms');
        SettingBill.sumBill('call');

        assert.equal(SettingBill.sumTotal(), '12.00');
    } )


})