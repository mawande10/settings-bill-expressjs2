"use strict";

//import the settingsBill module that is in the current folder
const SettingsBill = require('./settingsBill');

const settingsBill = SettingsBill();

let express = require('express');
let app = express();


//Exporting the Moment modules
const Moment = require('moment');
let moment = Moment();

//Handlebars Section ...
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs(
{   defaultLayout: 'main',
    helpers:
    {
        "updatedDate":function()
        {
             return Moment(this.TimeStamp).fromNow()
        }
    }
}));

//To view handlebars engine ...
app.set('view engine', 'handlebars');

//Static Resource
app.use(express.static('public'));


//Body parser ...
let bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//--------------------------Routes -------------------------------------------//

app.get("/", function(req, res){
  
    let prices = {
        callPrice: settingsBill.sumCall(),
        smsPrice: settingsBill.sumSms(),
        totalPrice: settingsBill.sumTotal()
        
    }

    let keepValue = {
        call:settingsBill.getCallPrice(),
        sms: settingsBill.getSMSPrice(),
        critical: settingsBill.getCritical(),
        warning: settingsBill.getWarning()

    }
    res.render("home", {prices, keepValue});
  });
  
//set the settings - sms & call price and the warning & critical level
app.post('/settings', function(req,res){
    let smsCost = req.body.smsCost;
    let callCost = req.body.callCost;
    let warningLevel = req.body.warningLevel;
    let criticalLevel = req.body.criticalLevel;

    //console.log(callCost);
    let prices = {
        callPrice: settingsBill.sumCall(),
        smsPrice: settingsBill.sumSms(),
        totalPrice: settingsBill.sumTotal()
    }

    settingsBill.calls(callCost);
    settingsBill.sms(smsCost);
    settingsBill.critical(criticalLevel);
    settingsBill.warning(warningLevel);

    //console.log("Call Price: ", settingsBill.getCallPrice());
    let keepValue = {
        call:callCost,
        sms: smsCost,
        critical: criticalLevel,
        warning: warningLevel

    }

    let settings = {
      smsCost,
      callCost,
      warningLevel,
      criticalLevel
    };

    console.log("Call Cost:", callCost);
    console.log("SMS Cost:", smsCost);
    console.log("Critical Cost:", criticalLevel);
    console.log("Warning Cost:", warningLevel);
    // note that data can be sent to the template
    res.render('home', {settings,keepValue,prices})

});

/**record an action of sms or call and the appropriate price based on the settings entered 
& a timestamp when record has been entered.
1. Need to add the timestamp in the object as well.
**/
app.post('/action', function(req, res)
{
    let item = req.body.billItemTypeWithSettings;
  
    //console.log(item)
    settingsBill.sumBill(item);
    
    let keepValue = {
        call:settingsBill.getCallPrice(),
        sms: settingsBill.getSMSPrice(),
        critical: settingsBill.getCritical(),
        warning: settingsBill.getWarning()

    }
    let prices = {
      callPrice: settingsBill.sumCall(),
      smsPrice: settingsBill.sumSms(),
      totalPrice: settingsBill.sumTotal(),
      color:settingsBill.colors(),
  }
//   console.log('Total: ',prices.callPrice);
//   console.log('Color Pick: ',settingsBill.colors());
    res.render('home', { prices, keepValue });

});


//show all the actions - display the timestamps using fromNow and display a total cost for all the actions on the screen
app.get('/actions', function(req, res)
{
    let billRecList =  settingsBill.getBill();

    // console.log("Bill array", billRecList);
    res.render('records', {billArray:billRecList});
});

//display all the sms or call actions - display the timestamps using fromNow and display a total cost for the selected action.

app.get('/actions/:type', function (req, res) {
    let costType = req.params.type;

    let billRecList = settingsBill.getBill(costType); 
    //console.log('am here',billRecList);

    res.render('records', {billArray:billRecList});
    
});

//--------------------------------------------------------------------------------------------------------------------------//
let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});