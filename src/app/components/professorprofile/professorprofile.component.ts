import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  profileDetails: Observable<Professor[]> | undefined;
  professor: Professor = new Professor();
  msg = '';
  currRole = '';
  loggedUser = '';
  temp = false;
  selectedFile: File | null = null;
  imageData: string = '';
  editingProfile: boolean = false;

  constructor(private professorService: ProfessorService, private _http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    this.showProfileCard();
    this.getProfileDetails(this.loggedUser);
    this.loadProfileImage();
  }

  showProfileCard(): void {
    $("#profilecard").show();
    $("#profileform").hide();
  }

  showProfileForm(): void {
    $("#profilecard").hide();
    $("#profileform").show();
  }

  editProfile(): void {
    this.showProfileForm();
    this.professor.email = this.loggedUser;
    this.getProfileDetails(this.professor.email);
  }

  getProfileDetails(loggedUser: string): void {
    this.profileDetails = this.professorService.getProfileDetails(loggedUser);
    this.profileDetails.subscribe(profiles => {
      if (profiles.length > 0) {
        this.professor = profiles[0];
      }
    });
  }

  updateProfessorProfile(): void {
    if (this.professor.email) {
      this.professorService.UpdateUserProfile(this.professor).subscribe(
        data => {
          console.log("Professor Profile Updated successfully");
          this.msg = "Profile Updated Successfully !!!";
          this.temp = true;
          this.showProfileCard();
          $("#message").show();
          setTimeout(() => this.router.navigate(['/professordashboard']), 6000);
        },
        (        error: any) => {
          console.error("Profile Update Failed", error);
          this.msg = "Profile Update Failed !!!";
        }
      );
    }
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

      this.userService.postimage(email, formData).subscribe(
        () => {
          alert("Profile image uploaded successfully");
          console.log("Profile image uploaded successfully");
          this.msg = "Profile Updated Successfully !!!";
          this.temp = true;
          this.showProfileCard();
          $("#message").show();
          setTimeout(() => this.router.navigate(['/userdashboard']), 6000);
        },
        error => {
          alert("Profile image upload failed");
          console.error("Profile image upload failed", error);
          this.msg = "Profile Image Upload Failed !!!";
        }
      );
    }
  }

  loadProfileImage(): void {
    const userEmail = this.loggedUser;
    this._http.get(`http://localhost:8080/profile/getprofile/${userEmail}`, { responseType: 'blob' })
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