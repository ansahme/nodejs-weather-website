const weatherForm = document.querySelector('form')
const address = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');


const getWeather =function(address){
    const url ='/weather?address=';
    fetch(url+address).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            p2.textContent= data.error;
            p1.textContent='';
        }else{
            //console.log(data.summary);
            p1.textContent=data.summary;
            p2.textContent=data.location;
        }
    });
});

}


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = address.value;
   if(location && location.length>0){
       p1.textContent = 'Loading weather information...';
       getWeather(location);
   }else{
       p2.textContent ="Please enter a valid search";
       p1.textContent='';
   }
})