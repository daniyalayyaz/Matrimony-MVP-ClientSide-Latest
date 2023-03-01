import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { LocalStorageItem } from 'src/app/helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from 'src/app/helpers/unsubscribe-handler';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent extends UnsubscribeHandelr implements OnInit {
  id: any;
  userProfile: any;


  FamilyDetails: any = {};

  ReligiousSelect: any;
  updateitem: Object | undefined;
  userId: any | null;
  imageUrl: string;
  url = environment.url;
  constructor(private router: Router,
    private appService: AppService,
    private activateRoute: ActivatedRoute) {
    super()
  }
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    personalContact: new FormControl('', Validators.required),
    parentContact: new FormControl('', Validators.required),
    socialLinkFb: new FormControl('', Validators.required),
    socialLinkInsta: new FormControl('', Validators.required),
    socialLinkTwitter: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    profileCreated: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    religious: new FormControl('', Validators.required),
    otherreligion: new FormControl('', Validators.required),
    sect: new FormControl('', Validators.required),
    caste: new FormControl('', Validators.required),
    religiousStatus: new FormControl('', Validators.required),
    clan: new FormControl('', Validators.required),
    montherTonque: new FormControl('', Validators.required),
    looks: new FormControl('', Validators.required),
    complexion: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    build: new FormControl('', Validators.required),
    hobbies: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    house: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    futurePlans: new FormControl('', Validators.required),
    professional: new FormControl('', Validators.required),
    jobStatus: new FormControl('', Validators.required),
    workplace: new FormControl('', Validators.required),
    anotherqualification: new FormControl('', Validators.required),
    specialties: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    institution: new FormControl('', Validators.required),
    income: new FormControl('', Validators.required),
    professionalInfo: new FormControl('', Validators.required),
    fatherOccuption: new FormControl('', Validators.required),
    motherOccuption: new FormControl('', Validators.required),
    siblingsCountSisters: new FormControl('', Validators.required),
    siblingsCountBrothers: new FormControl('', Validators.required),
    socialEconomic: new FormControl('', Validators.required),
    familyInfo: new FormControl('', Validators.required),
    hideName: new FormControl('', Validators.required),
    lockDetails: new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if (loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
    }
    this.id = this.activateRoute.snapshot.params['id'];
    console.log(this.id);
    this.edit();
    this.getImage();
  }
  gotoEditProfile() {
    this.router.navigate(['Edit-Profile']);
  }
  gotoEditPassword() {
    this.router.navigate(['Edit-Password']);
  }
  gotoInterests() {
    this.router.navigate(['Interests']);
  }
  gotoEditUsername() {
    this.router.navigate(['Edit-Username']);
  }
  gotoEditPhone() {
    this.router.navigate(['Edit-Phone']);
  }
  gotoEditEmail() {
    this.router.navigate(['Edit-Email']);
  }
  gotoEditPhotos() {
    this.userId = localStorage.getItem('LoggedInUser');

    this.userId = JSON.parse(this.userId);
    this.router.navigate(['Edit-Photos',this.userId._id]);
    // this.router.navigate(['']);
  }
  edit() {
    this.appService.getSingleUser(this.id).subscribe((res:any) =>{
      this.userProfile = res;
    })
  }
  async update() {
    console.log(this.form.value);
    
    this.appService.updateUser(this.userProfile._id, this.form.value).subscribe((res: any) => {
      this.updateitem = res;
      this.router.navigate(['Dashboard']);
    })
  }
  profilestatus(){
    // if(value.active == true){
    //   this.activeUpdate = this.activeTrue
    // }else {
    //   this.activeUpdate = this.activeFalse
    // }
    // console.log(this.activeUpdate)
    // this.appService.update(value._id,this.activeUpdate).then((res: any) => {
    //   this.data = res
    // });
  }

  professions = ["accountant", "actor", "actress", "air traffic controller", "architect", "artist", "attorney", "banker", "barber", "bookkeeper", "builder", "businessperson", "butcher", "carpenter", "cashier", "chef", "coach", "designer", "developer", "economist", "editor", "electrician", "engineer", "farmer", "filmmaker", "fisherman", "flight attendant", "jeweler", "judge", "lawyer", "mechanic", "musician", "painter", "pharmacist", "photographer", "pilot", "plumber", "police officer", "politician", "programmer", "receptionist", "salesperson", "singer", "teacher", "translator", "videographer", "waiter", "writer"]

 
  qualifications = ["Allergy", "Andrology", "Anesthesiology", "Cardiacsurgery", "Cardiology", "Community", "Dentistry", "Dermatology", "DiabetesandEndocrinology", "E.N.T", "Gastroenterology", "GeneralPractice", "GeneralSurgery", "Gynae/Obs", "Hepatology", "Medicine", "Nephrology", "Neurology", "Neurosurgery", "Nutrition", "Oncology", "Ophthalmology", "Orthopedics", "Paediatricsurgery", "Paediatrics", "Pathology", "Physiotherapy", "PlasticSurgery", "Psychiatry", "PsychologyPulmonology", "Radiology", "Rheumatology", "Urology"]

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
  Religious = [
    {
      value: 'Muslim',
      label: 'Muslim'
    },
    {
      value: 'Christian',
      label: 'Christian'
    },
    {
      value: 'Hindu',
      label: 'Hindu'
    },
    {
      value: 'Sikh',
      label: 'Sikh'
    },
    {
      value: 'Other',
      label: 'Other'
    },
  ];
  Sect = [
    {
      value: 'Deobandi',
      label: 'Deobandi'
    },
    {
      value: 'Sunni',
      label: 'Sunni'
    },
    {
      value: 'Shia',
      label: 'Shia'
    },
    {
      value: 'Brailvi',
      label: 'Brailvi'
    },
    {
      value: 'Ahl-e-Hadees',
      label: 'Ahl-e-Hadees'
    },
    {
      value: 'Other',
      label: 'Other'
    },
  ];
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
  MotherTongue = [
    {
      value: 'Urdu',
      label: 'Urdu'
    },
    {
      value: 'English',
      label: 'English'
    },
    {
      value: 'Pushto',
      label: 'Pushto'
    },
    {
      value: 'Punjabi',
      label: 'Punjabi'
    },
    {
      value: 'Sindhi',
      label: 'Sindhi'
    },
    {
      value: 'Hindko',
      label: 'Hindko'
    },
    {
      value: 'Pahari',
      label: 'Pahari'
    },
    {
      value: 'Other',
      label: 'Other'
    },
  ];

  castes = ["Abbasi", "Abidi", "Afridi", "Agha", "Ahmedani", "Akhoond", "Alvi", "Ansari", "Arain", "Ashkani", "Atcha", "Awan", "Babar", "Badini", "Bahawalanzai", "Bahmani", "Baig", "Bajar", "Bajwa", "Baloch", "Bangash", "Bangial - Rajput", "Bangulzai", "Barazani", "Barija", "Barlas", "Barr", "Basra", "Bhabra", "Bhalli", "Bhamba", "Bhango", "Bhatti", "Bhinder - Jutt", "Bhullar", "Bijarani", "Bizenjo", "Brahmani", "Bugti", "Buledi", "Bulfati", "Burki", "Butt", "Buzdar", "Chachar", "Chagatai", "Chahal", "Chamkanni", "Chandio", "Changwani", "Chatha", "Chaudhry", "Chauhan", "Chechi", "Cheema", "Chishti", "Chughtai", "Chutani", "Damanis", "Dannarzai", "Dar", "Dareshak", "Darzada", "Dasti", "Daulat Khel", "Davi", "dawar", "Derawal", "Dhariwal", "Dhillon", "Dogar", "Domki", "Durrani", "Edo-Khel", "Fareedi", "Farooqi", "Firdausi", "Gabol", "Gadai", "Gadhi", "Gajani", "Gakhar", "Galani", "Gandapur", "Gardezi", "Gashkori", "Ghazali", "Ghazini", "Ghilzai", "Ghuman", "Gichki", "Gill", "Gjar", "Gola", "Gondal", "Gopang", "Goraya", "Gorgage", "Gorshani", "Gujjar", "Gurmani", "Hafiz Khel", "Hamadani", "Hashmi", "Hasni", "Hassani", "Hesbani", "Hooth", "Hussain", "Hussaini", "Hyderi", "Ibrahim", "Idrisi", "Isa Khel", "Isfahani", "Jadgal", "Jadoon - Gadoon", "Jadun", "Jafari", "Jagirani", "Jahangiri", "Jalali", "Jalbani", "Jamali", "Jamshidi", "Jandran", "Janjua - Rajput", "Janjuarajput", "Janwari", "Jappa", "Jarwar", "Jat", "Jatoi", "Jattak", "Jawanda", "Jhalawan", "Jiskani", "Johiya", "Jutt", "Kahloon", "Kakakhel", "Kakar", "Kakazai", "Kallu", "Kalmati", "Kalpar", "Kalyal", "Kambarzahi", "Kamboh", "Kasana", "Kashani", "Kassar", "Kayani", "Kazemi", "Kenagzai", "Kermani", "Khakwani", "Khalil", "Khalol", "Khan", "Khanum", "Khara", "Kharoti", "Khattak", "Khawaja", "Kheazai", "Khetran", "Khokhar", "Khorasani", "Khosa", "Khudiadadzai", "Khulozai", "Khushk", "Kiani", "Kirmani", "Korai", "Kuchelai", "Kuchis", "Kundi", "Kurd", "Lakhani", "Langah", "Langhani", "Lango", "Lanjwani", "Lari", "Lashari", "Leel", "Leghari", "Lehri", "Lodhi", "Loharani", "Lone", "Luna", "Lund", "Maghdud Khel", "Magsi", "Mahar", "Mahmud Khel", "Mahsud Khel", "Mahtam", "Makhdoom", "Malanhaans", "Malik", "Mamund", "Manduri", "Maneka", "Marri", "Marwat", "Mashwanis", "Masood", "Mastoi", "Mazari", "Meghwar", "Mengal", "Meo", "Mian", "Mian Rajput", "Minhas", "Minhas Mengal", "Mir", "Mirwani", "Mirza", "Mohamedzai", "Mohmand", "Montazeri", "Mughal", "Muker", "Mullagori - Mulla Ghori", "Muslim Khatris", "Naeem", "Nanda", "Naqvi", "sherwani", "Niazi", "Nishapuri", "Nizamani", "Noorani", "Noorzai", "Nothazai", "Nutkani", "Orakzai", "Osmani", "Pansota", "Paracha", "Pasha", "Passi", "Pitafi", "Popalzai", "Qaimkhani", "Qaisrani", "Qalat", "Qambrani", "Qazi", "Qizilbash", "Qureshi", "Rahija", "Rahmanzai", "Raisani", "Raja", "Rajput", "Ramay", "Rana", "Ranjha", "Rathore", "Razavi", "Reza", "Rind", "Rizvi", "Rodini", "Sabzvari", "Sadat", "Sadozai", "Sahi", "Sahni", "Sajjadi", "Salarzai", "Salehi", "Sanjarzai", "Sanjrani", "Sarbans", "Sarpara", "Sasooli", "Satti", "Sethwi", "Shahi", "Shahwani", "Shaikh", "Shambhani", "Shanzay", "Sheikh", "Sherzai", "Shilmani", "Shirani", "Sial", "Siddiqui", "Sindhi, Sindh, Pakistan", "Sistani", "Soomrani", "Sulemani", "Suri", "Swati", "Syed", "Tahirkheli", "Talpur", "Tareen", "Tarkani", "Tauqi", "Tirmizi", "Tokhi", "Toubzud", "Turkhel", "Umar Khel", "Umarzai", "Umrani", "Uthman Khel", "Wadeyla", "Wains", "Wasti", "Wazir", "Yazdani", "Yousafzai", "Yusaf Khel", "Zain", "Zand", "Zardari", "Zehri", "Zubairi"]
  countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
  cities = ["Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad", "Gujranwala", "Peshawar", "Rahim Yar Khan", "Quetta", "Muzaffarabad", "Battagram", "Kotli", "Islamabad", "Bahawalpur", "Sargodha", "Sialkot", "Sukkur", "Larkana", "Sheikhupura", "Bhimber", "Jhang Sadr", "Gujrat", "Mardan", "Malir Cantonment", "Kasur", "Mingora", "Dera Ghazi Khan", "Sahiwal", "Nawabshah", "Okara", "Mirpur Khas", "Chiniot", "Shahkot", "Kamoke", "Saddiqabad", "Burewala", "Jacobabad", "Muzaffargarh", "Muridke", "Shikarpur", "Hafizabad", "Kohat", "Tordher", "Jhelum", "Khanpur", "Khuzdar", "Dadu", "Gojra", "Mandi Bahauddin", "Tando Allahyar", "Daska Kalan", "Pakpattan", "Bahawalnagar", "Tando Adam", "Khairpur Mir's", "New Mirpur", "Chishtian", "Abbottabad", "Jaranwala", "Ahmadpur East", "Vihari", "Kamalia", "Kot Addu", "Khushab", "Wazirabad", "Dera Ismail Khan", "Chakwal", "Swabi", "Lodhran", "Nowshera Cantonment", "Charsadda", "Jalalpur Jattan", "Mianwali", "Chaman", "Kandhkot", "Hasilpur", "Arifwala", "Mianke Mor", "Attock City", "Chichawatni", "Bhakkar", "Kharian", "Layyah", "Kambar", "Moro", "Mian Channun", "Turbat", "Shahdad Kot", "Bhalwal", "Dipalpur", "Badin", "Pano Aqil", "Kotri", "Tando Muhammad Khan", "Harunabad", "Pattoki", "Chenab Nagar", "Kahror Pakka", "Gujar Khan", "Kot Malik Barkhurdar", "Chuchar-kana Mandi", "Toba Tek Singh", "Narowal", "Shorkot", "Shahdadpur", "Shabqadar", "Mansehra", "Shujaabad", "Haveli Lakha", "Lala Musa", "Mailsi", "Shakargarh", "Ghotki", "Sibi", "Jampur", "Sambrial", "Sanghar", "Hujra Shah Muqim", "Kabirwala", "Chunian", "Sangla Hill", "Haripur", "Nankana Sahib", "Pasrur", "Gwadar", "Rajanpur", "Rohri", "Zhob", "Matli", "Rawalakot", "Hadali", "Mirpur Mathelo", "Bannu", "Dullewala", "Hala", "Ratodero", "Jatoi Shimali", "Jauharabad", "Bat Khela", "Kot Radha Kishan", "Kahna Nau", "Mustafabad", "Chak Thirty-one -Eleven Left", "Talagang", "Taunsa", "Thatta", "Sarai Alamgir", "Usta Muhammad", "Kamra", "Umarkot", "Basirpur", "Sehwan", "Naushahra Virkan", "Fort Abbas", "Havelian", "Khairpur", "Dinga", "Ladhewala Waraich", "Khalabat", "New Badah", "Tank", "Kot Mumin", "Tandlianwala", "Chak Azam Sahu", "Loralai", "Jalalpur Pirwala", "Pabbi", "Chak Jhumra", "Renala Khurd", "Risalpur Cantonment", "Lakki", "Topi", "Hangu", "Pir Jo Goth", "Kundian", "Pir Mahal", "Khurrianwala", "Mehrabpur", "Pindi Bhattian", "Malakwal City", "Narang Mandi", "Malakwal", "Thul", "Pindi Gheb", "Zahir Pir", "Dunyapur", "Gambat", "Kashmor", "Alipur", "Naudero", "Pasni", "Sukheke Mandi", "Setharja Old", "Khewra", "Mamu Kanjan", "Sharqpur Sharif", "Digri", "Bhera", "Sakrand", "Tando Jam", "Raiwind", "Lalian", "Khairpur Tamewah", "Kharan", "Mehar", "Khangah Dogran", "Khairpur Nathan Shah", "Upper Dir", "Ghauspur", "Tangi", "Utmanzai", "Thal", "Minchianabad", "Garh Maharaja", "Jahanian Shah", "Mastung", "Mananwala", "Fazilpur", "Talamba", "Kunjah", "Jhawarian", "Nasirabad", "Nushki", "Sita Road", "Dijkot", "Sillanwali", "Kandiaro", "Zaida", "Kunri", "Kalat", "Daud Khel", "Mitha Tiwana", "Hazro City", "Dunga Bunga", "Aman Garh", "Karor", "Kot Diji", "Kalur Kot", "Murree", "Faqirwali", "Ahmadpur Sial", "Phalia", "Yazman", "Raja Jang", "Chak Five Hundred Seventy-five", "Pishin", "Chak One Hundred Twenty Nine Left", "Chawinda", "Ubauro", "Mithi", "Akora", "Zafarwal", "Kot Samaba", "Eminabad", "Kahuta", "Ranipur", "Kulachi", "Khanpur Mahar", "Hingorja", "Naukot", "Pind Dadan Khan", "Kanganpur", "Faruka", "Kotli Loharan", "Shahpur Chakar", "Talhar", "Pad Idan", "Kot Ghulam Muhammad", "Qadirpur Ran", "Bela", "Surkhpur", "Sook Kalan", "Dhoro Naro", "Khangarh", "Sarai Naurang", "Gharo", "Bhit Shah", "Matiari", "Dhanot", "Warah", "Lachi", "Baddomalhi", "Jand", "Dera Bugti", "Tharu Shah", "Naushahro Firoz", "Dajal", "Daur", "Bhopalwala", "Paharpur", "Bhan", "Mach", "Goth Radhan", "Uthal", "Kaleke Mandi", "Jiwani", "Johi", "Chhor", "Mangla", "Bhawana", "Shahr Sultan", "Jhol", "Sodhri", "Kalabagh", "Sinjhoro", "Kamar Mushani", "Kallar Kahar", "Chuhar Jamali", "Harnoli", "Sarai Sidhu", "Choa Saidan Shah", "Dadhar", "Darya Khan", "Daira Din Panah", "Garhiyasin", "Madeji", "Dokri", "Sobhodero", "Dalbandin", "Daulatpur", "Bhag", "Rasulnagar", "Shahpur", "Tando Bago", "Baffa", "Karak", "Garhi Khairo", "Lakhi", "Gadani", "Surab", "Rojhan", "Ormara", "Chamber", "Kalaswala", "Islamkot", "Liliani", "Bhiria", "Mirwah Gorchani", "Dhaunkal", "Daultala", "Diplo", "Kohlu", "Harnai", "Jandiala Sher Khan", "Daromehar", "Mankera", "Sanjwal", "Miro Khan", "Gilgit", "Kot Sultan", "Gahkuch", "Khadro", "Berani", "Begowala", "Tangwani", "Bozdar Wada", "Jati", "Rustam", "Darya Khan Marri", "Sohbatpur", "Doaba", "Mirpur Bhtoro", "Sann", "Samaro", "Barkhan", "Bandhi", "Karaundi", "Mirpur Sakro", "Adilpur", "Bagarji", "Goth Phulji", "Rajo Khanani", "Alik Ghund", "Dinan Bashnoian Wala", "Jam Sahib", "Kandiari", "Kadhan", "Goth Garelo", "Nazir Town", "Khadan Khak", "Pithoro", "Duki", "Nabisar", "Kario Ghanwar", "Mehmand Chak", "Mughalabad", "Bulri", "Shingli Bala", "Miran Shah", "Alizai", "Amirabad", "Kakad Wari Dir Upper", "Cherat Cantonement", "Keti Bandar", "Tando Mitha Khan"]
 getImage() {
    this.appService.getSingleUser(this.id)
      .subscribe((data: any) => {
        const fullUrl = `${this.url}/${data.image}`
        this.imageUrl = data.image;
        console.log(this.imageUrl);
        
      }
      );
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['loginPage']);
  }
}




