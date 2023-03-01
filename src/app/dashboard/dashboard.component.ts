import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { Gender } from '../enums/genders.enum';
import { RequestType } from '../enums/request.enum';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';
import { Message } from '../models/message.modal';
import { User } from '../models/user.modal';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends UnsubscribeHandelr implements OnInit {
  environment = environment;
  status = 1;
  chatList = [{ messages: [{ message: "", name: "", profile: "" }], _id: "" }];
  // chatList = { members: [],messages: [{ message: "", name: "", sender: "",senderUser:"",profile:"" }] , _id: "" };
  editAccess: Boolean = true;
  condition:any;
  checkbox: boolean;
  personList: Array<User> = [];
  messagesList: Array<Message>;
  pathfemale: string = "../../assets/female.png";
  pathmessage: string = "../../assets/message.png";
  pathheart: string = "../../assets/pinkheart.png";
  pathmale: string = "../../assets/male.png"
  public saveUsername?: boolean;
  public userId: any;
  userProfile: any;
  imageUrl: string;
  url = environment.url;
  connect: any;
  content: any;
  closeResult = '';
  data: any;
  imageUrlOnlineUsers: any = [];
  latestOnlineUser: any = [];
  fullUrl: any
  base64 = "data:image/";
  blockedUsers: any = [];
  GenderFilteer: any = []
  notificationCounter:any;
  packageNname: any;
  userPrefrences: any;
  expiryStatus: boolean;

  constructor(private router: Router,
    private toasterservice: ToastrService,
    private appService: AppService
  ) {
    super()
  }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.status == 1 ? 'red' : 'yellow';
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if (loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
      this.blockedUsers = this.CurrentUser.Block;
      this.GenderFilteer = this.CurrentUser.gender;
      this.SingleUser(JSON.parse(loggedUser));
      console.log(this.CurrentUser);
      // switch (this.CurrentUser.gender) {
      //   case Gender.FEMALE:
      //     this.GetOnlineUsers(Gender.MALE);
      //     break;
      //   case Gender.MALE:
      //     this.GetOnlineUsers(Gender.FEMALE);
      //     break
      // }
      this.GetOnlineUsers(); 
      this.checkstatus()
      this.getAllChat();
      this.getImage();
      this.showNotification();
      this.disableDashBoard();
      this.showPreferenceById();
      this.expiryStatus = this.checkPackageExpiry();
      console.log(this.expiryStatus);
      
    }
    this.messagesList = [
      {
        image: "https://bit.ly/3RzZK9J",
        name: "Cristina Rohmer",
        msg: "That was wonderful. Thanks..",
        time: "01.02.21",
      },
      {
        image: "https://bit.ly/3RzZK9J",
        name: "Cristina Rohmer",
        msg: "That was wonderful. Thanks..",
        time: "01.02.21",
      },
      {
        image: "https://bit.ly/3RzZK9J",
        name: "Cristina Rohmer",
        msg: "That was wonderful. Thanks..",
        time: "01.02.21",
      },
      {
        image: "https://bit.ly/3RzZK9J",
        name: "Cristina Rohmer",
        msg: "That was wonderful. Thanks..",
        time: "01.02.21",
      },
      {
        image: "https://bit.ly/3RzZK9J",
        name: "Cristina Rohmer",
        msg: "That was wonderful. Thanks..",
        time: "01.02.21",
      },

    ];
  }
  checkPackageExpiry(){
    const currentDate = Date.now()
    const expiryDate = moment(this.CurrentUser.packageExpiry, "YYYY-MM-DD");
    const calculation = expiryDate.valueOf();
    if(currentDate >= calculation)
    return true ;
    else
    return false
  }
  public topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  public GetOnlineUsers() {
    this.appService.onlineUser(this.CurrentUser._id).subscribe((persons: any) => {
        // this.personList = [];
        if(persons.length > 0){
          this.personList = persons.sort((a: any, b: any) => {
            if (a.package && !b.package) return -1;
            if (!a.package && b.package) return 1;
            return 0;
          });
          let filtered = this.personList.filter((user: any) => {
            if (!user._id?.includes(this.CurrentUser._id)) {
              return user;
            }
          });
          let filteredGender = filtered.filter((user: any) => {
            if (!this.GenderFilteer.includes(user.gender)) {
              return user;
            }
          });
          // this.personList = filteredGender;
          let filteredBlock = filteredGender.filter((user: any) => {
            if (!this.blockedUsers.includes(user._id)) {
              return user;
            }
          });
          let filteredBlokOtherSecondUser = filteredBlock.filter((user: any) => {
            if (user._id?.includes(user.Block)) {
              return user;
            }
          });
          this.personList = filteredBlokOtherSecondUser
          this.toasterservice.success(`User Loaded successfully`);  
          // this.personList = filteredGender
        }else{
          this.toasterservice.info("Match Not Found.")
        }
      }
      );
  }
  searchValue(searchValue: any) {
    throw new Error('Method not implemented.');
  }
  // public GetLatestUsers(gender: Gender) {
  //   this.appService.latest(gender).pipe(
  //     takeUntil(this.Unsubscribe$))
  //     .subscribe((persons: Array<User>) => {
  //       this.personList = [];
  //       this.personList = persons;
  //     }
  //     );
  // }
  checkstatus() {

    this.saveUsername = this.CurrentUser.LoginStatus
    // console.warn(this.saveUsername)

  }
  public onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;

    this.statuschange()
  }


  public onNearByClick() {
    this.appService.nearBy(this.CurrentUser)
      .subscribe((users:any) => {
        console.log(users);
        
        if(users.length > 0){
          this.personList = [];
          this.personList = users.sort((a: any, b: any) => {
            if (a.package && !b.package) return -1;
            if (!a.package && b.package) return 1;
            return 0;
          });
          let filtered = this.personList.filter((user: any) => {
            if (!user._id?.includes(this.CurrentUser._id)) {
              return user;
            }
          });
          // this.personList = filtered;
          let filteredBlock = filtered.filter((user: any) => {
            if (!this.blockedUsers.includes(user._id)) {
              return user;
            }
          });
          let filteredBlokOtherSecondUser = filteredBlock.filter((user: any) => {
            if (user._id?.includes(user.Block)) {
              return user;
            }
          });
          let filteredGender = filteredBlokOtherSecondUser.filter((user: any) => {
            if (!this.GenderFilteer.includes(user.gender)) {
              return user;
            }
          });
          this.personList = filteredGender
          this.toasterservice.success(`Users of ${this.CurrentUser.city} Loaded successfully`);
        }else{
          this.toasterservice.info("Match Not Found.")
        }
       

      });
  }
  // public () {
  //   this.appService.().pipe(
  //     takeUntil(this.Unsubscribe$))
  //     .subscribe((users: Array<User>) => {
  //       // this.toasterservice.success(`Users of ${this.CurrentUser.city} Loaded successfully`);
  //       this.personList = [];
  //       this.personList = users;
  //     })
  // }
  public latestByClick() {
    this.appService.latest(this.CurrentUser._id).subscribe((res: any) => {
      if(res){
        this.personList = [];
        this.personList = res.sort((a: any, b: any) => {
          if (a.package && !b.package) return -1;
          if (!a.package && b.package) return 1;
          return 0;
        });;
        let filtered = this.personList.filter((user: any) => {
          if (!user._id?.includes(this.CurrentUser._id)) {
            return user;
          }
        });
  
        let filteredBlock = filtered.filter((user: any) => {
          if (!this.blockedUsers.includes(user._id)) {
            return user;
          }
        });
        let filteredBlokOtherSecondUser = filteredBlock.filter((user: any) => {
          if (user._id?.includes(user.Block)) {
            return user;
          }
        });
        this.personList = filteredBlokOtherSecondUser.sort((a:any,b:any)=> {return -1}  );
        
 
        this.toasterservice.success(`Latest User Loaded successfully`);
      }else{
        this.toasterservice.info("Match Not Found.")
      }
    })
  }

  public getAllChat() {
    this.appService.getchat(this.CurrentUser._id).pipe(
      takeUntil(this.Unsubscribe$))
      .subscribe((users) => {

        this.chatList = users;
      })
  }
  public onOnlineClick() {
    // switch (this.CurrentUser.gender) {
      // case Gender.FEMALE:
        // this.GetOnlineUsers();
        // break;
      // case Gender.MALE:
        this.GetOnlineUsers();
        // break
    // }
  }

  options = [
    {
      icon: 'fa-solid fa-heart',
      text: "Favourites",
      color1: "#ED7E9E",
      color2: "#E33365",
      route: () => {
        this.router.navigate(['favourites']);
      }
    },
    {
      icon: 'fa-solid fa-tags',
      text: "Packages Screen",
      color1: "#4DADC4",
      color2: "#1A6679",
      route: () => {
        this.router.navigate(['Subscribe']);

      }
    },
    {
      icon: 'fa-brands fa-searchengin',
      text: "Match-Making",
      color1: "#4DC489",
      color2: "#1A7929",
      route: () => {
        this.router.navigate(['Matchmaking']);

      }
    },
    {
      icon: 'fa-solid fa-user',
      text: "Profile",
      color1: "#4D6DC4",
      color2: "#1A2579",
      route: () => {
        this.router.navigate(['Profile',this.CurrentUser._id]);

      }
    },
  ];

  optionCard = [
    {
      icon: 'fa-solid fa-search',
      text: "Search Profiles",
      color1: "#4DC489",
      color2: "#1A7929",
      route: () => {
        this.router.navigate(['Filter-Interest']);

      }

    },
    {
      icon: 'fa-solid fa-ban',
      text: "Blocked Users",
      color1: "#4D6DC4",
      color2: "#1A2579",
      route: () => {
        this.router.navigate(['BlockedUsers']);

      }
    },
    {
      icon: 'fa-solid fa-phone',
      text: "Contact Us",
      color1: "#A94DC4",
      color2: "#6B0F86",
      route: () => {
        this.router.navigate(['Contact-Us']);

      }
    },
    {
      icon: 'fa-solid fa-file',
      text: "Terms & Conditions",
      color1: "#E54848",
      color2: "#7C0E0E ",
      route: () => {
        this.router.navigate(['Terms-And-Conditions']);

      }

    },
  ];

  gotoProfile(person: User) {
    localStorage.setItem(LocalStorageItem.SELECTED_PROFILE, JSON.stringify(person));
    this.router.navigate(['Profile', person._id]);
  }

  gotoGallery() {
    this.router.navigate(['Gallery']);
  }
  gotoInterests() {
    this.router.navigate(['Interests']);
  }
  gotoEditProfile() {
    this.userId = localStorage.getItem('LoggedInUser');

    this.userId = JSON.parse(this.userId);
    this.router.navigate(['Edit-Profile', this.userId._id]);
    // this.router.navigate(['/setting/build-edit', id._id]);

  }
  getImage() {
    this.appService.getSingleUser(this.CurrentUser._id)
      .subscribe((data: any) => {
        const fullUrl = `${this.url}/${data.image}`
        this.imageUrl = data.image;
        
      }
      );
  }
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  gotoNotifications() {
    this.notificationCounter = 0;
    this.router.navigate(['Notifications']);
  }
  gotoPreferences() {
    this.router.navigate(['Preferences']);
  }
  gotoPhotos() {
    this.userId = localStorage.getItem('LoggedInUser');

    this.userId = JSON.parse(this.userId);
    this.router.navigate(['Edit-Photos',this.userId._id]);
  }
  letschat(person: any) {

    let id = person._id;
    
    if (this.connect >= 4) {
      const user = this.chatList.filter((x:any)=>{
        if(!x.members == id){
          this.connectsdecriment(this.CurrentUser,id);
        }}
        );
      this.appService.letschat(this.CurrentUser._id, id).pipe(takeUntil(this.Unsubscribe$)).subscribe((persons) => {
        this.connect = this.connect - 4;
        this.router.navigate(['Chat/' + persons._id]);
      })
    } else {
      this.router.navigate(['Subscribe']);
      this.toasterservice.error("Please Purchase Connects");
    }
    localStorage.setItem('person',JSON.stringify(person));
    localStorage.setItem("id", id);
    
  }
  gotoChat(id: any) {
    this.router.navigate(['Chat/' + id]);
  }
  onSendInterestClick(person: User) {
   if(this.expiryStatus){
    this.toasterservice.error("Please Update Your Package");
    return ;
   }
    if (this.connect >= 4) {
      let decscition = "Sent You intrest"
      this.notification(person,decscition);
      this.connectsdecriment(this.CurrentUser,person._id);
      this.appService.HandleRequest(this.CurrentUser._id, person._id, RequestType.SENDING)
        .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {

          this.toasterservice.success("Interest Sent Successfully!");
          this.connect = this.connect - 4;
        })
    } else {
      this.router.navigate(['Subscribe']);
      this.toasterservice.error("Please Purchase Connects");

    }
  };
  notification(userInfo:any,description:any){
    let view = true;
    this.appService.notificationAdd(userInfo._id,this.CurrentUser,view,description).subscribe((res:any)=>{
      
    })
  }
  connectsdecriment(data: any,id:any) {
    
    
    // if(this.chatList){
         
    // }else{
      this.appService.decrimentsInConnects(this.CurrentUser._id, data).subscribe((res: any) => {
      });
    // }
    
  };
  SingleUser(id: any) {
    this.appService.getSingleUser(id._id).subscribe((res: any) => {
      console.log(res.package);
      this.appService.getPackageById(res.package).subscribe((res:any)=>{
        console.log(res);
      this.connect = res.connect;
      this.packageNname = res.name;
      })
    })
  }


  AddtoFavClick(person: User) {
    this.appService.AddRemoveFavourite(this.CurrentUser._id, person._id)
      .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
        this.toasterservice.success("Person has been added to Favourites Successfully!");
      })
  }

  statuschange() {
    this.appService.Loginstatusupdate(this.CurrentUser._id, this.saveUsername)
      .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {

        const body = {
          email: this.CurrentUser.email,
          password: "2233"
        };
        this.appService.Login(body).pipe(takeUntil(this.Unsubscribe$)).subscribe(res => {
          // console.warn(res.user)

          if (res.user) {
            localStorage.setItem(LocalStorageItem.LOGGED_USER, JSON.stringify(res.user));
            this.toasterservice.success("Status Updated Successfully!");

          }
        })
      })
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['loginPage']);
  }
  showNotification(){
    this.appService.showNotificationById(this.CurrentUser._id).subscribe((res:any)=>{
      this.notificationCounter = res.length;
      if(res.length >= 1 ){
        this.toasterservice.info("You Have" +" "+ this.notificationCounter + " "+"Notification")
      }
    });
  }
  showPreferenceById(){
    this.appService.showPreferenceById(this.CurrentUser._id).subscribe((res:any)=>{
      console.log(res);
      this.userPrefrences = res;
      // this.notificationCounter = res.length;
      // if(res.length >= 1 ){
      //   this.toasterservice.info("You Have" +" "+ this.notificationCounter + " "+"Notification")
      // }
    });
  }
  disableDashBoard(){
    // let user;
    if (this.CurrentUser && this.CurrentUser.approve == null) {
      console.log("hello");
      this.condition = 'mydisable';
      this.editAccess = false;
    } else {
      console.log(this.editAccess);
    }
  }
}
