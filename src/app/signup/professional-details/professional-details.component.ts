import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.css']
})
export class ProfessionalDetailsComponent implements OnInit {
  ProfessionalDetails:any={};
  ProfessionSelect: any;
  StatusSelect: any;
  AnyotherInfo:any;
  OtherInfo:any;
  Income:any;
  Institution:any;
  Qualification:any;
  Workplace:any;
  AlliedJobStatus:any;
  userId: any | null;
  step6:any;
  constructor(private router: Router , private appService: AppService,) {
    if(localStorage.getItem('ProfessionalDetails') as string=='null') {
    this.ProfessionSelect = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Profession
    this.StatusSelect = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).JobStatus
    this.AlliedJobStatus = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).AlliedJobStatus
    this.AnyotherInfo = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).AnyotherInfo 
    this.OtherInfo = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).OtherInfo 
    this.Income = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Income
    this.Institution = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Institution
    this.Qualification = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Qualification
    this.Workplace = JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Workplace
    }
    else{
      this.ProfessionSelect =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Profession
    this.StatusSelect =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).JobStatus
    this.AlliedJobStatus =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).AlliedJobStatus
    this.AnyotherInfo =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).AnyotherInfo 
    this.OtherInfo =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).OtherInfo 
    this.Income =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Income
    this.Institution =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Institution
    this.Qualification =localStorage.getItem('ProfessionalDetails') && JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Qualification
  this.ProfessionalDetails={
    Profession:this.ProfessionSelect,
    Status:this.StatusSelect,
    AlliedJob:this.AlliedJobStatus,
    AnyotherInfo:this.AnyotherInfo,
    OtherInfo:this.OtherInfo,
    Income :this.Income ,
    Institution:this.Institution,
    Qualification:this.Qualification
  }  
  }
  }
  ngOnInit(): void {
  }
qualifications=["Allergy", "Andrology", "Anesthesiology", "Cardiacsurgery", "Cardiology", "Community", "Dentistry", "Dermatology", "DiabetesandEndocrinology", "E.N.T", "Gastroenterology", "GeneralPractice", "GeneralSurgery", "Gynae/Obs", "Hepatology", "Medicine", "Nephrology", "Neurology", "Neurosurgery", "Nutrition", "Oncology", "Ophthalmology", "Orthopedics", "Paediatricsurgery", "Paediatrics", "Pathology", "Physiotherapy", "PlasticSurgery", "Psychiatry", "PsychologyPulmonology", "Radiology", "Rheumatology", "Urology"]

eventonKey(event: any) {
 this.ProfessionalDetails[event.target.name]=event.target.value;
 console.log( this.ProfessionalDetails);
}  

async update() {
  const userId = localStorage.getItem('LoginId');
  const userids = localStorage.getItem("userId");
  if (userId) {
    this.userId = userId.replace(/"/g, '');
  }
  else if(userids){
    this.userId = userids.replace(/"/g, '');
  }
      
  console.log("2nddata:", this.ProfessionalDetails, this.userId);

  if (this.userId) {
    const update_user = {
      professional: this.ProfessionalDetails.ProfessionSelect,
      jobStatus:this.ProfessionSelect.StatusSelect,
      professionalInfo:this.ProfessionSelect.AnyotherInfo,
      anotherqualification:this.ProfessionSelect.OtherInfo,
      workplace: this.ProfessionalDetails.Workplace,
      income: this.ProfessionalDetails.Income,
      institution: this.ProfessionalDetails.Institution,
      qualification: this.ProfessionalDetails.OtherInfo,
       specialties:this.ProfessionSelect.Qualification,
      step6: true,
  };
    this.appService.updateUser(this.userId, update_user).subscribe(res => {
      // console.log("updated:", res);
      this.router.navigate(['Family-Details']);
    }, (error: any) => {
      console.error("updte",error);
    });
  } else {
    console.error("userId is null");
  }
}
gotoSignupSeventhPage(){
  this.update()
  // localStorage.setItem('ProfessionalDetails', JSON.stringify(this.ProfessionalDetails))
  //   console.log(JSON.parse(localStorage.getItem('ProfessionalDetails') as string))
  //   this.router.navigate(['Family-Details']);
}
gotoSignupFourthPage(){
  this.router.navigate(['Residential-Details']);
}

}
