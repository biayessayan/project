




const addBtn = document.querySelector('#btn-save');



addBtn.onclick = function () {

   

    const dateInput = document.querySelector('#input-datecost');
    const date_cost = dateInput.value;
    dateInput.value = ""; 
    

    const groupInput = document.querySelector('#input-group_cost');
    const group_cost = groupInput.value;
    groupInput.value = "";

   const descriptionsInput = document.querySelector('#input-descriptions_cost');
    const descriptions_cost = descriptionsInput.value;
    descriptionsInput.value = "";

    const valueCostInput = document.querySelector('#currency-field');
    const valueCost = valueCostInput.value;
    valueCostInput.value = "";

    const accountCostInput = document.getElementById('input-select').options[document.getElementById('input-select').selectedIndex].innerText;
    const accountCost = accountCostInput;
    accountCostInput.Value = "";

    const obj = {Date: date_cost, Group_cost:group_cost,Description:descriptions_cost,Value:valueCost,Account:accountCost};

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
       body: JSON.stringify(obj)
     
    })

    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}


function insertRowIntoTable(data){

}

