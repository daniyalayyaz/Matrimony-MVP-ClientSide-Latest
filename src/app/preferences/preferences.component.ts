import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

 
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent extends UnsubscribeHandelr implements OnInit {

  requestUpdate: any =[];
  activeTrue: any = true;
  activeFalse: any = false
  data: any;
  isMobile = 0; 
  DeleteAccount="Delete Account"

  showSucessMessage: any;
  serverErrorMessages: any;
  package: any = [];


  constructor(private router: Router,
    private toasterservice: ToastrService,
    private appService: AppService) {

    super()
  }
  public latestnews?: boolean;
  public featurestatus?: boolean;
  public numberstatus?: boolean;
  public lockGallery?: boolean;
  public Profilestatus?: boolean;
  public Activenotification?: boolean;


  ngOnInit(): void {
    this.numberstatus = false;
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if (loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
      //   case Gender.FEMALE:
      //     this.GetOnlineUsers(Gender.MALE);
      //     break;
      //   case Gender.MALE:
      //     this.GetOnlineUsers(Gender.FEMALE);
      //     break
      // }
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.checkstatus()
  }
  statuschange() {
    this.appService.statusupdatenotification(this.CurrentUser._id, this.latestnews, this.featurestatus, this.numberstatus, this.Profilestatus, this.Activenotification)
      .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
        console.log(response)

        const body = {
          email: this.CurrentUser.email,
          password: "2233"
        };
        this.appService.Login(body).pipe(takeUntil(this.Unsubscribe$)).subscribe(res => {
          console.warn(res.user)
          if (res.user) {
            localStorage.setItem(LocalStorageItem.LOGGED_USER, JSON.stringify(res.user));
            this.toasterservice.success("Status Updated Successfully!");

          }
        })
      })

  }
  public savenumber(value: boolean) {
    this.numberstatus = value;
    console.warn(this.numberstatus)
    this.statuschange()
  }

  public savefeature(value: boolean) {
    this.featurestatus = value;
    console.warn(this.numberstatus)
    this.statuschange()
  }

  public latestnewss(value: boolean) {
    this.latestnews = value;
    this.statuschange()
  }
  public Activenotificationbox(value: boolean) {
    this.Profilestatus = value;
    this.statuschange()
  }
  public Profilestatuss(value: boolean) {
    this.Profilestatus = value;
    this.statuschange()

  }

  checkstatus() {
    this.Activenotification = this.CurrentUser.Activenotification;
    this.latestnews = this.CurrentUser.latestnews
    this.featurestatus = this.CurrentUser.featurestatus;
    this.Profilestatus = this.CurrentUser.Profilestatus;
    this.numberstatus = this.CurrentUser.numberstatus;
    // console.warn(this.Profilestatus)
    this.getGalleryStatus();
    console.warn(this.numberstatus)
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    
    this.appService.updateUser(this.CurrentUser._id,form.value).subscribe(res => {
          localStorage.clear();
          this.toasterservice.info("Your Account Delete Request Sent To Admin");
          this.router.navigate(['loginPage']);
        },
  )
} 
  onSaveUsernameChanged(event:any){
    console.log(event.target.value);
    if(event.target.value = true){
      this.package.requestToDelete = this.activeFalse;
    }else
    this.package.requestToDelete = this.activeTrue;
  }
  // deleteUser(){
  //   this.package.active = this.activeTrue;
  //    this.appService.userSentDeleteAccountrequestToAdmin(this.CurrentUser._id,this.package.active).subscribe(res => {
  //         localStorage.clear();
  //         this.toasterservice.info("Your Account Deleted.");
  //         this.router.navigate(['loginPage']);
  //       },
  // )}
  lockMyGallery(value: boolean){
    this.lockGallery = value;
    console.log(value);
    console.log(this.CurrentUser._id);
    const data = {
      userId: this.CurrentUser._id,
      status: this.lockGallery
    }
    this.appService.lockGallery(data).subscribe((res:any)=>{
      console.log(res);
      
    })
  };
  getGalleryStatus(){
    this.appService.getGallaryImage(this.CurrentUser._id).subscribe((res: any)=>{
      console.log(res);
      this.lockGallery = res.private;
    })
  }
}
