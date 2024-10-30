import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRegisterModalComponent } from './applicant-register-modal.component';

describe('ApplicantRegisterModalComponent', () => {
  let component: ApplicantRegisterModalComponent;
  let fixture: ComponentFixture<ApplicantRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantRegisterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
