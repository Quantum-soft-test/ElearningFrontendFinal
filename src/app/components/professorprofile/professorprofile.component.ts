import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  
  selector: 'app-professorprofile',
  templateUrl: './professorprofile.component.html',
  styleUrls: ['./professorprofile.component.css']
})
export class ProfessorprofileComponent implements OnInit {
 
  profileDetails : Observable<Professor[]> | undefined;
  professor: Professor = new Professor;
  msg = ' ';
  currRole = '';
  loggedUser = '';
  temp = false;
   selectedFile: File | null = null;

  imageData: string = '';
  editingProfile: boolean = false; 
  

  constructor(private _service: ProfessorService,private http:HttpClient,private service:UserService, private activatedRoute: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    $("#profilecard").show();
    $("#profileform").hide();
    this.getProfileDetails(this.loggedUser);
    this.loadProfileImage();
  }

  editProfile()
  {
    $("#profilecard").hide();
    $("#profileform").show();
    this.getProfileDetails(this.professor.email);
  }

  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);
  }

  // getUserName(loggedUser : string)
  // {
  //   this.
  
  updateProfessorProfile()
  {
    this._service.UpdateUserProfile(this.professor).subscribe(
      data => {
        console.log("Professor Profile Updated succesfully");
        this.msg = "Profile Updated Successfully !!!";
        $(".editbtn").hide();
        $("#message").show();
        this.temp = true;
        $("#profilecard").show();
        $("#profileform").hide();
        setTimeout(() => {
            this._router.navigate(['/professordashboard']);
          }, 6000);
      },
      error => {
        console.log("Profile Updation Failed");
        console.log(error.error);
        this.msg = "Profile Updation Failed !!!";
      }
    )
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(email: string): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log(this.professor.email);
      this.service.postimage(email, formData).subscribe(
        data => {
          alert("Profile image uploaded successfully")
          console.log(email);
          console.log("Profile image uploaded successfully");
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
          alert("Profile image uploaded successfully")
          console.log("emailid"+this.professor.email);
          console.log("Profile image upload failed");
          console.log(error.error);
          this.msg = "Profile Image Upload Failed !!!";
        }
      );
    }
  }

  //--------------------------------------------------------------------------------------------
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


