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

  registerUser()
  {

   
      if (this.termsAndConditionsChecked) {
        this._registrationService.registerUserFromRemote(this.user).subscribe(
          data => {
            
            console.log("Registration Success");
            sessionStorage.setItem("username",this.user.username);
            sessionStorage.setItem("gender",this.user.gender);
            console.log(this.user);
            this._router.navigate(['/registrationsuccess']);
            
          },
          error => {
            console.log("Registration Failed");
            console.log(error.error);
            this.msg = "User with "+this.user.email+" already exists !!!";
          }
        )
        console.log('User registered successfully!');
      } else {
        console.log('Please agree to the terms and conditions to register.');
      }
    }
   
  

    validatePassword(password: string): boolean {
      const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{6,20}$/;
      return passwordRegex.test(password);
    }
  registerProfessor()
  {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!passwordRegex.test(this.professor.password)) {
      console.log('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }
  
    if (this.termsAndConditionsChecked  && !this.validatePassword(this.professor.password)) {
      this._registrationService.registerProfessorFromRemote(this.professor).subscribe(
        data => {
          console.log("Registration Success");
          sessionStorage.setItem("doctorname",this.professor.professorname);
          sessionStorage.setItem("gender",this.professor.gender);
          this._router.navigate(['/registrationsuccess']);
        },
        error => {
          console.log("Registration Failed");
          console.log(error.error);
          this.msg = "Professor with "+this.professor.email+" already exists !!!";
        }
      )
      console.log('User registered successfully!');
    } else {
      console.log('Please agree to the terms and conditions to register.');
    }
   
  }

}