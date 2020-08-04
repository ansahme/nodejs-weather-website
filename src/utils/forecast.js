const request = require('request');
forecast = (lat,long,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=a58cbf306c5d6aac62a90efafa10ce04&query='+lat+','+long+'&units=f';
    request({url:url,json:true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect to weather services',undefined);
        }else if(body.error){
           callback("Error: Unalbe to find location",undefined);
        }else{
            callback(undefined,{
               description: body.current.weather_descriptions[0],
               current_temperatur:body.current.temperature,
               Feels_like:body.current.feelslike
            })
        }
    });
}
module.exports=forecast;