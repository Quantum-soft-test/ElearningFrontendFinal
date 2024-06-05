import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { User } from 'src/app/models/user';
import { PasswordResetService } from 'src/app/services/password-reset.service';


@Component({
  selector: 'app-resetProfessorpassword',
  templateUrl: './resetProfessorpassword.component.html',
  styleUrls: ['./resetProfessorpassword.component.css']
})
export class resetProfessorpasswordComponent implements OnInit {

  user = new User();
  professor = new Professor();
  email= "";
  newPassword= "";
  message="";

  constructor(private passwordResetService: PasswordResetService,private activatedRoute: ActivatedRoute, private _router : Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  resetProfessorpassword() {
    this.passwordResetService.resetProfPassword(this.email, this.newPassword)
      .subscribe(
        response => {
          this.message = response.message;
          alert('Password changed successfully');
          console.log("PASSWORD CHNAGE SUCCESSFULLY");
          // Reset form fields
          this.email = '';
          this.newPassword = '';
          this.message = 'password changed successfully.';

          this._router.navigate(['/login']);
        },
        error => {
          console.error('Error occurred:', error);
          this.message = 'An error occurred while resetting the password.';
        }
      );
  }
}


