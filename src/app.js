const path= require('path');
const express =  require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));

const app = express();
const port = process.env.PORT || 3000;
/** Define paths for Express config **/
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

/**Setup handlbars engine and views location **/
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

/**setup static direcotry to serve.**/
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) =>{
    res.render('index',{
        title: 'Weather Today',
        name: 'Kwasi Ansah'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Ansah Kwasi'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        help_msg: 'If you need assistance please call help desk.',
        name:'Richmond Newton'
    });
});

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,{description,current_temperatur,Feels_like,localTime,
            weatherIcon})=>{
           if(error){
            return res.send({error});
           }
          return res.send({
              summary: 'Today is '+description+' currently it is '+current_temperatur + ' degrees but feels like '+Feels_like + " degrees",
              description: description,
              temperature:current_temperatur,
              feesLike:Feels_like,
              location,
              address:req.query.address,
              localTime,weatherIcon

          });
       });
    });
});


app.get('/products',(req,res)=>{
    if(!req.query.key){
        return res.send({error: 'You must provide a search term'});
    }
    console.log(req.query.key, req.query.type);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('_404',{
        _404msg:"Help article not found!",
        title: "Help Page Not Found!",
        name:"Richmond Newton"
    });
})

app.get('*',(req,res)=>{
    res.render('_404',{
        _404msg:"Page not found!",
        title:"Page Not Found",
        name:"Kwasi Ansah"
    });
});

app.listen(port, ()=>{
    console.log('Server is up on port port');
})

