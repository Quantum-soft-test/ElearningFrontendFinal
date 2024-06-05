import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
   selectedFile: File | null = null;
   profileImage$: Observable<Blob> | undefined;
   email = this.user.email;
   imageData: string = '';
 
  editingProfile: boolean = false; // Initialize editingProfile flag
   
   profileImageURL: string | undefined;
   // temp = false;

  constructor(private _service: UserService, private http: HttpClient,private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer,private _router : Router) { }

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
    this.getProfileDetails(this.user.email);
    console.log(this.user);
  }

  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);
    console.log(this.user);

    
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
      console.log(this.user.email);
      this._service.postimage(email, formData).subscribe(
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
          console.log("emailid"+this.user.email);
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
//----------------------------------------------------------------------------------------
  // loadProfileImage(): void {
  //   const userEmail = this.loggedUser; // Set the user email here
  //   this.http.get<string>(`http://localhost:8080/profile/getprofile/${userEmail}`, { responseType: 'text' as 'json' })
  //     .subscribe(
  //       data => {
  //         this.imageData = data;
  //       },
  //       error => {
  //         console.error('Error fetching image:', error);
  //       }
  //     );
  //    }
   //------------------------------------------------------------------------------------ 

//   getImage(email:string): void {
//     this._service.getImageData(email).subscribe(
//       (data) => {
//         this.profileDetails = data;
//         // Extract profile image URL
//         this.profileImageURL = data.profileImage.imageData; // Assuming 'profileImage' contains the image data
//       },
//       (error) => {
//         console.error('Error fetching profile details:', error);
//       }
//     );
//   }
// }

//---------------------------------------------------------------------------------------------
//     this._service.getImageData(email).subscribe(
//       data => {
//         this.imageData = this.createImageFromBlob(data);
//       },
//       error => {
//         console.log('Error fetching image:', error);
//       }
//     );
//   }

//   createImageFromBlob(image: Blob) {
//     let reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onloadend = () => {
//       return reader.result as string;
//     }
//   }
// }

