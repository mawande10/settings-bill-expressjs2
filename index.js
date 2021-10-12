let express = require('express');
let exphbs  = require('express-handlebars');
let bodyParser = require('body-parser');
let moment = require('moment');
let CalculateBillsSettings = require('./settings-bill');
let app = express();
moment().format();

const settingsBill = CalculateBillsSettings(moment);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index', { settings: {
        callCost: settingsBill.getCallCost(),
        smsCost: settingsBill.getSmsCost(),
        warningLevel: settingsBill.getWarningLevel(),
        criticalLevel: settingsBill.getCriticalLevel()
    },
    totals: {
        callCostTotal: settingsBill.getCallCostTotal().toFixed(2),
        smsCostTotal: settingsBill.getSmsCostTotal().toFixed(2),
        grandTotal: settingsBill.getOverallTotalSettings().toFixed(2),
        level: settingsBill.getClassNameLevel(settingsBill.getOverallTotalSettings())
    }
   
});
//console.log(settingsBill.getClassNameLevel(settingsBill.getOverallTotalSettings()));
});

app.post('/settings', function(req, res){
    
    settingsBill.setCallCost(req.body.callCost);
    settingsBill.setSmsCost(req.body.smsCost);
    settingsBill.setWarningLevel(req.body.warningLevel);
    settingsBill.setCriticalLevel(req.body.criticalLevel);
    //console.log(settingsBill.getCallCost());
   
    res.redirect('/');
});

app.post('/action', function(req, res){
    settingsBill.calculateTotalBills(req.body.actionType);
   

    //console.log(req.body.actionType);
    settingsBill.recordAction(req.body.actionType);
    res.redirect('/');
});

app.get('/actions', function(req, res){
    let actions = settingsBill.action();

    actions.forEach(item => {
        item.timeframes = moment(item.timeframe).fromNow();
    })
    res.render('actions', { actions: settingsBill.action()});
});

app.get('/actions/:actionType', function(req, res){
    const actionType = req.params.actionType;

    let actions = settingsBill.action();

    actions.forEach(item => {
        item.timeframes = moment(item.timeframe).fromNow();
    })
    res.render('actions', {actions: settingsBill.actionsFor(actionType)});
});

let PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
    console.log('App started on port: ', PORT);
});