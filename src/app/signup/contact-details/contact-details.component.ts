import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { takeUntil } from 'rxjs';
import { LocalStorageItem } from 'src/app/helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from 'src/app/helpers/unsubscribe-handler';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent extends UnsubscribeHandelr implements OnInit {
  ContactDetails:any={};
  Email:any;
  FacebookLink:any;
  InstaLink:any;
  ParentsPhone:any;
  Phone:any;
  TwitterLink:any;
loader:any;
  constructor(private router: Router, 
              private appService: AppService,
              private toasterservice: ToastrService
              ) {
                super()
    if(localStorage.getItem('ContactDetails') as string=='null') {
    this.Email= JSON.parse(localStorage.getItem('ContactDetails') as string).Email
    this.FacebookLink= JSON.parse(localStorage.getItem('ContactDetails') as string).FacebookLink
    this.InstaLink= JSON.parse(localStorage.getItem('ContactDetails') as string).InstaLink
    this.ParentsPhone= JSON.parse(localStorage.getItem('ContactDetails') as string).ParentsPhone
    this.Phone= JSON.parse(localStorage.getItem('ContactDetails') as string).Phone
    this.TwitterLink= JSON.parse(localStorage.getItem('ContactDetails') as string).TwitterLink
    }
    else{
      this.Email=localStorage.getItem('ContactDetails') && JSON.parse(localStorage.getItem('ContactDetails') as string).Email
      this.FacebookLink=localStorage.getItem('ContactDetails') && JSON.parse(localStorage.getItem('ContactDetails') as string).FacebookLink
      this.InstaLink=localStorage.getItem('ContactDetails') && JSON.parse(localStorage.getItem('ContactDetails') as string).InstaLink
      this.ParentsPhone=localStorage.getItem('ContactDetails') && JSON.parse(localStorage.getItem('ContactDetails') as string).ParentsPhone
      this.Phone=localStorage.getItem('ContactDetails') && JSON.parse(localStorage.getItem('ContactDetails') as string).Phone
      this.TwitterLink=localStorage.getItem('ContactDetails') && JSON.parse(localStorage.getItem('ContactDetails') as string).TwitterLink
      this.ContactDetails={Email:this.Email,FacebookLink:this.FacebookLink,InstaLink:this.InstaLink,ParentsPhone:this.ParentsPhone,Phone:this.Phone,TwitterLink:this.TwitterLink}
    }
  }
  ngOnInit(): void {

  }

  eventonKey(event: any) {
   this.ContactDetails[event.target.name]=event.target.value;
   console.log( this.ContactDetails);
  }

  RegisterUsers() {
    this.loader=true;
    const d = { 
      email: JSON.parse(localStorage.getItem('ContactDetails') as string).Email,
      personalContact: JSON.parse(localStorage.getItem('ContactDetails') as string).Phone,
      parentContact: JSON.parse(localStorage.getItem('ContactDetails') as string).ParentsPhone,
      socialLinkFb: JSON.parse(localStorage.getItem('ContactDetails') as string).FacebookLink,
      socialLinkInsta: JSON.parse(localStorage.getItem('ContactDetails') as string).InstaLink,
      socialLinkTwitter: JSON.parse(localStorage.getItem('ContactDetails') as string).TwitterLink,
      name: JSON.parse(localStorage.getItem('PersonalDetails') as string).name,
      profileCreated: JSON.parse(localStorage.getItem('BasicDetails') as string).ProfileCreatedFor,
      gender: JSON.parse(localStorage.getItem('BasicDetails') as string).GenderSelected,
      age: JSON.parse(localStorage.getItem('PersonalDetails') as string).age,
      status: JSON.parse(localStorage.getItem('PersonalDetails') as string).MartialStatus,
      religious:JSON.parse(localStorage.getItem('PersonalDetails') as string).Religious,
      otherreligion:JSON.parse(localStorage.getItem('PersonalDetails') as string).OtherReligion,
      sect:JSON.parse(localStorage.getItem('PersonalDetails') as string).sect,
      caste:JSON.parse(localStorage.getItem('PersonalDetails') as string).Caste,
      religiousStatus:JSON.parse(localStorage.getItem('PersonalDetails') as string).religiousStatus,
      clan:JSON.parse(localStorage.getItem('PersonalDetails') as string).Clan,
      montherTonque:JSON.parse(localStorage.getItem('PersonalDetails') as string).MotherTongue,
      looks:JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Looks,
      complexion:JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Complexion,
      height:JSON.parse(localStorage.getItem('MorePersonalDetails') as string).height,
      inches:JSON.parse(localStorage.getItem('MorePersonalDetails') as string).inches,

      build:JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Build,
      hobbies:JSON.parse(localStorage.getItem('MorePersonalDetails') as string).hobbies,
      country:JSON.parse(localStorage.getItem('ResidentialDetails') as string).Country,
      province:JSON.parse(localStorage.getItem('ResidentialDetails') as string).Province,
      city:JSON.parse(localStorage.getItem('ResidentialDetails') as string).City,
      house:JSON.parse(localStorage.getItem('ResidentialDetails') as string).HouseStatus,
      nationality:JSON.parse(localStorage.getItem('ResidentialDetails') as string).AnyOtherNationality,
      futurePlans:JSON.parse(localStorage.getItem('ResidentialDetails') as string).FuturePlanstoLiveIn,
      professional:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Profession,
      jobStatus:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).JobStatus,
      workplace:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Workplace,
      anotherqualification:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).AnyotherInfo,
      specialties:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Qualification,
      qualification:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).OtherInfo,
      institution:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Institution,
      income:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).Income,
      professionalInfo:JSON.parse(localStorage.getItem('ProfessionalDetails') as string).AnyotherInfo,
      fatherOccuption:JSON.parse(localStorage.getItem('FamilyDetails') as string).FatherOccupation,
      motherOccuption:JSON.parse(localStorage.getItem('FamilyDetails') as string).MotherOccupation,
      siblingsCountSisters:JSON.parse(localStorage.getItem('FamilyDetails') as string).SisterCount,
      siblingsCountBrothers:JSON.parse(localStorage.getItem('FamilyDetails') as string).BrotherCount,
      socialEconomic:JSON.parse(localStorage.getItem('FamilyDetails') as string).SocioeconomicStatus,
      familyInfo:JSON.parse(localStorage.getItem('FamilyDetails') as string).OtherFamilyInfo,
     }
     
     this.appService.createProfile(d).pipe(takeUntil(this.Unsubscribe$)).subscribe(res => {
      if (res.user) {
        localStorage.setItem(LocalStorageItem.LOGGED_USER, JSON.stringify(res.user));
        this.loader=false;
        this.toasterservice.success("Verification email has been sent to your provided email.");
        this.router.navigateByUrl(`preference`);
      }
     },error => {
      this.loader=false;
      this.toasterservice.error(error.error.error);

    },)
    //  this.router.navigateByUrl(`preference`);

  }
 
  SubmitDetails(){
    localStorage.setItem('ContactDetails', JSON.stringify(this.ContactDetails))
    this.RegisterUsers()
}
  gotoSignupFourthPage() {
    this.router.navigate(['Family-Details']);
  }

}
