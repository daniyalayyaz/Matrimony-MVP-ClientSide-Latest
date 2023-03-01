import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { takeUntil } from 'rxjs';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends UnsubscribeHandelr implements OnInit, AfterViewChecked {
  environment = environment;
  id = "";
  imageUrl = "";
  showDiv: boolean = true;
  base64 = "base64";
  viewToView = "";
  url =environment.url
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('fileInput') private fileInput: ElementRef;
  senderUrl: string;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  chatList = { members: [],messages: [{ message: "", name: "", sender: "",senderUser:"",profile:"" }] , _id: "" };

  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router) {
    super();
    this.route.paramMap.subscribe((params: any) => {
      this.id = params?.get("id") || "";
      console.log(this.id)
      this.appService.getAllChat(this.id).pipe(
        takeUntil(this.Unsubscribe$))
        .subscribe((users) => {
          console.log(users);
          this.chatList = users;
          console.log(this.chatList);
        })
    })

  }
  ngOnInit(): void {
    this.scrollToBottom();
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if (loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
    }
  }
  chat: string;
  postChat() {
    console.log(this.CurrentUser.image);
    let person = localStorage.getItem('person');
    if(person){
      var User = JSON.parse(person);
      console.log(User._id);
      console.log(User.name);
      
    }
    let description = "Sent You Message";
    this.notification(User,description);
    this.appService.postChat(this.chatList._id || "56cb91bdc3464f14678934ca", 
    this.CurrentUser.name, this.CurrentUser._id,this.CurrentUser.image, 
    this.chatList.members[1] || User._id, this.chat).pipe(
      takeUntil(this.Unsubscribe$))
      .subscribe((users) => {
        if (users._id) {
         
          this.route.paramMap.subscribe((params: any) => {
            this.id = params?.get("id") || "";
            console.log(this.id)
            this.appService.getAllChat(this.id).pipe(
              takeUntil(this.Unsubscribe$))
              .subscribe((users) => {

                this.chatList = users;
                this.chat = "";
                this.showDiv = true;
                this.imageUrl = "";
              })
          })
        }
        else {
          this.router.navigate(['Chat/' + users._id]);
          this.chat = "";
        }
      })
  }
  notification(userInfo:any,description:any){
    console.log(userInfo);
    let view = true;
    this.appService.notificationAdd(userInfo._id,this.CurrentUser,view,description).subscribe((res:any)=>{
      console.log(res);
    })
  }
  clickImage() {
    this.fileInput.nativeElement.click();
  }
  selectImage(event: any) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // this.chat = event.target.files[0];
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.chat = event.target.result;
        this.showDiv = false;
        console.log(event.target.result);
      }
    }
  }
  resetImage() {
    console.log("Reset Function");
    this.showDiv = true;
    this.imageUrl = "";
    this.chat = "";
  }
  viewImage(image: any) {
    console.log(image);
    Swal.fire({
      title: 'Image Preview',
      html:
        `<img src=${image} height="400" width="400"/>`,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonColor: "#e40707"
    })

  }
}
