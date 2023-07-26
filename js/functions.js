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