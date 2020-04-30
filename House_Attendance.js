fetch('https://api.propublica.org/congress/v1/113/house/members.json',{
  method: "GET",
  headers: {
            "X-API-Key": "NQWCPz6PqZpqMnHsmN9eaTmWca759260kQ5LInoB"
   }
})
  .then(response => response.json())
  .then(data => {
    
    main(data.results[0].members)
  });

  let statistics = {"NumberOfDemocrats":0, 
  "NumberOfRepublicans":0, 
  "NumberOfIndependents":0, 
  "AveragePartyVotesD":0,
  "AveragePartyVotesR":0,
  "AveragePartyVotesID":0,
  "TotalNumberReps":0,
  "TotalAverage": 0,
  "LeastEngaged":0, 
  "MostEngaged":0,
  };
  function main (array){
    statistics.NumberOfRepublicans = filterMembers(array,"R"),
    statistics.NumberOfDemocrats = filterMembers(array,"D"),
    statistics.NumberOfIndependents = filterMembers(array,"ID"), 
    statistics.AveragePartyVotesD = averagePartyVotes(array, "D"),
    statistics.AveragePartyVotesR = averagePartyVotes(array, "R"),
    statistics.AveragePartyVotesID = averagePartyVotes(array, "ID"),
    statistics.TotalNumberReps = statistics.NumberOfRepublicans + statistics.NumberOfDemocrats + statistics.NumberOfIndependents,
    statistics.TotalAverage = totalAverage(array),
    statistics.LeastEngaged = leastEngaged(array), 
    statistics.MostEngaged = mostEngaged(array),
    buildAtGlance (statistics);
    buildTable(statistics.LeastEngaged,"senate-leastEngaged-table", "tBody-leastEngaged")
    buildTable(statistics.MostEngaged,"senate-mostEngaged-table","tBody-mostEngaged");
  }

function filterMembers(array,partyLetter){
    return array.filter(member => member.party === partyLetter).length;

}

function averagePartyVotes(array,partyLetter){
    let result = []
    array.filter(member =>{

        if (member.party === partyLetter){
            result.push(member.votes_with_party_pct);
        }
    });
        if (result.length === 0){
            return result.length
        } else{
            return (result.reduce((a,b) => a + b)/result.length).toFixed(2);
        }    
};

function totalAverage (array){
    let result = []
    array.filter(member => result.push(member.votes_with_party_pct));
    return (result.reduce((a,b) => a + b)/result.length).toFixed(2);
    };

function buildAtGlance (object) {
    let table = document.getElementById("house-glance-table");
    let tBody = document.getElementById("tBody");
        console.log(tBody);

    let rowRep = document.getElementById("rowRep");
    let rowDem = document.getElementById("rowDem");
    let rowInd = document.getElementById("rowInd");
    let rowTotal = document.getElementById("rowTotal");

    rowRep.insertCell().innerHTML = object.NumberOfRepublicans;
    rowRep.insertCell().innerHTML = object.AveragePartyVotesR;
    rowDem.insertCell().innerHTML = object.NumberOfDemocrats;
    rowDem.insertCell().innerHTML = object.AveragePartyVotesD;
    rowInd.insertCell().innerHTML = object.NumberOfIndependents;
    rowInd.insertCell().innerHTML = object.AveragePartyVotesID;
    rowTotal.insertCell().innerHTML = object.NumberOfRepublicans + object.NumberOfDemocrats + object.NumberOfIndependents;
    rowTotal.insertCell().innerHTML = object.TotalAverage;
};

function leastEngaged(array) {
    let result = []
    array.forEach(member => {
        result.push(member.missed_votes_pct)
    });
    
    let percentage = Math.floor(array.length * 0.1);
    let x = result.sort((a,b) => b-a).slice(0, percentage);
    let y = Math.min.apply(null, x);
        return array.filter(member => member.missed_votes_pct >= y);
};

function buildTable (array,tableId, tBodyId) {
    let table = document.getElementById(tableId);
    console.log(table);
    let tBody = document.getElementById(tBodyId);
    console.log(tBody);
    let fullName;

    for(i = 0 ; i < array.length ; i++) {
        let rowBody = document.createElement("tr");
        if (array[i].middle_name === null){   
            fullName = array[i].last_name + " " + array[i].first_name;
        }
            else {
                fullName = array[i].last_name + " " + array[i].first_name + " " + array[i].middle_name  + " ";      
            };
        rowBody.insertCell().innerHTML = fullName.link(array.url);
        rowBody.insertCell().innerHTML = array[i].missed_votes;
        rowBody.insertCell().innerHTML = array[i].missed_votes_pct;
            tBody.appendChild(rowBody);
        }
        }

buildTable(statistics.LeastEngaged,"house-leastEngaged-table", "tBody-leastEngaged");

function mostEngaged(array) {
    let result = []
    array.forEach(member => {
        result.push(member.missed_votes_pct)
    });
    let percentage = Math.floor(array.length * 0.1);
    console.log(percentage);
    let x = result.sort((a,b) => a-b).slice(0, percentage);
    console.log (x);
    let y = Math.max.apply(null, x);
        return array.filter(member => member.missed_votes_pct <= y);
};

buildTable(statistics.MostEngaged,"house-mostEngaged-table","tBody-mostEngaged");