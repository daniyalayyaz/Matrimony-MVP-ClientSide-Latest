import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {
  BasicDetails:any={};

  ProfileCreatedFor :'';
  GenderSelected :any;
  constructor(private router: Router) {
    
   if(localStorage.getItem('BasicDetails') as string==='null') {
    this.ProfileCreatedFor =JSON.parse(localStorage.getItem('BasicDetails') as string).ProfileCreatedFor
   this.GenderSelected= JSON.parse(localStorage.getItem('BasicDetails') as string).GenderSelected
   }
   else{
    
    this.ProfileCreatedFor = localStorage.getItem('BasicDetails') && JSON.parse(localStorage.getItem('BasicDetails') as string).ProfileCreatedFor
    this.GenderSelected = localStorage.getItem('BasicDetails') && JSON.parse(localStorage.getItem('BasicDetails') as string).GenderSelected
    this.BasicDetails={ProfileCreatedFor: this.ProfileCreatedFor, GenderSelected: this.GenderSelected};
  
  }
  }

  eventonKey(event: any) {
    this.BasicDetails[event.target.name]=event.target.value;
    console.log( this.BasicDetails);
   }
  gotoSignupSecondPage(){
    console.log(this.BasicDetails);
    localStorage.setItem('BasicDetails', JSON.stringify(this.BasicDetails))
    console.log(JSON.parse(localStorage.getItem('BasicDetails') as string))
    this.router.navigate(['Personal-Details']);

}     

}
