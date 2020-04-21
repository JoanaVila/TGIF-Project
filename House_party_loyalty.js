let members = data.results[0].members;

let statistics = {"NumberOfDemocrats":filterMembers(members,"D"), 
                "NumberOfRepublicans":filterMembers(members,"R"), 
                "NumberOfIndependents":filterMembers(members,"ID"), 
                "AveragePartyVotesD":averagePartyVotes(members, "D"),
                "AveragePartyVotesR":averagePartyVotes(members, "R"),
                "AveragePartyVotesID":averagePartyVotes(members, "ID"),
                "TotalNumberReps":0,
                "TotalAverage": totalaverage(members),
                /*"LeastEngaged":leastEngaged(members), 
                "MostEngaged":mostEngaged(members),*/
                "LeastLoyal": leastLoyal(members),
                "MostLoyal": mostLoyal(members),
                };

let listDemocrats = filterMembers(members,"D");
let listRepublicans = filterMembers(members,"R");
let listIndependents = filterMembers(members,"ID");

function filterMembers(array,partyLetter){
    return array.filter(member => member.party === partyLetter).length;

}
filterMembers(members,"D");
filterMembers(members,"R");
filterMembers(members,"ID");

console.log(statistics);

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
}
console.log(averagePartyVotes(members, "D"));
console.log(averagePartyVotes(members, "R"));
console.log(averagePartyVotes(members, "ID"));


function totalaverage (array){
    let result = []
    array.filter(member => result.push(member.votes_with_party_pct));
    return (result.reduce((a,b) => a + b)/result.length).toFixed(2);
    }
console.log (totalaverage(members));

function buildAtGlance (array) {
    let table = document.getElementById("senate-glance-table");
    let tBody = document.getElementById("tBody");
        console.log(tBody);

    let rowRep = document.getElementById("rowRep");
    let rowDem = document.getElementById("rowDem");
    let rowInd = document.getElementById("rowInd");
    let rowTotal = document.getElementById("rowTotal");

    rowRep.insertCell().innerHTML = array.NumberOfRepublicans;
    rowRep.insertCell().innerHTML = array.AveragePartyVotesR;
    rowDem.insertCell().innerHTML = array.NumberOfDemocrats;
    rowDem.insertCell().innerHTML = array.AveragePartyVotesD;
    rowInd.insertCell().innerHTML = array.NumberOfIndependents;
    rowInd.insertCell().innerHTML = array.AveragePartyVotesID;
    rowTotal.insertCell().innerHTML = array.NumberOfRepublicans + array.NumberOfDemocrats + array.NumberOfIndependents;
    rowTotal.insertCell().innerHTML = array.TotalAverage;
}
buildAtGlance(statistics);

function leastLoyal(array) {
    let result = []
    array.forEach(member => {
        result.push(member.votes_against_party_pct)
    });
    
    let percentage = Math.floor(array.length * 0.1);
    let x = result.sort((a,b) => b-a).slice(0, percentage);
    let y = Math.min.apply(null, x);
        return array.filter(member => member.votes_against_party_pct >= y);
}
console.log(leastLoyal(members));

function buildTable (array,tableId, tBodyId) {
    let table = document.getElementById(tableId);
    console.log(table);
    let tBody = document.getElementById(tBodyId);
    console.log(tBody);
    let fullName;

    for (i = 0 ; i < array.length ; i++) {
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

buildTable(statistics.LeastLoyal,"senate-leastLoyal-table", "tBody-leastLoyal");

function mostLoyal(array) {
    let result = []
    array.forEach(member => {
        result.push(member.votes_with_party_pct)
    });
    let percentage = Math.floor(array.length * 0.1);
    console.log(percentage);
    let x = result.sort((a,b) => a-b).slice(0, percentage);
    console.log (x);
    let y = Math.max.apply(null, x);
        return array.filter(member => member.votes_with_party_pct <= y);
}
console.log(mostLoyal(members));

buildTable(statistics.MostLoyal,"senate-mostLoyal-table", "tBody-mostLoyal");