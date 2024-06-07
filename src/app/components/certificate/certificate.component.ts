import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  loggedUser = '';
  course="";
  user="";
   today = new Date();
  constructor() { }

  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    console.log(this.loggedUser,"loggeduser");

    this.loggedUser = this.loggedUser.replace(/"/g, '');
    

  }

  // participantName: string = 'John Doe';
  courseName: string = 'Angular Basics';
 
  // generateCertificate(): void {
   


  //   const doc = new jsPDF();
  //   console.log("logged",this.loggedUser.split("@"));
  //   this.user= this.loggedUser.split("@")[0];
    

  //   const logo = new Image();
  //   logo.src = 'assets/img/logo1.jpeg'; // Path to your company logo image
  //   doc.addImage(logo, 'PNG', 10, 10, 50, 20);

  //   const certificateContent = `
  //   \n\n\n\n\nCertificate of Completion\n\n
  //   This is to certify that ${this.user} has successfully completed the course \n on ${this.courseName}.\n\n
  //   Date: ${this.today}
  // `;



  //   const signature = new Image();
  //   signature.src = 'assets/img/sign1.jpg'; // Path to CEO signature image
  //   doc.addImage(signature, 'PNG', 110, 150, 40, 20); // Adjust position and size as needed
  //   doc.text('Nikhileshwar Kshirsagar\nCEO,\n Quantumsoft technologies private limited', 103, 180);



  // doc.text(certificateContent, 10, 10);
  //   doc.save('certificate.pdf');
  // }



generateCertificate(): void {
   


  const doc = new jsPDF();
  console.log("logged",this.loggedUser.split("@"));
  this.user= this.loggedUser.split("@")[0];
  

  const logo = new Image();
  logo.src = 'assets/img/logo1.jpeg'; // Path to your company logo image
  doc.addImage(logo, 'PNG', 10, 10, 50, 20);

  const certificateContent = `
  \n\n\n\n\nCertificate of Completion\n\n
  This is to certify that ${this.user} has successfully completed the course \n on ${this.courseName}.\n\n
  Date: ${this.today}
`;



  const signature = new Image();
  signature.src = 'assets/img/sign1.jpg'; // Path to CEO signature image
  doc.addImage(signature, 'PNG', 110, 150, 40, 20); // Adjust position and size as needed
  doc.text('Nikhileshwar Kshirsagar\nCEO,\n Quantumsoft technologies private limited', 103, 180);



doc.text(certificateContent, 10, 10);
  doc.save('certificate.pdf');
}

}





// document.addEventListener('DOMContentLoaded', function() {
//   // Assuming you have some event listener for certificate completion
//   const certificateCompletionHandler = (courseId: string) => {
//       const course = document.querySelector(`.course[data-course-id="${courseId}"]`);
//       if (course) {
//           const courseName = course.textContent;
//           console.log(`Completed course: ${courseName}`);
//           // Now you have the course name, you can do whatever you want with it (e.g., display in a modal, send to the server, etc.)
//       } else {
//           console.error(`Course with ID ${courseId} not found.`);
//       }
//   };

//   // Example event listener for certificate completion, assuming courseId is passed when the certificate is completed
//   // Replace this with your actual event listener
//   document.addEventListener('certificateCompleted', function(event: CustomEvent<{ courseId: string }>) {
//       const courseId = event.detail.courseId;
//       certificateCompletionHandler(courseId);
//   });
// });
