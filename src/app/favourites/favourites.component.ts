import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';
import { User } from '../models/user.modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent extends UnsubscribeHandelr implements OnInit {
  environment = environment;

  constructor(private router: Router,
    private appService: AppService, private toasterservice: ToastrService,) {

    super()
  }

  ngOnInit(): void {
    this.getfavlist();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  personList: any = [];
  pathmessage: string = "../../assets/message.png";
  pathheart: string = "../../assets/pinkheart.png";


  personList2 = [{
    name: "Raffy",
    age: 20,
    gender: "male",
    color: "white",
    city: "lahore",
    caste: "y",
    height: 5.2,
    professional: "developer",
    appearance: "good",
  },
  {
    name: "Murtaza",
    age: 23,
    gender: "male",
    color: "white",
    city: "islamabad",
    caste: "y",
    height: 5.2,
    professional: "technician",
    appearance: "not bad",
  },
  {
    name: "Ali",
    age: 24,
    gender: "male",
    color: "white",
    city: "sailkot",
    caste: "y",
    height: 5.3,
    professional: "front",
    appearance: "bsml",
  },
  {
    name: "Sherjeel",
    age: 19,
    gender: "male",
    color: "white",
    city: "lahore",
    caste: "y",
    height: 5.2,
    professional: "devel",
    appearance: "enough",

  }
  ]

  gotoInterests() {
    this.router.navigate(['Interests']);
  }

  AddtoFavClick(person: User) {
    this.appService.AddRemoveFavourite(this.CurrentUser._id, person._id)
      .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
        this.toasterservice.success("Person has been added to Favourites Successfully!");
        this.getfavlist()
      })
  }

  gotoProfile(person: User) {
    localStorage.setItem(LocalStorageItem.SELECTED_PROFILE, JSON.stringify(person));
    this.router.navigate(['Profile']);
  }

  getfavlist() {
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if (loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
      this.appService.getfav(this.CurrentUser._id).pipe(
        takeUntil(this.Unsubscribe$))
        .subscribe((persons: Array<User>) => {
          this.personList = persons;
          console.warn(this.personList)
          // console.warn(this.personList)
          // console.warn(this.personList)
          if (this.personList.length > 0) {
            this.toasterservice.success(`Record Found Successfully!`);
          }
          else {
            this.toasterservice.error("NO RECORD FOUND!");
          }
        }
        );
    }
  }
}
