import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-more-personal-details',
  templateUrl: './more-personal-details.component.html',
  styleUrls: ['./more-personal-details.component.css']
})
export class MorePersonalDetailsComponent  {
  MorePersonalDetails:any={}; 

  Looks:any = [];
  Complexion:any = [];
  height:any;
  inches:any;
  Build:any = [];
  hobbies:any;
  LooksSelect:any
  ComplexionSelect:any;
  buildSelect:any

  constructor(private router: Router,private appService:AppService) {
    if(localStorage.getItem('MorePersonalDetails') as string=='null') {
    this.Looks = JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Looks
    this.Complexion = JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Complexion
    this.height = JSON.parse(localStorage.getItem('MorePersonalDetails') as string).height
    this.Build = JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Build
    this.hobbies = JSON.parse(localStorage.getItem('MorePersonalDetails') as string).hobbies
    this.inches = JSON.parse(localStorage.getItem('MorePersonalDetails') as string).inches
    }
    else{
      this.Looks =localStorage.getItem('MorePersonalDetails') && JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Looks
      this.Complexion =localStorage.getItem('MorePersonalDetails') && JSON.parse(localStorage.getItem('MorePersonalDetails') as string).Complexion
      this.height =localStorage.getItem('MorePersonalDetails') && JSON.parse(localStorage.getItem('MorePersonalDetails') as string).height
      this.Build =localStorage.getItem('MorePersonalDetails') && JSON.parse(localStorage.getItem('MorePersonalDetails') as string).build
      this.hobbies =localStorage.getItem('MorePersonalDetails') && JSON.parse(localStorage.getItem('MorePersonalDetails') as string).hobbies
      this.inches = localStorage.getItem('MorePersonalDetails') &&JSON.parse(localStorage.getItem('MorePersonalDetails') as string).inches
      this.MorePersonalDetails ={
        Looks:this.Looks,
        Complexion:this.Complexion,
        height:this.height,
        build:this.Build,
        hobbies:this.hobbies,
        inches:this.inches
      }
    }
  }
  ngOnInit(): void {
    this.getBuild();
    this.getComplexion();
    this.getLooks();
  }
  eventonKey(event: any) {
   this.MorePersonalDetails[event.target.name]=event.target.value;
   console.log( this.MorePersonalDetails);
  }
  gotoSignupSecondPage(){
    this.router.navigate(['Personal-Details']);
}
gotoSignupFourthPage(){
  localStorage.setItem('MorePersonalDetails', JSON.stringify(this.MorePersonalDetails))
    console.log(JSON.parse(localStorage.getItem('MorePersonalDetails') as string))
  this.router.navigate(['Residential-Details']);
}
getLooks(){
  this.appService.getLooks().subscribe((res:any)=>{
      this.Looks = res;
      console.log(this.Looks);
      
  })
}
getBuild(){
  this.appService.getBuild().subscribe((res:any)=>{
    this.Build = res;
  })
}
getComplexion(){
  this.appService.getComplexion().subscribe((res:any)=>{
    this.Complexion = res;
  })
}
}
