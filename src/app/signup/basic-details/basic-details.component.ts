import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent {
  BasicDetails:any={};
  ProfileCreatedFor :'';
  GenderSelected :any;
  id: any;
  userProfile: any;
  userId: any | null;
  userids: any | null;
  step2:any;
  constructor(private router: Router , private appService: AppService,) {
    
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
    // console.log( this.BasicDetails);
   }
 
  //  ngOnInit() {
  //   this.userId = localStorage.getItem('userId');
  //   const id = parseInt(this.userId, 10); 
  //   if (id) {
  //     this.appService.getSingleUser(id).subscribe((user: any) => {
  //       this.userProfile = user;
  //       console.log("user:", this.userProfile);
  //     });
  //   }
  // }
  
  async update() {
    const userId = localStorage.getItem('LoginId');
    const userids = localStorage.getItem("userId");
    if (userId) {
      this.userId = userId.replace(/"/g, '');
    }
    else if(userids){
      this.userId = userids.replace(/"/g, '');
    }
        
    console.log("2nddata:", this.BasicDetails, this.userId);
  
    if (this.userId) {
      const update_user = {
        profileCreated: this.BasicDetails.ProfileCreatedFor,
        gender: this.BasicDetails.GenderSelected,
        step2: true,
    };
      this.appService.updateUser(this.userId, update_user).subscribe(res => {
        // console.log("updated:", res);
        this.router.navigate(['Personal-Details']);
      }, (error: any) => {
        console.error("updte",error);
      });
    } else {
      console.error("userId is null");
    }
  }
  
  
  gotoSignupSecondPage(){
    // console.log(this.BasicDetails);
    this.update()
    // console.log("calling:" , this.update())
    // localStorage.setItem('BasicDetails', JSON.stringify(this.BasicDetails))
    // console.log(JSON.parse(localStorage.getItem('BasicDetails') as string))
    // 

}     

}
