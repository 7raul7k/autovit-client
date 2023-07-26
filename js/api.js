

let base="http://localhost:8080/api/v1";





async function  getAllCars(){

let response = await fetch(base+"/all");


let data= await response.json();


return data;


}

