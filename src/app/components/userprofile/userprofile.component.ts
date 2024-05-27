import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Observable, observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

 // profileDetails: any; // Define profileDetails variable to store fetched profile details
  // loggedUser: string; // Define loggedUser variable to store the logged-in user's name
  // user: any = {}; // Define user object to store profile update form data
  temp: boolean = false;


   profileDetails : Observable<User[]> | undefined;
  user: User = new User;
  msg = ' ';
  currRole = '';
   loggedUser = '';
  // temp = false;

  constructor(private _service: UserService, private activatedRoute: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    $("#profilecard").show();
    $("#profileform").hide();
    this.getProfileDetails(this.loggedUser);
  }

  editProfile()
  {
    $("#profilecard").hide();
    $("#profileform").show();
    this.getProfileDetails(this.user.email);
  }

  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);

    
    // this._service.getProfileDetails(loggedUser).subscribe(
    //   (data: any) => {
    //     this.profileDetails = data; // Assign fetched profile details to profileDetails variable
    //   },
    //   (error: any) => {
    //     console.error('Error fetching profile details:', error);
    //   }
    // );


    // this._service.getProfileDetails(loggedUser).subscribe((data: any) => {
    //   this.user = data; // Assign fetched user data to the user object
    //   console.log(this.user); // Check the fetched user data in console
    // });
  }

  updateUserProfile()
  {
    this._service.UpdateUserProfile(this.user).subscribe(
      data => {
        console.log("UserProfile Updated succesfully");
        this.msg = "Profile Updated Successfully !!!";
        $(".editbtn").hide();
        $("#message").show();
        this.temp = true;
        $("#profilecard").show();
        $("#profileform").hide();
        setTimeout(() => {
            this._router.navigate(['/userdashboard']);
          }, 6000);
      },
      error => {
        console.log("Profile Updation Failed");
        console.log(error.error);
        this.msg = "Profile Updation Failed !!!";
      }
    )
  }


}
