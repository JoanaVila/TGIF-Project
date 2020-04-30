
fetch('https://api.propublica.org/congress/v1/113/senate/members.json',{
  method: "GET",
  headers: {
            "X-API-Key": "NQWCPz6PqZpqMnHsmN9eaTmWca759260kQ5LInoB"
   }
})
  .then(response => response.json())
  .then(data => {
    main(data.results[0].members)
  });
  

  function main (array){
    setTimeout(()=> {document.querySelector("#loader").className += ' ' + "hide-loader"});
    buildTable (array);
    addEvent(array);
    selectbyState(array);
    
    
  }
  
function buildTable (array) {
  let table = document.getElementById("senate-data");
  let tBody = document.getElementById("tbody_senate");

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
};


function addEvent(array){
  let checkbox = Array.from(document.querySelectorAll('input[name="party"]')).forEach(box => box.addEventListener("change",()=>filter(array)));
  let select = document.getElementById("state").addEventListener("change", ()=>filter(array));

};
  
function filter(array){
  let tBody = document.getElementById("tbody_senate");
  let checkboxvalue = Array.from(document.querySelectorAll('input[name="party"]:checked')).map(function(myinput) {
    return myinput.value;
});

  let select = document.getElementById("state").value;
    if (checkboxvalue.length === 0 && select === "All"){
  tBody.innerHTML = ""
buildTable(array);
    }
    if(checkboxvalue.length > 0 && select === "All"){
  tBody.innerHTML = ""
  let result = array.filter(member => checkboxvalue.includes(member.party));
buildTable (result);
    }
    if (checkboxvalue.length === 0 && select !== "All") {
  tBody.innerHTML = ""
  let result = array.filter(member => select === member.state);
buildTable (result);
    }
    if (checkboxvalue.length > 0 && select !== "All"){
  tBody.innerHTML = ""
  let result =  array.filter(member => checkboxvalue.includes(member.party) && select === member.state);
buildTable (result);
    }
};

function selectbyState(array){
  let states = []
  let select = document.getElementById("state");
    for (let i = 0; i < array.length; i++) {
  states.push(array[i].state);
    }
  let filteredArray = states.filter(function(item, pos){
    return states.indexOf(item) === pos
    }).sort()
    for (let j = 0; j < filteredArray.length; j++) {
  let options = document.createElement('option');
  options.innerHTML = filteredArray[j];
  options.value = filteredArray[j];
  select.appendChild(options);     
    }
};

function loaded(){
  var loaded = document.createElement('div');
    loaded.setAttribute('class', 'loader')
    var trs = document.querySelectorAll('td')
    console.log(trs)
}
loaded();


  
  
  







