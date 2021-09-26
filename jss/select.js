
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});


function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='15'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id,Data,Group_cost,Description,Value, Account}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td id="dateUpdate">${Data}</td>`;
        tableHtml += `<td>${Group_cost}</td>`;
        tableHtml += `<td>${Description}</td>`;
        tableHtml += `<td>${Value}</td>`;
        tableHtml += `<td>${Account}</td>`;
        tableHtml += `
        <td>
        
        <p type="button" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;">
        <span type="button"  class="glyphicon glyphicon-pencil" aria-hidden="true" data-id=${id}></span>
        </p>
        <p class="btn btn-danger btn-xs dt-delete">
            <span class="glyphicon glyphicon-minus" aria-hidden="true" data-id=${id}></span>
        </p>
    </td>`;
        tableHtml += "</tr>";
       
    });

    table.innerHTML = tableHtml;
   
}

