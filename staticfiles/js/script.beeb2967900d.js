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
)

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

    // Manage the display of favorite forms to ensure users can only add meals to their 'favorites' once //

    if (window.location.pathname.includes('/menu/')) {
      const mealIdList = document.getElementsByClassName('mealId')
      const mealList = document.getElementsByClassName('meal')
  
      //add value of meal id to favourite form field
      for(input of mealIdList){
        input.value = input.previousElementSibling.value
      }
  
      //display favourite forms depending on p hidden element value that is generated only if favourite exists for user and specific meal
      for(meal of mealList){
        console.log(meal)
        const favouriteExists = meal.getElementsByClassName('favourite-exists')[0]
        const addFavouriteForm = meal.getElementsByClassName('add-favourite-form')[0]
        const removeFavouriteForm = meal.getElementsByClassName('remove-favourite-form')[0]
  
        if(favouriteExists){
          addFavouriteForm.style.display = 'none'
        }
  
      }
  
  
    }

 // --------------------------MAKE REVIEWS NAV ITEM ACTIVE----------------------------------------------------------
    const reviewsNav = document.getElementById('reviewsNav');
    removeActiveAll();
    reviewsNav.classList.add("active");

    if(user.value == "authenticated" && status.value == "client"){
      const rating = document.getElementsByClassName('rating')[0];
      const stars = rating.getElementsByTagName('button');
      // console.log(window.getComputedStyle(document.getElementById('addReviewForm'), null).display == "block")
      // console.log(window.getComputedStyle(document.getElementById('myReview'), null).display == "block")
      var rateValue;
        if(document.querySelector('#myReview'))
      {
        rateValue = document.querySelector('#updateRateValue');        
      }
      else{
        rateValue = document.querySelector('#rateValue');
      }
        
      const displayUpdateForm = document.querySelector('#displayUpdateForm');
      const myReview = document.querySelector('#myReview');
      const reviewExists = document.querySelector('#reviewExists');
      const addReviewForm = document.querySelector('#addReviewForm');

      //add event listeners for rating stars
      stars[0].clicked = true;
      const makeHoverStarsYellow = (limit) => {
        for(let j=0; j<=limit; j++){
            stars[j].style.color = "yellow";
        }
      };

      const makeNotClickedStarsGray = (i) => {
        for(let j=0; j<=i; j++){
             if(!stars[j].clicked)
               stars[j].style.color = "gray";
           }
       };
         
       const makeClickedStarsYellow = (i) => {
         rateValue.value = i+1;
           rateValue.innerHTML = i+1;
           for(let j=0; j<=i; j++){
             stars[j].style.color = "yellow";
             stars[j].clicked = true;
           }
           if(i != stars.length-1)
             for(let z=i+1; z<stars.length; z++){
               stars[z].style.color = "gray";
               stars[z].clicked = false;
             }
       };
 
      for(let i=0; i<stars.length; i++){
        stars[i].addEventListener('mouseover', (event) => {
          event = makeHoverStarsYellow(i);
        });
        
        stars[i].addEventListener('mouseleave', (event) => {
          event = makeNotClickedStarsGray(i);
        });

        stars[i].addEventListener('click', (event) => {
          event = makeClickedStarsYellow(i);
        });

      }

      //on update button click display update form and fill it with existing values of the review coresponding to the authenticated user
      if(displayUpdateForm)
      displayUpdateForm.addEventListener("click", () => {
        const updateReviewForm = document.querySelector('#updateReviewForm');
        const reviewText = document.querySelector('#reviewTextHidden');
        const reviewTextInput = updateReviewForm.querySelector('#updateReviewText');
        const updateRating = updateReviewForm.querySelectorAll('.rating')[0].querySelectorAll('button');
        const updateRate = updateReviewForm.getElementsByClassName("rate")[0];
        const formRate = updateReviewForm.querySelector('#updateRateValue');

        myReview.style.display = "none";
        updateReviewForm.style.display = "block";
        displayUpdateForm.style.display = "none";

        formRate.value = updateRate.value;
        reviewTextInput.textContent = reviewText.value;

        for(let i=0; i<updateRate.value; i++){
          updateRating[i].style.color = "yellow";
        }
      
      });

      //don't display add review form if review already exists for authenticated user
      if(reviewExists)
      {
        addReviewForm.style.display = 'none';
      }
    }
    
    
    const generateStarsContainers = document.getElementsByClassName('ratings-generated');

    //generate stars for reviews rating after rate value
   
      for(let container of generateStarsContainers){
        const rateHidden = container.previousElementSibling;
  
  
        for(let i=0; i<rateHidden.value; i++){
          let star = document.createElement("button");
          star.textContent = '★';
          star.classList.add('star');
          star.style.color = "yellow";
          container.appendChild(star);
     
         }
     
         for(let i=0; i<5-rateHidden.value; i++){
           let star = document.createElement("button");
           star.textContent = '★';
           star.classList.add('star');
           container.appendChild(star);
      
          }
      } 

  }

  if (window.location.pathname.includes('/menu/')) {

    // --------------------------MAKE MENU NAV ITEM ACTIVE----------------------------------------------------------
    const menuNav = document.getElementById('menuNav');
    removeActiveAll();
    menuNav.classList.add("active");


    const mealIdList = document.getElementsByClassName('mealId');
    const mealList = document.getElementsByClassName('meal');
 
    //add value of meal id to favourite form field
    for(var input of mealIdList){
      input.value = input.previousElementSibling.value;
    }

    //display favourite forms depending on p hidden element value that is generated only if favourite exists for user and specific meal
    for(var meal of mealList){
      const favouriteExists = meal.getElementsByClassName('favourite-exists')[0];
      const addFavouriteForm = meal.getElementsByClassName('add-favourite-form')[0];

      if(favouriteExists){
        addFavouriteForm.style.display = 'none';
      }

    }


  }

   //add event listeners for rating stars
   stars[0].clicked = true;
   const makeHoverStarsYellow = (limit) => {
     for(let j=0; j<=limit; j++){
         stars[j].style.color = "yellow";
     }
   };
