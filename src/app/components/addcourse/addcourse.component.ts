import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ProfessorService } from 'src/app/services/professor.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course = new Course();
  msg = ' ';
  minDate="";

  constructor(private _professorService: ProfessorService, private _router: Router) { }

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate());
    this.minDate = tomorrow.toISOString().split('T')[0];
    $("#websitelink, #youtubelink, #drivelink").css("display","none");
    $("#websitelink").hide();
    
    $("select").on('change', function() {
      $(this).find("option:selected").each(function() {
          var option = $(this).attr("value");
          if(option === "Website") {
            $("#websitelink").css("display","block");
            $("#youtubelink, #drivelink").css("display","none");
          } 
          else if(option === "Youtube") {
            $("#youtubelink").css("display","block");
            $("#websitelink, #drivelink").css("display","none");
          }
          else if(option === "GoogleDrive") {
            $("#drivelink").css("display","block");
            $("#websitelink, #youtubelink").css("display","none");

          
          }
      });
    }).change();
  }

  addCourse(): void {
    this._professorService.addCourse(this.course).subscribe(
      data => {
        console.log("Course added Successfully !!!");
        this._router.navigate(['/addchapter']);
      },
      error => {
        console.log("Process Failed");
        console.log(error.error);
        this.msg = "Course with " + this.course.coursename + " already exists !!!";
      }
    )
  }
}
