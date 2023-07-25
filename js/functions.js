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
}