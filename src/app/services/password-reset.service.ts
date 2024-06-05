import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const NAV_URL = environment.apiURL;
@Injectable({
  
  providedIn: 'root'
})
export class PasswordResetService {
  

  constructor(private http: HttpClient) { }

  resetPassword(email: string, newPassword: string): Observable<any> {
   //return this.http.post<any>(this.resetPasswordUrl+'/resetpassword', { email, newPassword });
   console.log(`${NAV_URL}/resetpassword/`+email+'/'+newPassword);
    return this.http.post<any>(`${NAV_URL}/resetpassword/`+email+'/'+newPassword,null);
  }

  resetProfPassword(email: string, newPassword: string): Observable<any> {
    //return this.http.post<any>(this.resetPasswordUrl+'/resetpassword', { email, newPassword });
    console.log(`${NAV_URL}/resetProfessorpassword/`+email+'/'+newPassword);
     return this.http.post<any>(`${NAV_URL}/resetProfessorpassword/`+email+'/'+newPassword,null);
   }
}


