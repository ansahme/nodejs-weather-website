const request = require('request');
forecast = (lat,long,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=a58cbf306c5d6aac62a90efafa10ce04&query='+lat+','+long+'&units=f';
    request({url:url,json:true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect to weather services',undefined);
        }else if(body.error){
           callback("Error: Unalbe to find location",undefined);
        }else{
           // console.log(body.location.localtime);
           // console.log(body.current.weather_icons[0]);
            callback(undefined,{
               description: body.current.weather_descriptions[0],
               current_temperatur:body.current.temperature,
               Feels_like:body.current.feelslike,
               localTime:body.location.localtime,
               weatherIcon: body.current.weather_icons[0]
            })
        }
    });
}
module.exports=forecast;