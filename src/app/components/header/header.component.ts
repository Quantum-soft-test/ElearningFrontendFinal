import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profileDetails : Observable<User[]> | undefined;
  loggedUser = '';
  currRole = '';
  title = '';

  constructor(private _service: UserService, activatedRoute: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
    }
    else if(this.currRole === "professor"){
      this.title = "";
    }
    else if(this.currRole === "user"){
      this.title = "";
    }
  }

    // else if(this.currRole === "Home"){
    //   this.title = "";


    // else if (this.currRole === "welcomepage")
    // {
    //   this.title = "";
    // }
    
    confirmLogout(): void{
      const userConfirmed = window.confirm("Are you sure you want to log out?");
      if (userConfirmed) {
        this.logout();
      }
    }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  navigateHome()
  {
    if(this.loggedUser === "admin@gmail.com"){
      this._router.navigate(['/admindashboard']);
    
    }
    else if(this.currRole === "professor"){
      this._router.navigate(['/professordashboard']);
    }
    else if(this.currRole === "user"){
      this._router.navigate(['/userdashboard']);
    }
  }
  
    getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);


    // else if (this.currRole === "welcompage")
    //    {
    //     this._router.navigate(['/userdashboard'])
    //   }

    // else if(this.currRole === "welcomepage")
    //   {
    //     this._router.navigate(['/professordashboard'])
    //   }

  }

}

