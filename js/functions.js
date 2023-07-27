function homePage(){
    let container = document.querySelector(".container");

    container.innerHTML = `
    <h1>Cars</h1>
	<p><a class="button btn-new" >Create New Car</a></p>
	
    <table>
		<thead>
			<tr>
				<th>Owner</th>
				<th>Brand</th>
				<th>Year</th>
				<th>Color</th>
				<th>Make</th>
			</tr>
		</thead>
		<tbody class="container-cars">
        </tbody>
        </table>
    `

	attachRows();

let addButton = document.querySelector(".btn-new");

addButton.addEventListener("click",()=>{

	attachAddPage();
})

let carsContainer = document.querySelector(".container-cars");

carsContainer.addEventListener("click",(e)=>{

	let target = e.target;

	if(target.classList.contains("owner")){
		let parent = target.parentNode;

		let car = {
			id:parent.id,
			owner:parent.querySelector(".owner").textContent,
			brand:parent.querySelector(".brand").textContent,
			year:parent.querySelector(".year").textContent,
			make:parent.querySelector(".make").textContent,
			color:parent.querySelector(".color").textContent
		}
		attachUpdatePage(car);
	}
})
}



function createRow(car){

	return `
	<tr>
		<td class="owner">${car.owner}</td>
		<td class="brand">${car.brand}</td>
		<td class="year">${car.year}</td>
		<td class="color">${car.color}</td>
		<td class="make">${car.make}</td>
	</tr>`;
}

async function attachRows(){
	

	let carContainer = document.querySelector(".container-cars")

	let text = "";

	let data = await getAllCars();

	data.forEach(element => {
		text += createRow(element);
	});

	carContainer.innerHTML = text;

}

function attachAddPage(){

	let container = document.querySelector(".container");

	container.innerHTML = `
	<h1>New Car</h1>
    <form>
        <p>
            <label for="owner">Owner</label>
            <input name="owner" type="text" id="owner">
			<div class="owner-error"></div>
        </p>
        <p>
            <label for="brand">Brand</label>
            <input name="brand" type="text" id="brand">
			<div class="brand-error"></div>
        </p>
        <p>
            <label for="make">Make</label>
            <input name="make" type="text" id="make">
			<div class="make-error"></div>
        </p>
        <p>
            <label for="color">Color</label>
            <input name="color" type="text" id="color">
			<div class="color-error"></div>
        </p>
		<p>
            <label for="year">Year</label>
            <input name="year" type="text" id="year">
			<div class="year-error"></div>
        </p>
        <p>
            <input type="submit" class="btn-create" value="Create New Car">
        </p>
        <p>
            <a class="button btn-cancel">Cancel</a>
        </p>
    </form>`

	let cancel = document.querySelector(".btn-cancel");

	cancel.addEventListener("click",()=>{
		homePage();
	})

	let createButton = document.querySelector(".btn-create");

	let autovitService = new CarService();
	inptOwner = document.querySelector("#owner");
	inptBrand = document.querySelector("#brand");
	inptMake = document.querySelector("#make");
	inptColor = document.querySelector("#color");
	inptYear = document.querySelector("#year");

	
	createButton.addEventListener("click",(e)=>{
		e.preventDefault()
		let newCar = {owner:inptOwner.value,brand:inptBrand.value,color:inptColor.value,year:inptYear.value,make:inptMake.value}

		if(inptOwner.value !== "" && inptBrand.value !== "" && inptMake.value !== "" 
		&& inptColor.value !== "" && inptYear.value !== ""){

			autovitService.addCar(car);
		}else{
			let errors= [];
			for(const property in newCar){
				if(newCar[property] === ""){

					errors.push(`${property}`)
				}else{
					removeError(`${property}`)
				}
			}

			attachErrors(errors);

		}

	})
}

function attachErrors(errors) {
  

	let text = "";


	errors.forEach(err=>{
	 text = "";
	 let error = document.querySelector(`.${err}-error`);
	if(err){
	 text += `
		 <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
		 <div class="d-flex">
		   <div class="toast-body">
			 ${err}:missing
		   </div>
		   <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
		 </div>
	   </div>
		   
	   `;

	   
	 
	}

	error.innerHTML = text;

   })
}

function removeError(error){

  

    let err = document.querySelector(`.${error}-error`);

    err.textContent = "";
}


function attachUpdatePage(car){

	let container = document.querySelector(".container")

	container.innerHTML=` <h1>Update Car</h1>
    <form>
        <p>
            <label for="owner">Owner</label>
            <input name="owner" type="text" id="owner" value="${car.owner}">
        </p>
        <p>
            <label for="brand">Brand</label>
            <input name="brand" type="text" id="brand" value="${car.brand}">
        </p>
        <p>
            <label for="make">Make</label>
            <input name="make" type="text" id="make" value="${car.make}">
        </p>
        <p>
            <label for="color">Color</label>
            <input name="color" type="text" id="color" value="${car.color}">
        </p>
		<p>
		<label for="year">Year</label>
		<input name="year" type="text" id="year" value="${car.year}">
	</p>
        <p>
            <input type="submit" class="btn-update" value="Update Car">
        </p>
    </form>
    <form method="post" onsubmit="return confirm('Do you really want to delete this car?');">
        <p>
            <a class="button btn-cancel">Cancel</a>
        </p>
        <p><input type="submit" class="btn-delete"value="Delete Car"></p>
    </form>`

	let cancel = document.querySelector(".btn-cancel");

	cancel.addEventListener("click",()=>{

		homePage();
	})

	let carsService = new CarService();

	let updateButton = document.querySelector(".btn-update");

	updateButton.addEventListener("click",(e)=>{

		e.preventDefault() 
		let inptOwner = document.querySelector("#owner");
		let inptBrand = document.querySelector("#brand");
		let inptColor = document.querySelector("#color");
		let inptYear = document.querySelector("#year");
		let inptMake = document.querySelector("#make");

		let newCar = {owner:inptOwner.value,brand:inptBrand.value,color:inptColor.value,year:inptYear.value,make:inptMake.value};

		carsService.updateCar(newCar);

		homePage();


	})
}
