import { ComponentFixture, TestBed } from '@angular/core/testing';

import { resetProfessorpasswordComponent } from './resetProfessorpassword.component';

describe('FullcourseComponent', () => {

  let component: resetProfessorpasswordComponent;
  let fixture: ComponentFixture<resetProfessorpasswordComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ resetProfessorpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(resetProfessorpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
