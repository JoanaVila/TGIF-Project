let members = data.results[0].members;

  let table = document.getElementById("senate-data");
    console.log(table);
  let tHead = document.getElementById("tbl-head");
    console.log (tHead);
    let tBody = document.createElement("tbody");
  
  function buildTable (array) {

    for(i = 0 ; i < array.length ; i++) {
     
        let rowBody = document.createElement("tr");

        if (array[i].middle_name === null){
               
            fullName= array[i].last_name + " " + array[i].first_name ;
              
            } else {

            fullName= array[i].last_name + " " + array[i].first_name + " " + array[i].middle_name  + " ";
                
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
