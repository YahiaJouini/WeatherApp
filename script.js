const city=document.querySelector('.text-input');
const cityDisplay=document.querySelector('.location');
const temp=document.querySelector('h1');
const icon=document.querySelector('img');
const weatherStatus=document.querySelector('.status');
const search=document.querySelector('button');
const container=document.querySelector('.container');


const icons =
    {
    cloudy :'cloudy.png',
    sunny : "sun.png",
    rainy: 'rain.png'
    };


const key='aa6a2250b1d83fd114cfa3f99ee54a6b';


function gettingData(e){
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=${key}`;
    fetch(api).then(res=>res.json()).then(data=>{
        if(data.cod=='200'){
            let country=city.value+", "+data.sys.country;
            let weather=data.weather[0].description;
            if(weather.indexOf('cloud')!=-1){
                picUrl=icons.cloudy;
                container.style.background="linear-gradient(90deg,white 30%,rgb(0, 98, 131) 300% )";
            }else if(weather.indexOf('clear')!=-1){
                picUrl=icons.sunny;
                container.style.background="linear-gradient(90deg,white 30%,orange 300% )"
            }else{
                picUrl=icons.rainy;
                container.style.background="linear-gradient(90deg,white 30%,rgb(71, 71, 71) 300% )";
            }
            cityDisplay.textContent=country;
            temp.textContent=(data.main.temp-273.15).toFixed(0)+"°C";
            weatherStatus.textContent=weather;
            icon.src=`images/${picUrl}`;
        }else{
            NotFound();
        }
    })
}


search.addEventListener('click',gettingData);


function NotFound(){
    container.style.display='none'
    let h1=document.createElement('h1');
    h1.appendChild(document.createTextNode("The county you're looking for is not found"));
    h1.style.textAlign="center";
    let btn=document.createElement('button');
    btn.appendChild(document.createTextNode('Go Back'));
    btn.style.marginTop='35px';
    document.body.appendChild(h1);
    document.body.appendChild(btn);
    btn.addEventListener('click',()=>{
        container.style.display="flex";
        document.body.removeChild(h1);
        document.body.removeChild(btn);
    })
}