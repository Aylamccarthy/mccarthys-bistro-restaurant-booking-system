document.addEventListener("DOMContentLoaded", function(event) { 

  // --------------------------ON REFRESH DELETE HASH IF EXISTS AND RELOAD--------------------------
  if (performance.getEntriesByType('navigation')[0].type != 'navigate') {
    if(window.location.hash){
      history.pushState("", document.title, window.location.pathname);
      window.location = history.state;
      sessionStorage.setItem('pageHasBeenLoaded', 'true');
    }
  }

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
  
    if (window.location.pathname=='/bookings/createbookings/') {
      const datePicker = document.querySelector("#datePicker");
      const startTime = document.querySelector("#startTime");
      const endTime = document.querySelector("#endTime");
      const customer_name = document.querySelector("#fullName");
      const customer_email = document.querySelector("#email");
      const book_auth = document.querySelector("#bookAuthenticate");
      const tableSelect = document.querySelector("#tableCode")
      const tableOptions = document.querySelectorAll('#tableCode > option')
      const substractionButton = document.getElementsByClassName("number-input")[0].getElementsByTagName("button")[1];
      const findTableButton = document.getElementsByClassName("continue")[0];
      const continueButton = document.getElementsByClassName("continue")[1];
      const restartButtons = document.getElementsByClassName("restart");
      const finishButton = document.getElementsByClassName("continue")[2];
      const flexButtons = document.querySelector("#flexButtons");
      const booking_form = document.querySelector("#booking_form");
      const bookingOverview = document.querySelector("#bookingOverview");
      const noOfPersons = document.querySelector("#tablePersons");
  
      // --------------------------SET DATE PICKER INPUT MIN VALUE TO TODAY DATE--------------------------
      datePicker.min = new Date().toLocaleDateString('en-IE')
      var currentDay = new Date();
      var dd = String(currentDay.getDate()).padStart(2, '0');
      var MM = String(currentDay.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = currentDay.getFullYear();
      currentDay = yyyy + '-' + MM + '-' + dd;
      datePicker.value = currentDay

       // --------------------------SET TIME INPUT VALUE TO :00 FORMAT FOR MINUTES--------------------------
    startTime.addEventListener("change", function(evt) {
      var match = this.value.match(/^(\d{2})/);
      if (match) this.value = match[1] + ":00";
    });
    endTime.addEventListener("change", function(evt) {
      var match = this.value.match(/^(\d{2})/);
      if (match) this.value = match[1] + ":00";
    });

     // --------------------------RELOAD PAGE ON RESTART BUTTON CLICK--------------------------
     Array.from(restartButtons).forEach(button => {
      button.addEventListener('click', () => {
        window.location = "/bookings/createbookings"
      })
    });

    // --------------------------ENABLE/DISABLE CONTACT INPUTS WHEN 'BOOK IT ON MY NAME' IS CHECKED--------------------------
    book_auth.addEventListener('click', manipulateInputs = () => {
      if(book_auth.checked == true){
        customer_name.readOnly = true;
        customer_email.readOnly = true;
      }
      else{
        customer_name.readOnly= false;
        customer_email.readOnly = false;
      }
    })

    // --------------------------CHECK IF DATE SELECTED IS BEFORE CURRENT DAY--------------------------
    const isDateValueValid = (date) => {
      // get input value date 
      var inputDate = new Date(date);
      inputDate.setHours(0,0,0,0);
      // get current day
      var today = new Date();
      today.setHours(0,0,0,0);
      if( inputDate >= today )
        return true
      else  
        return false
    }

     // --------------------------CHECK IF START TIME IS AFTER CURRENT TIME FOR TODAY BOOKINGS--------------------------
     const isStartTimeTodayValid = (startTime) => {
      
      // get input value date 
      var inputDate = new Date(datePicker.value);
      inputDate.setHours(0,0,0,0);
      // get current day
      var today = new Date();
      today.setHours(0,0,0,0);
      if( inputDate.getTime() == today.getTime() ){
        // get system local time
        var d = new Date();
        var m = d.getMinutes();
        var h = d.getHours();
        if(h == '0') {h = 24}

        if(h < 10)
          if(m < 10)
            var currentTime = "0"+h+":0"+m;
          else
            var currentTime = "0"+h+":"+m;
        else
          if(m < 10)
            var currentTime = h+":0"+m;
          else
            var currentTime = h+":"+m;



        if(startTime <= currentTime)
          return false
        else
          return true  
      }
      else
        return true
    }
     // --------------------------CHECK IF BOOKING TIME IS GREATER THAN 60 MIN--------------------------
     const isTimeIntervalCorrect = (startTime, endTime) => {
      let startInMinutes = (parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1])) 
      let endInMinutes = (parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1])) 
      let diffInMin = endInMinutes - startInMinutes
      if( diffInMin < 60 )
        return false
      else
        return true  
    }
    // --------------------------CHECK IF STRING HAS A LENGTH GREATER THAN VALUE GIVEN AS ARGUMENT--------------------------
    const isStringLengthValid = (string, value) => {
      if(string.length > value)
        return false
      else
        return true  
    }

    // --------------------------CHECK IF STRING CONTAINS SPECIAL CHARACTERS--------------------------
    const containsSpecialChars = (string) => {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(string);
    }

     // --------------------------CHECK IF EMAIL RESPECTS EMAIL PATTERN--------------------------
     const isEmailValid = (email) => {
      const email_expression = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
      if(email_expression.test(email) == false)
      {
        return false;
      }
      return true;
    }

        // --------------------------DISPLAY ERROR--------------------------
        const showError = (input, message) => {
          // get the form-field element
          const formField = input.parentElement;
      
          // show the error message
          const error = formField.querySelector('small');
          error.textContent = message;
      };
      // --------------------------HIDE ERROR--------------------------
      const showSuccess = (input) => {
        // get the form-field element
        const formField = input.parentElement;
        // hide the error message
        const error = formField.querySelector('small');
        error.textContent = '';
      }

      // --------------------------CHECK DATE AND SET ERROR MESSAGES--------------------------
    const checkDate = () => {
      let valid = false;
      const date = datePicker.value.trim();
      if (!isRequired(date)) {
          showError(datePicker, 'Please choose a date');
      } else if(!isDateValueValid(date)){
          showError(datePicker, 'A date before current day is not valid');
      } else {
          showSuccess(datePicker);
          valid = true;
      }
      return valid;
    } 

     // --------------------------CHECK START TIME AND SET ERROR MESSAGES--------------------------
     const checkStartTime = () => {
      var currentTime = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
      let valid = false;
      const time = startTime.value.trim();
      if (!isRequired(time)) {
          showError(startTime, 'Please choose a start time');
      } else if(!isBetween(time, "09:00", "23:00")){
          showError(startTime, 'Choose a time between 09:00 and 23:00');
      } else if (!isStartTimeTodayValid(time)){
          showError(startTime, 'Please choose a time after ' + currentTime);
      } else
      {
          showSuccess(startTime);
          valid = true;
      }
      return valid;
    } 

    // --------------------------CHECK END TIME AND SET ERROR MESSAGES--------------------------
     const checkEndTime = () => {
      let valid = false;

      const start = startTime.value.trim();
      const end = endTime.value.trim();

      if (!isRequired(end)) {
          showError(endTime, 'Please choose an end time');
      } else if(!isBetween(end, "09:00", "23:00")){
          showError(endTime, 'Choose a time between 09:00 and 23:00');
      } else if (!isTimeIntervalValid(start, end)){
          showError(endTime, 'End hour must be grater than start hour');
      } else if(!isTimeIntervalCorrect(start, end)){
        showError(endTime, 'Booking must be for at least an hour');
      }else
      {
          showSuccess(endTime);
          valid = true;
      }
      return valid;
    } 

      // --------------------------CHECK NAME INPUT AND SET ERROR MESSAGES--------------------------
    const checkCustomerName = () => {
    let valid = false;
    const name = customer_name.value.trim();
    
      if (!isRequired(name)) {
          showError(customer_name, 'Please type a name');
      } else if(!isStringLengthValid(name, 30)){
        showError(customer_name, 'No more than 30 characters');
      } else if(containsSpecialChars(name)){
          showError(customer_name, 'No special characters');
      } else{
          showSuccess(customer_name);
          valid = true;
      }
      return valid;
    } 

    // --------------------------CHECK EMAIL AND SET ERROR MESSAGES--------------------------
    const checkEmail = () => {
      let valid = false;
      const email = customer_email.value.trim();
    
      if (!isRequired(email)) {
          showError(customer_email, 'Please type an email');
      } else if(!isEmailValid(email)){
          showError(customer_email, 'Email is invalid');
      } else{
          showSuccess(customer_email);
          valid = true;
      }
      return valid;
    } 

    // -------------------------CHECK FIRST BOOKING SECTION VALIDITY --------------------------
    findTableButton.addEventListener("click", () => {

      let isdateValid = checkDate();
      let isStartValid = checkStartTime();
      let isEndValid = checkEndTime();
 
      let isDetailsSectionValid = isdateValid &&
          isStartValid &&
          isEndValid;
      // display next section if inputs are valid
      if (isDetailsSectionValid) {

        datePicker.readOnly = true;
        startTime.readOnly = true;
        endTime.readOnly = true;
        findTableButton.style.display = "none";
        window.location = "/bookings/createbookings/#tableContentCollapse"
        document.querySelector('#tableContentCollapse').style.display = 'block';

         // get database entries for bookings and tables from html 
         var bookingsData = JSON.parse(JSON.parse(document.getElementById('bookings_data').textContent));
         var tablesData = JSON.parse(JSON.parse(document.getElementById('tables_data').textContent));
         var tablesStatusImages = []

         //check if tables are busy for the date and time selected and create another array of objects with tables code and status image
         for(let table of tablesData){

           var free = true;

           for(let booking of bookingsData){
             var bookingStart = booking.fields.start_time;
             var bookingEnd = booking.fields.end_time;

             if(booking.fields.date == datePicker.value && booking.fields.table == table.fields.code && (!(endTime.value <= bookingStart) && !(startTime.value >= bookingEnd))){
               free = false;
               break;
             }
           }

           if(free == true){
             tablesStatusImages.push({"code": table.fields.code, "status":"free", "persons":table.fields.no_of_persons, "image_url":table.fields.table_free_img})
           }
           else{
             tablesStatusImages.push({"code": table.fields.code, "status":"busy", "persons":table.fields.no_of_persons, "image_url":table.fields.table_occupied_img})
           }
         }

         // create images elements and append them to html grid container
         let tableList = document.getElementsByClassName('table-container')[0]
         tablesStatusImages.forEach(table => {
           let img = document.createElement('img');
           img.src ='https://res.cloudinary.com/useriasminna/' + table.image_url
           tableList.appendChild(img);
         })

         //remove busy tables from select options
         for(i = 0; i < tablesStatusImages.length; i++){
           if(tablesStatusImages[i].status == 'busy')
             tableOptions[i].remove()
             for(j=i; j< tableOptions.length; j++){
               tableOptions[j] = tableOptions[j+1]
             }
         }


         if(tableSelect.options.length == 0){
           tableSelect.options.add(new Option('No table available', 'message'))
           tableSelect.options[0].selected = true;
           tableSelect.disable=true;
           noOfPersons.value = "";
           continueButton.style.display = "none"
         }
         else{
           tableSelect.options[0].selected = true;
           //set default value for number of persons
           for(let table of tablesStatusImages){
             if(table.code == tableOptions[0].innerHTML){
               noOfPersons.value = table.persons;
               break;
             }
           }
         }

         //make number of persons input to update its value on select change
         tableSelect.addEventListener("change", () => {

           for(let table of tablesStatusImages){
             if(table.code == tableSelect.options[tableSelect.selectedIndex].text){
               noOfPersons.value = table.persons;
               break;
             }
           }
         })


      }
    })

     // -------------------------CHECK SECOND BOOKING SECTION VALIDITY --------------------------
    continueButton.addEventListener("click", () => {
        // check validity


        // display next section
        flexButtons.style.display = "none";
        window.location = "/bookings/createbookings/#bookingContactCollapse"  
        document.querySelector('#bookingContactCollapse').style.display = 'block';

    })

     // -------------------------CHECK THIRD BOOKING SECTION VALIDITY --------------------------
    finishButton.addEventListener("click", () => {
      // check validity
      book_auth.removeEventListener("click", manipulateInputs)

      if(book_auth.checked == false){
        customer_name.readOnly = true
        customer_email.readOnly = true

        //prevent user from changing checbox state
        book_auth.addEventListener("click", (event)=>{

          setTimeout(function() {
            this.removeAttr('checked');
          }, 0);

          event.preventDefault();
          event.stopPropagation();
        })

        customer_name.parentElement.style.display="none";
        customer_email.parentElement.style.display="none";
        
        let isNameValid = checkCustomerName();
        let isEmailValid = checkEmail();

        let isContactSectionValid = isNameValid && isEmailValid;
  
        // display next section if inputs are valid
        if ( isContactSectionValid) {

          // display next section
          finishButton.style.display="none";
          document.querySelector('#overviewCollapse').style.display = 'block';
        }
      } else{
            // display next section
          finishButton.style.display="none";
          document.querySelector('#overviewCollapse').style.display = 'block';
      }

      window.location = "/bookings/createbookings/#overviewCollapse"  
      bookingOverview.textContent = "You have selected a booking on " + datePicker.value + ", from " + startTime.value + " to " + endTime.value +
                                    ", table for " + noOfPersons.value  + " persons."    
                                    
       //update overview every time another table is selected before submit
       tableSelect.addEventListener("change", () => {

        bookingOverview.textContent = "You have selected a booking on " + datePicker.value + ", from " + startTime.value + " to " + endTime.value +
        ", table for " + noOfPersons.value + " persons."

      })                
    })


   
  }
  
});


      // --------------------------ADD EVENT LISTENERS FOR NUMBER INPUT BUTTONS--------------------------
      additionButton.addEventListener('click', () => {
        personsNumber.stepDown();
      })
  
      substractionButton.addEventListener('click', () => {
        personsNumber.stepUp()
  
      })
  
      const isRequired = value => value === '' ? false : true;
  
      const isBetween = (length, min, max) => length < min || length > max ? false : true;
  
  
       // --------------------------CHECK IF START TIME IS AFTER CURRENT TIME FOR TODAY BOOKINGS--------------------------
      const isStartTimeTodayValid = (startTime) => {
  
  
        // get input value date 
        var inputDate = new Date(datePicker.value);
        inputDate.setHours(0,0,0,0);
  
        // get current day
        var today = new Date();
        today.setHours(0,0,0,0);
  
        if( inputDate.getTime() == today.getTime() ){
  
          // get system local time
          var d = new Date();
          var m = d.getMinutes();
          var h = d.getHours();
          if(h == '0') {h = 24}
  
          var currentTime = h+":"+m;
  
  
          if(startTime <= currentTime)
            return false
          else
            return true  
        }
        else
          return true
      }
  
      // --------------------------CHECK IF END TIME IS GREATER THAN START TIME--------------------------
      const isTimeIntervalValid = (startTime, endTime) => {
        if(startTime >= endTime)
          return false
        else
          return true  
      }
  
      // --------------------------CHECK IF BOOKING TIME IS GREATER THAN 60 MIN--------------------------
      const isTimeIntervalCorrect = (startTime, endTime) => {
        let startInMinutes =(parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1])) 
        let endInMinutes =(parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1])) 
        let diffInMin = endInMinutes - startInMinutes
        if( diffInMin < 60 )
          return false
        else
          return true  
      }
  
      // --------------------------DISPLAY ERROR--------------------------
      const showError = (input, message) => {
          // get the form-field element
          const formField = input.parentElement;
  
          // show the error message
          const error = formField.querySelector('small');
          error.textContent = message;
      };
  
      // --------------------------HIDE ERROR--------------------------
      const showSuccess = (input) => {
        // get the form-field element
        const formField = input.parentElement;
  
        // hide the error message
        const error = formField.querySelector('small');
        error.textContent = '';
      }
  
      // --------------------------CHECK DATE AND SET ERROR MESSAGES--------------------------
      const checkDate = () => {
  
        let valid = false;
  
        const date = datePicker.value.trim();
  
        if (!isRequired(date)) {
            showError(datePicker, 'Please choose a date');
        } else {
            showSuccess(datePicker);
            valid = true;
        }
        return valid;
      } 
  
      // --------------------------CHECK START TIME AND SET ERROR MESSAGES--------------------------
      const checkStartTime = () => {
  
        var currentTime = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
  
        let valid = false;
  
        const time = startTime.value.trim();
  
        if (!isRequired(time)) {
            showError(startTime, 'Please choose a start time');
        } else if(!isBetween(time, "09:00", "23:00")){
            showError(startTime, 'Choose a time between 09:00 and 23:00');
        } else if (!isStartTimeTodayValid(time)){
            showError(startTime, 'Please choose a time after ' + currentTime);
        } else
        {
            showSuccess(startTime);
            valid = true;
        }
        return valid;
      } 
  
      // --------------------------CHECK END TIME AND SET ERROR MESSAGES--------------------------
      const checkEndTime = () => {
  
        let valid = false;
  
        const start = startTime.value.trim();
        const end = endTime.value.trim();
  
        if (!isRequired(end)) {
            showError(endTime, 'Please choose an end time');
        } else if(!isBetween(end, "10:00", "24:00")){
            showError(endTime, 'Choose a time between 10:00 and 24:00');
        } else if (!isTimeIntervalValid(start, end)){
            showError(endTime, 'End hour must be grater than start hour');
        } else if(!isTimeIntervalCorrect(start, end)){
          showError(endTime, 'Booking must be for at least an hour');
        }else
        {
            showSuccess(endTime);
            valid = true;
        }
        return valid;
      } 
  
  
      // -------------------------CHECK FIRST BOOKING SECTION VALIDITY --------------------------
      findTableButton.addEventListener("click", () => {
  
        let isdateValid = checkDate();
        let isStartValid = checkStartTime();
        let isEndValid = checkEndTime();
  
  
        let isInputsSection = isdateValid &&
            isStartValid &&
            isEndValid;
  
  
        // display next section if inputs are valid
        if (isInputsSection) {
          console.log("VALID")
          datePicker.disabled = true;
          startTime.disabled = true;
          endTime.disabled = true;
          personsNumber.disabled = true;
          additionButton.disabled = true;
          substractionButton.disabled = true;
          findTableButton.style.display = "none";
          document.querySelector('#tableContentCollapse').style.display = 'block';
  
        }
      })
  
      // -------------------------CHECK SECOND BOOKING SECTION VALIDITY --------------------------
      continueButton.addEventListener("click", () => {
  
          // check validity
  
  
          // display next section
          continueButton.style.display="none";  
          document.querySelector('#bookingContactCollapse').style.display = 'block';
  
      })
  
      // -------------------------CHECK THIRD BOOKING SECTION VALIDITY --------------------------
      finishButton.addEventListener("click", () => {
  
        // check validity
  
  
        // display next section
        finishButton.style.display="none";
        document.querySelector('#bookingDetails').style.display = 'none';
        document.querySelector('#tableContentCollapse').style.display = 'none';
        document.querySelector('#bookingContactCollapse').style.display = 'none';
        document.querySelector('#overviewCollapse').style.display = 'block';
  
      })
  
