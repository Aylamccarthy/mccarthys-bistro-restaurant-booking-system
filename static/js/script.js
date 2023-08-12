document.addEventListener("DOMContentLoaded", function(event) { 

  // --------------------------ON REFRESH DELETE HASH IF EXISTS AND RELOAD--------------------------
  if (performance.getEntriesByType('navigation')[0].type != 'navigate') {
    if(window.location.hash){
      history.pushState("", document.title, window.location.pathname);
      window.location = history.state;
      sessionStorage.setItem('pageHasBeenLoaded', 'true');
    }
  }
}
);

  if (window.location.pathname=='/') {
  
      // --------------------------ADD EVENT LISTENER FOR BOTTOM TO TOP BUTTON ON INDEX PAGE--------------------------
      //Get the button
      let mybutton = document.getElementById("btn-back-to-top");
      // When the user clicks on the button, scroll to the top of the document
      mybutton.addEventListener("click", backToTop);
      function backToTop() {
        history.pushState("", document.title, window.location.pathname);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
  
    }

  // Google Map Initialization //
    function initMap() {
      // The location of Cobh
      const cobh = { lat: 51.84914, lng: -8.29743 }; 
      // The map, centered at Cobh
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: cobh,
      });
      // The marker, positioned at Cobh
      const marker = new google.maps.Marker({
        position: cobh,
        map: map,
      });
    }


//------- reviews page-------//
if (window.location.pathname.includes('/reviews/')) {
  const rating = document.getElementsByClassName('rating')[0]
  const stars = rating.getElementsByTagName('button')
  const rateValue = document.querySelector('#rateValue')

  stars[0].clicked = true
  for(let i=0; i<stars.length; i++){
    stars[i].addEventListener('mouseover', () => {
      for(let j=0; j<=i; j++){
        stars[j].style.color = "yellow"
    }
    })
    stars[i].addEventListener('mouseleave', () => {
      for(let j=0; j<=i; j++){
        if(!stars[j].clicked)
          stars[j].style.color = "gray"
      }
    })

    stars[i].addEventListener('click', () => {
      rateValue.value = i+1;
      rateValue.innerHTML = i+1;
      for(let j=0; j<=i; j++){
        stars[j].style.color = "yellow"
        stars[j].clicked = true
      }
      if(i != stars.length-1)
        for(let z=i+1; z<stars.length; z++){
          stars[z].style.color = "gray"
          stars[z].clicked = false
        }
    })
  }
}

//-----Initialize toast------//
$('.toast').toast(option)