const weatherForm = document.querySelector('form')
const address = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const wIcon = document.querySelector('#wIcon');
const lTime = document.querySelector('#lTime');


const getWeather =function(address){
    const url ='/weather?address=';
    fetch(url+address).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            p2.textContent= data.error;
            p1.textContent='';
        }else{
            console.log(data.weatherIcon);
            p1.textContent=data.summary;
            p2.textContent=data.location;
            lTime.textContent ='Local time:'+data.localTime;
           wIcon.innerHTML="<img alt='weather icon' src='"+data.weatherIcon+"'></img>";
        }
    });
});
}


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = address.value;
   if(location && location.length>0){
       p2.textContent='';
       wIcon.src='';
       lTime.textContent='';
       p1.textContent = 'Loading weather information...';
       getWeather(location);
   }else{
       p2.textContent ="Please enter a valid search";
       p1.textContent='';
   }
})