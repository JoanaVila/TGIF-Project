/*let members = data.results[0].members;
function buildTable(array) {
    var table = document.getElementById("senate-table");
    var tbody = document.getElementById("senate-info");
      for (i = 0, i < array.lenght; i++;) {
            var row = document.createElement("tr");
            row.inserCell().innerHTML= person[i].name + " " + person[i].last_name;
            row.inserCell().innerHTML= person[i].party;
            row.inserCell().innerHTML= person[i].state;
            row.inserCell().innerHTML= person[i].seniority;
            row.inserCell().innerHTML= per[i].votes_with_party_percentage;
        
    };
        
                tbody.appendChild(row);
                table.appendChild(tbody);
    }
buildTable(members);*/

let members = data.results[0].members;

  let table = document.getElementById("senate-data");
    console.log(table);
  let tHead = document.getElementById("tbl-head");
    console.log (tHead);
  
  /*let row = document.createElement("tr");

    row.insertCell().innerHTML= "Full Name";
    row.insertCell().innerHTML= "Party";
    row.insertCell().innerHTML= "State";
    row.insertCell().innerHTML= "Seniority";
    row.insertCell().innerHTML= "Percentage of votes with party (% added)";

    table.appendChild(tHead);
    tHead.appendChild(row);*/

  
  
  function buildTable (array) {
    let tBody = document.createElement("tbody");
    let fullName;

    for(i = 0 ; i < array.length ; i++) {
        
        let rowBody = document.createElement("tr");
        if (array[i].middle_name === null){
               
          fullName = array[i].last_name + " " + array[i].first_name;
              
            } else {
             fullName = array[i].last_name + " " + array[i].first_name + " " + array[i].middle_name  + " ";
                
           };
        
      rowBody.insertCell().innerHTML= fullName.link(array[i].url);
      rowBody.insertCell().innerHTML= array[i].party;
      rowBody.insertCell().innerHTML= array[i].state;
      rowBody.insertCell().innerHTML= array[i].seniority;
      rowBody.insertCell().innerHTML= array[i].votes_with_party_pct;

      tBody.appendChild(rowBody);
    }
    table.appendChild(tBody);
    console.log (tBody);
  };
    
    buildTable(members);

    

  

  
  
  
  
  
  







