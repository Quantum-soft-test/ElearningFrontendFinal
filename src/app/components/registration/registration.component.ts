import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { User } from 'src/app/models/user';
import { ProfessorService } from 'src/app/services/professor.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  professor = new Professor();
  msg = ' ';
  termsAndConditionsChecked: boolean = false;

  userRegistrationAlertShown = false;
  professorRegistrationAlertShown = false;
  isuseremailVal=false;

  constructor(private _registrationService : RegistrationService, private _professorService : ProfessorService, private _router : Router) { }

  ngOnInit(): void 
  {
    $(".nav1").addClass("highlight1")
    $("#home-tab").click(function(){
      $("#profile").hide();
      $("#home").show();
      $(".nav1").addClass("highlight1")
      $(".nav2").removeClass("highlight2")
    });
    $("#profile-tab").click(function(){
      $("#home").hide();
      $("#profile").show();
      $(".nav2").addClass("highlight2")
      $(".nav1").removeClass("highlight1")
    });
  }

  showAlert(message: string): void {
    if (!this.userRegistrationAlertShown && !this.professorRegistrationAlertShown) {
      alert(message);
      this.userRegistrationAlertShown = true;
      this.professorRegistrationAlertShown = true;
    }
  }

  isPasswordValid1(password:string) {
    password = this.user.password;
   const minLength = 6;
   const minUpperCase = 1;
   const minLowerCase = 1;
   const minNumbers = 1;
   const minSpecialChars = 1;
   const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
   const upperCaseMatches = password.match(/[A-Z]/g);
   const lowerCaseMatches = password.match(/[a-z]/g);
   const numberMatches = password.match(/[0-9]/g);
   const specialCharMatches = password.match(specialCharsRegex);



   if (password == null) {
     return false;
   }
   
   // Check length
   else if (password.length < minLength) {
     console.log("invalid password  min lenght");
    

     return false;
   }else
 
   // Check uppercase letters
   if (!upperCaseMatches || upperCaseMatches.length < minUpperCase) {
     console.log("invalid password uppercase");
     

     return false;
   }else
 
   // Check lowercase letters
   if (!lowerCaseMatches || lowerCaseMatches.length < minLowerCase) {
     console.log("invalid password llowercase");
   

     return false;
   }else 
   if (!numberMatches || numberMatches.length < minNumbers) {
     console.log("invalid password number");
    

     return false;
   }else if (!specialCharMatches || specialCharMatches.length < minSpecialChars) {
     console.log("invalid password . soecial ca=har");
     return false;
   }else{
    return true;
   }
 
   // If all checks pass, return true
   
 }
 showAlert1(message: string): void {
  if (!this.isuseremailVal) {
    alert(message);
    this.isuseremailVal=true;
  }
}
 registerUser(): void {
  if (!this.termsAndConditionsChecked) {
   this.showAlert("Please agree to the terms and conditions to register");
    console.log('Please agree to the terms and conditions to register.');
   
  }
  
 else if (!this.isPasswordValid1(this.user.password)) {
  this.showAlert("Please enter valid password");
    console.log('Please enter valid password.');
    
  }else if (!this.isuseremailValid()) {
    this.showAlert1("Enter all details");
    console.log('Please enter all details.');
    
  }else{

  this._registrationService.registerUserFromRemote(this.user).subscribe(
    data => {
      console.log("Registration Success");
      sessionStorage.setItem("doctorname", this.user.username);
      sessionStorage.setItem("gender", this.user.gender);
      this._router.navigate(['/registrationsuccess']);
    },
    error => {
      console.log("Registration Failed");
      console.log(error.error);
      this.msg = "User with " + this.user.email + " already exists.";
    }
  );
  console.log('User registered successfully!');
}
}

   
  
    isuseremailValid() {
      if (!this.user.username || !this.user.gender || !this.user.profession || !this.user.password || !this.user.email || !this.user.mobile || !this.user.address) {
        // Display error message to the user
       
        return false; // Prevent further execution
      }else{
        return true;
      }
    }
    isproffesoremailValid() {
      if (!this.professor.professorname || !this.professor.email || !this.professor.gender || !this.professor.mobile || !this.professor.password || !this.professor.institutionname || !this.professor.department || !this.professor.experience || !this.professor.degreecompleted) {
        // Display error message to the user
       return false;
         // Prevent further execution
      }else{
        return true;
      }
    }
  
    isPasswordValid(password:string) {
       password = this.professor.password;
      const minLength = 6;
      const minUpperCase = 1;
      const minLowerCase = 1;
      const minNumbers = 1;
      const minSpecialChars = 1;
      const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      const upperCaseMatches = password.match(/[A-Z]/g);
      const lowerCaseMatches = password.match(/[a-z]/g);
      const numberMatches = password.match(/[0-9]/g);
      const specialCharMatches = password.match(specialCharsRegex);



      
      if (password == null) {
        return false;
      }
      
      // Check length
      else if (password.length < minLength) {
        console.log("invalid password");
        //alert('Please enter a valid password.');

        return false;
      }
    
      // Check uppercase letters
     
      else if (!upperCaseMatches || upperCaseMatches.length < minUpperCase) {
        console.log("invalid password");
        //alert('Please enter a valid password.');

        return false;
      }
    
      // Check lowercase letters
      else  if (!lowerCaseMatches || lowerCaseMatches.length < minLowerCase) {
        console.log("invalid password");
        //alert('Please enter a valid password.');

        return false;
      }
    
      // Check numbers
      else if (!numberMatches || numberMatches.length < minNumbers) {
        console.log("invalid password");
       // alert('Please enter a valid password.');

        return false;
      }
    
      // Check special characters
      else if (!specialCharMatches || specialCharMatches.length < minSpecialChars) {
        console.log("invalid password");
        this.showAlert('Please enter a valid password.');
        return false;
      }else{
        return true;
      }
    
      // If all checks pass, return true
     
    }
  
    
    registerProfessor(): void {
      if (!this.termsAndConditionsChecked) {
        this.showAlert("Please agree to the terms and conditions to register");
        console.log('Please agree to the terms and conditions to register.');
        
      } else if (!this.isPasswordValid(this.professor.password)) {
        this.showAlert("Please enter a valid password");
        console.log('Please enter a valid password.');
      } else if (!this.isproffesoremailValid()) {
        this.showAlert1("Please enter all values");
        console.log('Please enter a valid professor email.');
      } else {
        this._registrationService.registerProfessorFromRemote(this.professor).subscribe(
          data => {
            console.log("Registration Success");
            sessionStorage.setItem("doctorname", this.professor.professorname);
            sessionStorage.setItem("gender", this.professor.gender);
            this._router.navigate(['/registrationsuccess']);
          },
          error => {
            console.log("Registration Failed");
            console.log(error.error);
            this.msg = "Professor with " + this.professor.email + " already exists.";
          }
        );
        console.log('User registered successfully!');
      }
}
}