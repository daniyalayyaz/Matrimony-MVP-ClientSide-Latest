import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterInterestComponent } from './filter-interest/filter-interest.component';
import { GalleryComponent } from './gallery/gallery.component';
import { InterestsComponent } from './interests/interests.component';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ProfileComponent } from './profile/profile.component';
import { BasicDetailsComponent } from './signup/basic-details/basic-details.component';
import { ContactDetailsComponent } from './signup/contact-details/contact-details.component';
import { FamilyDetailsComponent } from './signup/family-details/family-details.component';
import { MorePersonalDetailsComponent } from './signup/more-personal-details/more-personal-details.component';
import { PersonalDetailsComponent } from './signup/personal-details/personal-details.component';
import { ProfessionalDetailsComponent } from './signup/professional-details/professional-details.component';
import { ResidentialDetailsComponent } from './signup/residential-details/residential-details.component';
import { SubscribePackageComponent } from './subscribe-package/subscribe-package.component';
import { VerificationpageComponent } from './verificationpage/verificationpage.component';
import { ChangeemailComponent } from './Edit-Profile/changeemail/changeemail.component';
import { ChangepasswordComponent } from './Edit-Profile/changepassword/changepassword.component';
import { ChangephoneComponent } from './Edit-Profile/changephone/changephone.component';
import { ChangephotosComponent } from './Edit-Profile/changephotos/changephotos.component';
import { ChangeusernameComponent } from './Edit-Profile/changeusername/changeusername.component';
import { EditprofileComponent } from './Edit-Profile/editprofile/editprofile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LoginwithemailComponent } from './loginwithemail/loginwithemail.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TermsNconditionsComponent } from './terms-nconditions/terms-nconditions.component';
import { MatchmakingComponent } from './matchmaking/matchmaking.component';
import { ChatComponent } from './chat/chat.component';
import { BlockedusersComponent } from './blockedusers/blockedusers.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PreferenceComponent } from './signup/preference/preference.component';

const routes: Routes = [
  {path: '', component: LandingpageComponent},
  {path:'Login', component: LoginComponent},
  {path:'loginPage',component: LoginComponent},
  {path:'Basic-Details', component: BasicDetailsComponent},
  {path:'Personal-Details', component: PersonalDetailsComponent},
  {path:'More-Personal-Details', component: MorePersonalDetailsComponent},
  {path:'Residential-Details', component: ResidentialDetailsComponent},
  {path:'Professional-Details', component: ProfessionalDetailsComponent},
  {path:'Family-Details', component: FamilyDetailsComponent},
  {path:'Contact-Details', component: ContactDetailsComponent},
  {path:'preference',component:PreferenceComponent},
  {path:'Dashboard', component: DashboardComponent},
  {path: 'Profile/:id', component: ProfileComponent},
  {path: 'Subscribe', component: SubscribePackageComponent},
  {path: 'Gallery', component: GalleryComponent},
  {path: 'Interests', component: InterestsComponent},
  {path: 'Filter-Interest', component: FilterInterestComponent},
  {path: 'otp-verification', component: OtpVerificationComponent},
  {path: 'verify/:id', component: VerificationpageComponent},
  {path: 'Edit-Profile/:id', component: EditprofileComponent},
  {path: 'Edit-Email', component: ChangeemailComponent},
  {path: 'Edit-Username', component: ChangeusernameComponent},
  {path: 'Edit-Password', component: ChangepasswordComponent},
  {path: 'Edit-Phone', component: ChangephoneComponent},
  {path: 'Edit-Photos/:id', component: ChangephotosComponent},
  {path: "Contact-Us", component: ContactUsComponent },
  {path: "favourites", component: FavouritesComponent},
  {path: "loginwithemail", component: LoginwithemailComponent},
  {path: 'Notifications', component: NotificationsComponent},
  {path: 'Preferences', component: PreferencesComponent},
  {path: 'Terms-And-Conditions', component: TermsNconditionsComponent},
  {path: 'Matchmaking', component: MatchmakingComponent},
  {path: 'Chat/:id', component: ChatComponent},
  {path: 'BlockedUsers', component: BlockedusersComponent},






];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
