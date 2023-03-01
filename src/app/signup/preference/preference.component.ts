import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { LocalStorageItem } from 'src/app/helpers/localStorageItem.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-details',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {
  personal: any = {};
  MorePersonalDetails: any = {};
  ResidentialDetails: any = {};
  CountrySelect: any;
  Province: any;
  HouseStatus: any;
  FuturePlanstoLiveIn: any;
  City: any;
  AnyOtherNationality: any;
  countries: any = [];
  inches:any;
  Looks: any = [];
  Complexion: any = [];
  height: any;
  Build: any = [];
  hobbies: any;
  LooksSelect: any
  ComplexionSelect: any;
  buildSelect: any
  ReligiousSelect: any;
  name: any;
  userage: any;
  ReligiousStatusSelect: any;
  SectSelect: any;
  MotherTongueSelect: any;
  MartialStatusSelect: any;
  Clan: any;
  CasteSelect: any;
  OtherReligion: any;
  Religious: any = [];
  Sect: any = [];
  MotherTongue: any = [];
  castes: any = [];
  Income: any;
  ProfessionSelect: any;
  FamilyDetails: any = {};
  BrotherCount: any;
  FatherOccupation: any;
  MotherOccupation: any;
  OtherFamilyInfo: any;
  SisterCount: any;
  SocioeconomicStatus: any;
  GenderSelected: any;
  CurrentUser: any;


  constructor(private router: Router, private appService: AppService, private toasterservice: ToastrService
    ) {}
  ngOnInit(): void {
    console.log(localStorage.getItem(LocalStorageItem.LOGGED_USER));
    this.CurrentUser = localStorage.getItem(LocalStorageItem.LOGGED_USER)
    this.CurrentUser = JSON.parse(this.CurrentUser)
    console.log(this.CurrentUser);
    
    this.getReligion();
    this.getSect();
    this.getMotherLanguage();
    this.getCast();
    this.getCountry();
    this.getBuild();
    this.getComplexion();
    this.getLooks();
  }
  MartialStatus = [
    {
      value: 'Unmarried',
      label: 'Unmarried'
    },
    {
      value: 'Married',
      label: 'Married'
    },
    {
      value: 'Divorced',
      label: 'Divorced'
    },
    {
      value: 'Widow',
      label: 'Widow'
    },
    {
      value: 'Separated',
      label: 'Separated'
    },
  ];
  getReligion() {
    this.appService.getReligion().subscribe((res: any) => {
      this.Religious = res;
    })
  }
  getSect() {
    this.appService.getSect().subscribe((res: any) => {
      this.Sect = res;
    })
  }
  cities = ["Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad", "Gujranwala", "Peshawar", "Rahim Yar Khan", "Quetta", "Muzaffarabad", "Battagram", "Kotli", "Islamabad", "Bahawalpur", "Sargodha", "Sialkot", "Sukkur", "Larkana", "Sheikhupura", "Bhimber", "Jhang Sadr", "Gujrat", "Mardan", "Malir Cantonment", "Kasur", "Mingora", "Dera Ghazi Khan", "Sahiwal", "Nawabshah", "Okara", "Mirpur Khas", "Chiniot", "Shahkot", "Kamoke", "Saddiqabad", "Burewala", "Jacobabad", "Muzaffargarh", "Muridke", "Shikarpur", "Hafizabad", "Kohat", "Tordher", "Jhelum", "Khanpur", "Khuzdar", "Dadu", "Gojra", "Mandi Bahauddin", "Tando Allahyar", "Daska Kalan", "Pakpattan", "Bahawalnagar", "Tando Adam", "Khairpur Mir's", "New Mirpur", "Chishtian", "Abbottabad", "Jaranwala", "Ahmadpur East", "Vihari", "Kamalia", "Kot Addu", "Khushab", "Wazirabad", "Dera Ismail Khan", "Chakwal", "Swabi", "Lodhran", "Nowshera Cantonment", "Charsadda", "Jalalpur Jattan", "Mianwali", "Chaman", "Kandhkot", "Hasilpur", "Arifwala", "Mianke Mor", "Attock City", "Chichawatni", "Bhakkar", "Kharian", "Layyah", "Kambar", "Moro", "Mian Channun", "Turbat", "Shahdad Kot", "Bhalwal", "Dipalpur", "Badin", "Pano Aqil", "Kotri", "Tando Muhammad Khan", "Harunabad", "Pattoki", "Chenab Nagar", "Kahror Pakka", "Gujar Khan", "Kot Malik Barkhurdar", "Chuchar-kana Mandi", "Toba Tek Singh", "Narowal", "Shorkot", "Shahdadpur", "Shabqadar", "Mansehra", "Shujaabad", "Haveli Lakha", "Lala Musa", "Mailsi", "Shakargarh", "Ghotki", "Sibi", "Jampur", "Sambrial", "Sanghar", "Hujra Shah Muqim", "Kabirwala", "Chunian", "Sangla Hill", "Haripur", "Nankana Sahib", "Pasrur", "Gwadar", "Rajanpur", "Rohri", "Zhob", "Matli", "Rawalakot", "Hadali", "Mirpur Mathelo", "Bannu", "Dullewala", "Hala", "Ratodero", "Jatoi Shimali", "Jauharabad", "Bat Khela", "Kot Radha Kishan", "Kahna Nau", "Mustafabad", "Chak Thirty-one -Eleven Left", "Talagang", "Taunsa", "Thatta", "Sarai Alamgir", "Usta Muhammad", "Kamra", "Umarkot", "Basirpur", "Sehwan", "Naushahra Virkan", "Fort Abbas", "Havelian", "Khairpur", "Dinga", "Ladhewala Waraich", "Khalabat", "New Badah", "Tank", "Kot Mumin", "Tandlianwala", "Chak Azam Sahu", "Loralai", "Jalalpur Pirwala", "Pabbi", "Chak Jhumra", "Renala Khurd", "Risalpur Cantonment", "Lakki", "Topi", "Hangu", "Pir Jo Goth", "Kundian", "Pir Mahal", "Khurrianwala", "Mehrabpur", "Pindi Bhattian", "Malakwal City", "Narang Mandi", "Malakwal", "Thul", "Pindi Gheb", "Zahir Pir", "Dunyapur", "Gambat", "Kashmor", "Alipur", "Naudero", "Pasni", "Sukheke Mandi", "Setharja Old", "Khewra", "Mamu Kanjan", "Sharqpur Sharif", "Digri", "Bhera", "Sakrand", "Tando Jam", "Raiwind", "Lalian", "Khairpur Tamewah", "Kharan", "Mehar", "Khangah Dogran", "Khairpur Nathan Shah", "Upper Dir", "Ghauspur", "Tangi", "Utmanzai", "Thal", "Minchianabad", "Garh Maharaja", "Jahanian Shah", "Mastung", "Mananwala", "Fazilpur", "Talamba", "Kunjah", "Jhawarian", "Nasirabad", "Nushki", "Sita Road", "Dijkot", "Sillanwali", "Kandiaro", "Zaida", "Kunri", "Kalat", "Daud Khel", "Mitha Tiwana", "Hazro City", "Dunga Bunga", "Aman Garh", "Karor", "Kot Diji", "Kalur Kot", "Murree", "Faqirwali", "Ahmadpur Sial", "Phalia", "Yazman", "Raja Jang", "Chak Five Hundred Seventy-five", "Pishin", "Chak One Hundred Twenty Nine Left", "Chawinda", "Ubauro", "Mithi", "Akora", "Zafarwal", "Kot Samaba", "Eminabad", "Kahuta", "Ranipur", "Kulachi", "Khanpur Mahar", "Hingorja", "Naukot", "Pind Dadan Khan", "Kanganpur", "Faruka", "Kotli Loharan", "Shahpur Chakar", "Talhar", "Pad Idan", "Kot Ghulam Muhammad", "Qadirpur Ran", "Bela", "Surkhpur", "Sook Kalan", "Dhoro Naro", "Khangarh", "Sarai Naurang", "Gharo", "Bhit Shah", "Matiari", "Dhanot", "Warah", "Lachi", "Baddomalhi", "Jand", "Dera Bugti", "Tharu Shah", "Naushahro Firoz", "Dajal", "Daur", "Bhopalwala", "Paharpur", "Bhan", "Mach", "Goth Radhan", "Uthal", "Kaleke Mandi", "Jiwani", "Johi", "Chhor", "Mangla", "Bhawana", "Shahr Sultan", "Jhol", "Sodhri", "Kalabagh", "Sinjhoro", "Kamar Mushani", "Kallar Kahar", "Chuhar Jamali", "Harnoli", "Sarai Sidhu", "Choa Saidan Shah", "Dadhar", "Darya Khan", "Daira Din Panah", "Garhiyasin", "Madeji", "Dokri", "Sobhodero", "Dalbandin", "Daulatpur", "Bhag", "Rasulnagar", "Shahpur", "Tando Bago", "Baffa", "Karak", "Garhi Khairo", "Lakhi", "Gadani", "Surab", "Rojhan", "Ormara", "Chamber", "Kalaswala", "Islamkot", "Liliani", "Bhiria", "Mirwah Gorchani", "Dhaunkal", "Daultala", "Diplo", "Kohlu", "Harnai", "Jandiala Sher Khan", "Daromehar", "Mankera", "Sanjwal", "Miro Khan", "Gilgit", "Kot Sultan", "Gahkuch", "Khadro", "Berani", "Begowala", "Tangwani", "Bozdar Wada", "Jati", "Rustam", "Darya Khan Marri", "Sohbatpur", "Doaba", "Mirpur Bhtoro", "Sann", "Samaro", "Barkhan", "Bandhi", "Karaundi", "Mirpur Sakro", "Adilpur", "Bagarji", "Goth Phulji", "Rajo Khanani", "Alik Ghund", "Dinan Bashnoian Wala", "Jam Sahib", "Kandiari", "Kadhan", "Goth Garelo", "Nazir Town", "Khadan Khak", "Pithoro", "Duki", "Nabisar", "Kario Ghanwar", "Mehmand Chak", "Mughalabad", "Bulri", "Shingli Bala", "Miran Shah", "Alizai", "Amirabad", "Kakad Wari Dir Upper", "Cherat Cantonement", "Keti Bandar", "Tando Mitha Khan"]

  ReligiosStatus = [
    {
      value: 'Very Religious',
      label: 'Very Religious'
    },
    {
      value: 'Religious',
      label: 'Religious'
    },
    {
      value: 'Weak Follower',
      label: 'Weak Follower'
    },
  ];
  getMotherLanguage() {
    this.appService.getMotherLanguage().subscribe((res: any) => {
      this.MotherTongue = res;
    })
  }

  getCast() {
    this.appService.getCast().subscribe((res: any) => {
      this.castes = res;
    })
  }

  eventonKey(event: any) {

    console.log(event.target.name, event.target.value);
    this.personal[event.target.name] = event.target.value;
    console.log(this.personal);
  }
  gotoSignupThirdPage() {
    // localStorage.setItem('PersonalDetails', JSON.stringify(this.personal))
    // console.log(JSON.parse(localStorage.getItem('PersonalDetails') as string))
    // this.router.navigate(['More-Personal-Details']);
    console.log(this.personal);
    
    this.appService.preferenceAdd(this.personal,this.CurrentUser).subscribe((res:any)=>{
      console.log(res);
      this.toasterservice.info("Preferences saved! Please verify your email first to login");
      this.router.navigate(['loginPage']);
    })
  }
  gotoSignupFirstPage() {
    this.router.navigate(['Basic-Details']);
  }
  getCountry() {
    this.appService.getCountry().subscribe((res: any) => {
      this.countries = res;
      console.log(this.countries);

    })
  }
  getLooks() {
    this.appService.getLooks().subscribe((res: any) => {
      this.Looks = res;
      console.log(this.Looks);

    })
  }
  getBuild() {
    this.appService.getBuild().subscribe((res: any) => {
      this.Build = res;
    })
  }
  getComplexion() {
    this.appService.getComplexion().subscribe((res: any) => {
      this.Complexion = res;
    })
  }
}
