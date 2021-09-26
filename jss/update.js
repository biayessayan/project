

document.querySelector('table tbody').addEventListener
('click',function(event){
  // print in the web to check if it is works
  console.log (event.target);
   if (event.target.className === "glyphicon glyphicon-minus"){
	   var result = confirm("Want to delete?");
			if (result) {
			//Message to delete the item
				deleteRowById(event.target.dataset.data); 
			}else{
				location.reload();
				return false;
				
			}
   }
   if (event.target.className === "glyphicon glyphicon-pencil"){
	   handleEditRow(event.target.dataset.id);
	   

   }
})

const updateBtn = document.querySelector('#update-row-btn');

//delete action
function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

//edit action
function handleEditRow(id){
	//show id in html
	document.querySelector('#update-row-btn').dataset.id = id;
	
	const dateInputUpdate = document.querySelector('#dateUpdate').dataset.date;
    const date_cost = dateInputUpdate.value;
}




updateBtn.onclick = function (){
	//show the input labels
  const updateDateInput = document.querySelector('#input-datecost')

  fetch('http://localhost:5000/update/',{
  		method:'PATCH',
		headers:{
			'Content-type' : 'application/json'
		},  
		Body: JSON.stringify({
			id: updateDateInput.dataset.id,
			Date: updateDateInput.value
		})
  })
  .then(response => response.json())
  .then (data=>{
	  if(data.sucess){
		  location.reload();
	  }
  })
}

$(document).ready(function() {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title='Simple DataTable';
	// DataTable initialisation
	$('#table').DataTable(
		{
			"dom": '<"dt-buttons"Bf><"clear">lirtp',
			"paging": false,
			"autoWidth": true,
			"columnDefs": [
				{ "orderable": false, "targets": 6 }
			],
			"buttons": [
				'colvis',
				'copyHtml5',
        'csvHtml5',
				'excelHtml5',
        'pdfHtml5',
				'print'
			]
		}
	);
	
	
});