import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent{
  FamilyDetails:any={};
  BrotherCount:any;
  FatherOccupation:any;
  MotherOccupation:any;
  OtherFamilyInfo:any;
  SisterCount:any;
  SocioeconomicStatus:any;
  userId: any | null;
  step7:any;

  constructor(private router: Router , private appService: AppService) {
    if(localStorage.getItem('FamilyDetails') as string=='null') {
    this.SocioeconomicStatus =JSON.parse(localStorage.getItem('FamilyDetails') as string).SocioeconomicStatus
    this.SisterCount = JSON.parse(localStorage.getItem('FamilyDetails') as string).SisterCount
    this.OtherFamilyInfo = JSON.parse(localStorage.getItem('FamilyDetails') as string).OtherFamilyInfo
    this.MotherOccupation = JSON.parse(localStorage.getItem('FamilyDetails') as string).MotherOccupation
    this.FatherOccupation = JSON.parse(localStorage.getItem('FamilyDetails') as string).FatherOccupation
    this.BrotherCount = JSON.parse(localStorage.getItem('FamilyDetails') as string).BrotherCount
  }
  else{
    this.SocioeconomicStatus =localStorage.getItem('FamilyDetails') && JSON.parse(localStorage.getItem('FamilyDetails') as string).SocioeconomicStatus
    this.SisterCount =localStorage.getItem('FamilyDetails') && JSON.parse(localStorage.getItem('FamilyDetails') as string).SisterCount
    this.OtherFamilyInfo =localStorage.getItem('FamilyDetails') && JSON.parse(localStorage.getItem('FamilyDetails') as string).OtherFamilyInfo
    this.MotherOccupation =localStorage.getItem('FamilyDetails') && JSON.parse(localStorage.getItem('FamilyDetails') as string).MotherOccupation
    this.FatherOccupation =localStorage.getItem('FamilyDetails') && JSON.parse(localStorage.getItem('FamilyDetails') as string).FatherOccupation
    this.BrotherCount =localStorage.getItem('FamilyDetails') && JSON.parse(localStorage.getItem('FamilyDetails') as string).BrotherCount
  this.FamilyDetails={
    SocioeconomicStatus:this.SocioeconomicStatus,
    SisterCount:this.SisterCount,
    OtherFamilyInfo:this.OtherFamilyInfo,
    MotherOccupation:this.MotherOccupation,
    FatherOccupation:this.FatherOccupation,
    BrotherCount:this.BrotherCount
  }
  }
}
professions=["accountant", "actor", "actress", "air traffic controller", "architect", "artist", "attorney", "banker", "barber", "bookkeeper", "builder", "businessperson", "butcher", "carpenter", "cashier", "chef", "coach", "designer", "developer", "economist", "editor", "electrician", "engineer", "farmer", "filmmaker", "fisherman", "flight attendant", "jeweler", "judge", "lawyer", "mechanic", "musician", "painter", "pharmacist", "photographer", "pilot", "plumber", "police officer", "politician", "programmer", "receptionist", "salesperson", "singer", "teacher", "translator", "videographer", "waiter", "writer"]

eventonKey(event: any) {
 this.FamilyDetails[event.target.name]=event.target.value;
 console.log( this.FamilyDetails);
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
      
  console.log("2nddata:", this.FamilyDetails, this.userId);

  if (this.userId) {
    const update_user = {
      siblingsCountSisters: this.FamilyDetails.BrotherCount,
      fatherOccuption: this.FamilyDetails.FatherOccupation,
      motherOccuption: this.FamilyDetails.MotherOccupation,
      familyInfo: this.FamilyDetails.OtherFamilyInfo,
      siblingsCountBrothers: this.FamilyDetails.SisterCount,
      socialEconomic: this.FamilyDetails.SocioeconomicStatus,
      step7: true,
  };
    this.appService.updateUser(this.userId, update_user).subscribe(res => {
      // console.log("updated:", res);
      this.router.navigate(['Contact-Details']);
    }, (error: any) => {
      console.error("updte",error);
    });
  } else {
    console.error("userId is null");
  }
}
gotoSignupSeventhPage(){
  this.update()
  // localStorage.setItem('FamilyDetails', JSON.stringify(this.FamilyDetails))
  // console.log('Hi there!')
  //   this.router.navigate(['Contact-Details']);
}
gotoSignupFourthPage(){
  this.router.navigate(['Professional-Details']);
}

}
