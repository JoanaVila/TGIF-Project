console.log ("teste");
var btnText = document.getElementById("myBtn");
btnText.addEventListener("click",()=>myfunction());
console.log (btnText);

function myfunction() {
    
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");


    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }  
 };
