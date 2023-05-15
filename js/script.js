
// ==== api function ===============================
async function getData(country = "egypt") {
  let response = await fetch( `https://api.weatherapi.com/v1/forecast.json?key=551ad6e305b34e9397300505221206&q=${country}&days=3`);
  let result = await response.json();
  displayToday(result);
  displayNextDays(result);
  displayAstro(result);
  forecastByHoursToday(result);
  forecastByHours(result);
}
getData();

// ========= date object=================================
let date = new Date();
let month = date.getMonth();
let day = date.getDay();
let dateNum = date.getDate();
let todayHour = date.getHours();

let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let daysName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// ========== displayDataTable1 ===============================

function displayToday(result) {
  return  document.getElementById("table-1").innerHTML  = `
    <div>
                        <div  class="result-header">
                            <p class="d-flex justify-content-between align-items-center"><span>${daysName[day]}</span><span>${dateNum} ${monthName[month]}</span> </p>
                        </div>
                        <div class="result-content">
                            <p id="location" class="text-start p-1 fs-4 mb-1">${result.location.name}</p>
                            <div class="mb-4">
                              <p class="degree fw-bolder  mb-1">  <span>${result.current.temp_c}</span><span>&#176 C</span></p>
                                <div class="table-img text-start mb-3">
                                    <img src='https:${result.current.condition.icon} 'alt="condition wheather icon" >
                                </div>
                            </div>
                            <p class="text-start status">${result.current.condition.text}</p>
                            <div class="d-flex">
                                <div>
                                    <img src="images/icon-umberella@2x.png" alt="humidity icon">
                                    <span>${result.current.humidity}%</span>
                                </div>
                                <div>
                                    <img src="images/icon-wind@2x.png" alt="wind icon">
                                    <span>${result.current.wind_kph}Km/h</span>
                                </div>
                                <div>
                                    <img src="images/icon-compass@2x.png" alt="compass icon">
                                    <span>East</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
}

// ============ displayDataTable2,3 ============================================

function displayNextDays(result) {
  let dayCount = document.getElementsByClassName("table-2").length;

  for (let i = 0; i <dayCount; i++) {
    document.getElementsByClassName("table-2")[i].innerHTML = ` <div>
                                <div class="result-header">
                                    <p>${daysName[new Date(result.forecast.forecastday[i+1].date).getDay()]}</p>
                                </div>
                                <div class="result-content  ">
                                    <div class="table-img mb-4 mx-auto">
                                        <img src='https:${result.forecast.forecastday[i+1].day.condition.icon}' alt="">
                                    </div>
                                    <p class=" mb-1 fs-2 fw-bolder"><span>${result.forecast.forecastday[i + 1].day.maxtemp_c}</span><span>&#176 C</span></p>
                                    <p class="mb-3 fs-4"> 
                                    <small>${result.forecast.forecastday[i + 1].day.mintemp_c}<span>&#176</span></small>
                                    </p>
                                    <p class="status">${result.forecast.forecastday[i + 1].day.condition.text}</p>
                                </div>
                            </div>`;
  }
}

// ========= country search ===========================================
let inputLocation = document.getElementById("inputLocation");
inputLocation.addEventListener("keyup", changeLocation);

function changeLocation() {
  getData(inputLocation.value);
}

// ======== nav anchor =====================================
let navAnchor = document.querySelectorAll(".navbar .navbar-nav .nav-link");
let media = window.matchMedia("(max-width:768px)");

navAnchor.forEach((ele) => {

     ele.style.borderTopColor = "transparent";
      ele.style.borderBottomColor = "transparent";
      ele.style.color = "var(--secendColor)";

  ele.addEventListener("click", function () {
    navAnchor.forEach((nav) => {
      nav.style.borderTopColor = "transparent";
      nav.style.borderBottomColor = "transparent";
      nav.style.color = "var(--secendColor)";

      if (media.matches) {
        this.style.borderTopColor = "transparent";
        this.style.borderBottomColor = "var(--thirdColor)";
      } 
      else {    
        this.style.borderTopColor = "var(--thirdColor)";
        this.style.borderBottomColor = "transparent";
      }
      this.style.color = "var(--thirdColor)";

     
      document.getElementById( `${nav.getAttribute("href").slice(1)}`).style.display = "none";
      document.getElementById(`${this.getAttribute("href").slice(1)}`).style.display = "block";

      // $("html , body").animate({scrollTop: document.getElementById(`${this.getAttribute("href").slice(1)}`).offsetTop},500);
      $("html , body").animate({scrollTop: '90px'},500);
    });
  });
});

// ============ displayAstro ========================================

astro.addEventListener("click", displayAstro);
function displayAstro(result) {
  let container = document.querySelector("#astro .container .row .col-10");
  let content = `
                        <div class='row'>
                        
                        <h5 class='mb-5 fw-bolder'>${date.toDateString()}</h5>
                        <div class='col-lg-3'>
                        <p>sunrise <img src="images/download (1).png" alt="sunrise image">
                        </p>
                            <span> ${
                              result.forecast.forecastday[0].astro.sunrise
                            } </span>
                        </div>
                        <div class='col-lg-3'>
<p>sunset  
<img src="images/images.png" alt="sunset image">
 </p>
                            <span> ${
                              result.forecast.forecastday[0].astro.sunset
                            } </span></div>
                            <div class='col-lg-3'>

<p>moonrise  
<img src="images/download (2).png" alt="moonrise image">
  </p>
                           <span> ${
                             result.forecast.forecastday[0].astro.moonrise
                           } </span>
                           </div>
                           <div class='col-lg-3'>
                            <p>moonset
<img src="images/images (1).png" alt="moonset image">
                            
                            </p>
                            <span> ${
                              result.forecast.forecastday[0].astro.moonset
                            } </span>
                        </div>
                            </div>
                        `;

  container.innerHTML = content;
}


// ========  forecast by hours  ==================================
hours.addEventListener("click", function(){
  forecastByHoursToday(result);
  forecastByHours(result);
});

function forecastByHoursToday(result) {
  let forecastday = result.forecast.forecastday[0];
  let index;
    document.querySelectorAll("#hours .dayDate")[0].innerHTML = forecastday.date;

    let hours = forecastday.hour;

    let content = ``;

    for (let j = 0; j<hours.length; j++) {
      if (forecastday.hour[j].time.slice(11, 13) == todayHour) {
        index = j;
      }
     
    }

    let startSlice = forecastday.hour.indexOf(forecastday.hour[index]);

  let forecastToday = forecastday.hour.slice(startSlice);

forecastToday.map(cond =>{
  content += `
       <div class='m-1 condition ' >
       <p class='fw-bolder'>${cond.time.slice(11)}</p> 
       <img src="https:${cond.condition.icon}" alt="condition wheather icon">
       <p>${cond.condition.text}</p>
  
    <div>
    <p><small>Temp:</small>${cond.temp_c}<small>&#176 C</small></p>
       <p><small>Wind:</small>${cond.wind_kph} km/h</p>
       <p><small>Humidity:</small>${cond.humidity}%</p>
    </div>
       </div>
  `; 
   document.querySelectorAll("#hours .dayDetails")[0].innerHTML = content;

})
  let div = document.querySelectorAll(".condition")[0];
  div.classList.add("scale");
  div.innerHTML+= `<div id='current' ><i class="fa-solid fa-caret-down"></i> </div>`;

}



function forecastByHours(result) {
  let forecastdays = result.forecast.forecastday;
  for (let i = 1; i < 3; i++) {
    document.querySelectorAll("#hours .dayDate")[i].innerHTML = forecastdays[i].date;



    let hours = forecastdays[i].hour;
    let content = ``;

    for (let j = 0; j < hours.length; j++) {
      content += `
     <div class='m-1 condition' >
     <p class='fw-bolder'>${hours[j].time.slice(11)}</p> 
     <img src="https:${hours[j].condition.icon}" alt="condition wheather icon">
     <p>${hours[j].condition.text}</p>

  <div>
  <p><small>Temp:</small>${hours[j].temp_c}<small>&#176 C</small></p>
     <p><small>Wind:</small>${hours[j].wind_kph} km/h</p>
     <p><small>Humidity:</small>${hours[j].humidity}%</p>
  </div>
     </div>
`;
    document.querySelectorAll("#hours .dayDetails")[i].innerHTML = content;
  }
}
}
// ================================================

$(document).ready(function () {
  $(".responsive").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      }
    ]
  });
  // --------------------------------
  // $(".owl-carousel").owlCarousel({
  //   items: 6,
  //   loop: true,
  //   margin: 10,
  //   nav: true,
  //   dots:true,
  //   responsive:{
  //       0:{
  //           items:3
  //       },
  //       600:{
  //           items:4
  //       },
  //       1000:{
  //           items:6
  //       }
  //   }
  // });
  $(".owl-carousel").owlCarousel();

  AOS.init();

});
