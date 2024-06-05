import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users : Observable<User[]> | undefined;
  imageData: string = '';
  editingProfile: boolean = false; 
  loggedUser="";

  constructor(private _serive : UserService,private http: HttpClient) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');
    this.users = this._serive.getAllUsers();
  }


  loadProfileImage(): void {
    const userEmail = this.loggedUser;
    this.http.get(`http://localhost:8080/profile/getprofile/${userEmail}`, { responseType: 'blob' })
      .subscribe(
        response => this.createImageFromBlob(response),
        error => {
          console.error('Error fetching image:', error);
        }
      );
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageData = reader.result as string;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
