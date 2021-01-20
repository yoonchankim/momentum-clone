const COORDS='coords'
function handleGeoSucces(){
    console.log("asd");
}
function handleGeoError(){
    console.log("asd");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}
function loadCoords(){
    const loadCords=localStorage.getItem;
    if(loadCords===null){
        askForCoords();
    }
    else{

    }
}
function init(){

}
init();