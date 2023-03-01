import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { RequestType } from '../enums/request.enum';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';
import { Message } from '../models/message.modal';
import { User } from '../models/user.modal';

@Component({
  selector: 'app-filter-interest',
  templateUrl: './filter-interest.component.html',
  styleUrls: ['./filter-interest.component.css']
})
export class FilterInterestComponent extends UnsubscribeHandelr implements OnInit {

  personList: Array<User> = [];
  messagesList: Array<Message>;
  personsList: Array<User> = [];
  religiousSelect: any;
  sectSelect: any;
  MAx: string;
  Min: string;
  country: string;
  gender: string;
  height: any;
  martialstatus: any;
  province: any;
  professional: any;
  sect: any;
  city: any;
  religious: any;
  docJobStatus: any;
  alliedJobStatus:any;
  specialty: any;
  constructor(private router: Router,
    private appService: AppService, private toasterservice: ToastrService,) {
    super()

  }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getReligion();
    this.getSect();
  }
  pathfemale: string = "../../assets/female.png";
  pathmessage: string = "../../assets/message.png";
  pathheart: string = "../../assets/pinkheart.png";
  pathmale: string = "../../assets/male.png"
  countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe']
  cities = ['Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Hyderabad', 'Gujranwala', 'Peshawar', 'Rahim Yar Khan', 'Quetta', 'Muzaffarabad', 'Battagram', 'Kotli', 'Islamabad', 'Bahawalpur', 'Sargodha', 'Sialkot', 'Sukkur', 'Larkana', 'Sheikhupura', 'Bhimber', 'Jhang Sadr', 'Gujrat', 'Mardan', 'Malir Cantonment', 'Kasur', 'Mingora', 'Dera Ghazi Khan', 'Sahiwal', 'Nawabshah', 'Okara', 'Mirpur Khas', 'Chiniot', 'Shahkot', 'Kamoke', 'Saddiqabad', 'Burewala', 'Jacobabad', 'Muzaffargarh', 'Muridke', 'Shikarpur', 'Hafizabad', 'Kohat', 'Tordher', 'Jhelum', 'Khanpur', 'Khuzdar', 'Dadu', 'Gojra', 'Mandi Bahauddin', 'Tando Allahyar', 'Daska Kalan', 'Pakpattan', 'Bahawalnagar', 'Tando Adam', 'Khairpur Mir\'s', 'New Mirpur', 'Chishtian', 'Abbottabad', 'Jaranwala', 'Ahmadpur East', 'Vihari', 'Kamalia', 'Kot Addu', 'Khushab', 'Wazirabad', 'Dera Ismail Khan', 'Chakwal', 'Swabi', 'Lodhran', 'Nowshera Cantonment', 'Charsadda', 'Jalalpur Jattan', 'Mianwali', 'Chaman', 'Kandhkot', 'Hasilpur', 'Arifwala', 'Mianke Mor', 'Attock City', 'Chichawatni', 'Bhakkar', 'Kharian', 'Layyah', 'Kambar', 'Moro', 'Mian Channun', 'Turbat', 'Shahdad Kot', 'Bhalwal', 'Dipalpur', 'Badin', 'Pano Aqil', 'Kotri', 'Tando Muhammad Khan', 'Harunabad', 'Pattoki', 'Chenab Nagar', 'Kahror Pakka', 'Gujar Khan', 'Kot Malik Barkhurdar', 'Chuchar-kana Mandi', 'Toba Tek Singh', 'Narowal', 'Shorkot', 'Shahdadpur', 'Shabqadar', 'Mansehra', 'Shujaabad', 'Haveli Lakha', 'Lala Musa', 'Mailsi', 'Shakargarh', 'Ghotki', 'Sibi', 'Jampur', 'Sambrial', 'Sanghar', 'Hujra Shah Muqim', 'Kabirwala', 'Chunian', 'Sangla Hill', 'Haripur', 'Nankana Sahib', 'Pasrur', 'Gwadar', 'Rajanpur', 'Rohri', 'Zhob', 'Matli', 'Rawalakot', 'Hadali', 'Mirpur Mathelo', 'Bannu', 'Dullewala', 'Hala', 'Ratodero', 'Jatoi Shimali', 'Jauharabad', 'Bat Khela', 'Kot Radha Kishan', 'Kahna Nau', 'Mustafabad', 'Chak Thirty-one -Eleven Left', 'Talagang', 'Taunsa', 'Thatta', 'Sarai Alamgir', 'Usta Muhammad', 'Kamra', 'Umarkot', 'Basirpur', 'Sehwan', 'Naushahra Virkan', 'Fort Abbas', 'Havelian', 'Khairpur', 'Dinga', 'Ladhewala Waraich', 'Khalabat', 'New Badah', 'Tank', 'Kot Mumin', 'Tandlianwala', 'Chak Azam Sahu', 'Loralai', 'Jalalpur Pirwala', 'Pabbi', 'Chak Jhumra', 'Renala Khurd', 'Risalpur Cantonment', 'Lakki', 'Topi', 'Hangu', 'Pir Jo Goth', 'Kundian', 'Pir Mahal', 'Khurrianwala', 'Mehrabpur', 'Pindi Bhattian', 'Malakwal City', 'Narang Mandi', 'Malakwal', 'Thul', 'Pindi Gheb', 'Zahir Pir', 'Dunyapur', 'Gambat', 'Kashmor', 'Alipur', 'Naudero', 'Pasni', 'Sukheke Mandi', 'Setharja Old', 'Khewra', 'Mamu Kanjan', 'Sharqpur Sharif', 'Digri', 'Bhera', 'Sakrand', 'Tando Jam', 'Raiwind', 'Lalian', 'Khairpur Tamewah', 'Kharan', 'Mehar', 'Khangah Dogran', 'Khairpur Nathan Shah', 'Upper Dir', 'Ghauspur', 'Tangi', 'Utmanzai', 'Thal', 'Minchianabad', 'Garh Maharaja', 'Jahanian Shah', 'Mastung', 'Mananwala', 'Fazilpur', 'Talamba', 'Kunjah', 'Jhawarian', 'Nasirabad', 'Nushki', 'Sita Road', 'Dijkot', 'Sillanwali', 'Kandiaro', 'Zaida', 'Kunri', 'Kalat', 'Daud Khel', 'Mitha Tiwana', 'Hazro City', 'Dunga Bunga', 'Aman Garh', 'Karor', 'Kot Diji', 'Kalur Kot', 'Murree', 'Faqirwali', 'Ahmadpur Sial', 'Phalia', 'Yazman', 'Raja Jang', 'Chak Five Hundred Seventy-five', 'Pishin', 'Chak One Hundred Twenty Nine Left', 'Chawinda', 'Ubauro', 'Mithi', 'Akora', 'Zafarwal', 'Kot Samaba', 'Eminabad', 'Kahuta', 'Ranipur', 'Kulachi', 'Khanpur Mahar', 'Hingorja', 'Naukot', 'Pind Dadan Khan', 'Kanganpur', 'Faruka', 'Kotli Loharan', 'Shahpur Chakar', 'Talhar', 'Pad Idan', 'Kot Ghulam Muhammad', 'Qadirpur Ran', 'Bela', 'Surkhpur', 'Sook Kalan', 'Dhoro Naro', 'Khangarh', 'Sarai Naurang', 'Gharo', 'Bhit Shah', 'Matiari', 'Dhanot', 'Warah', 'Lachi', 'Baddomalhi', 'Jand', 'Dera Bugti', 'Tharu Shah', 'Naushahro Firoz', 'Dajal', 'Daur', 'Bhopalwala', 'Paharpur', 'Bhan', 'Mach', 'Goth Radhan', 'Uthal', 'Kaleke Mandi', 'Jiwani', 'Johi', 'Chhor', 'Mangla', 'Bhawana', 'Shahr Sultan', 'Jhol', 'Sodhri', 'Kalabagh', 'Sinjhoro', 'Kamar Mushani', 'Kallar Kahar', 'Chuhar Jamali', 'Harnoli', 'Sarai Sidhu', 'Choa Saidan Shah', 'Dadhar', 'Darya Khan', 'Daira Din Panah', 'Garhiyasin', 'Madeji', 'Dokri', 'Sobhodero', 'Dalbandin', 'Daulatpur', 'Bhag', 'Rasulnagar', 'Shahpur', 'Tando Bago', 'Baffa', 'Karak', 'Garhi Khairo', 'Lakhi', 'Gadani', 'Surab', 'Rojhan', 'Ormara', 'Chamber', 'Kalaswala', 'Islamkot', 'Liliani', 'Bhiria', 'Mirwah Gorchani', 'Dhaunkal', 'Daultala', 'Diplo', 'Kohlu', 'Harnai', 'Jandiala Sher Khan', 'Daromehar', 'Mankera', 'Sanjwal', 'Miro Khan', 'Gilgit', 'Kot Sultan', 'Gahkuch', 'Khadro', 'Berani', 'Begowala', 'Tangwani', 'Bozdar Wada', 'Jati', 'Rustam', 'Darya Khan Marri', 'Sohbatpur', 'Doaba', 'Mirpur Bhtoro', 'Sann', 'Samaro', 'Barkhan', 'Bandhi', 'Karaundi', 'Mirpur Sakro', 'Adilpur', 'Bagarji', 'Goth Phulji', 'Rajo Khanani', 'Alik Ghund', 'Dinan Bashnoian Wala', 'Jam Sahib', 'Kandiari', 'Kadhan', 'Goth Garelo', 'Nazir Town', 'Khadan Khak', 'Pithoro', 'Duki', 'Nabisar', 'Kario Ghanwar', 'Mehmand Chak', 'Mughalabad', 'Bulri', 'Shingli Bala', 'Miran Shah', 'Alizai', 'Amirabad', 'Kakad Wari Dir Upper', 'Cherat Cantonement', 'Keti Bandar', 'Tando Mitha Khan']
  martialStatus=['Unmarried', 'Married', 'Divorced', 'Widow', 'Separated']
  professions=['Accountant', 'Actor', 'Actress', 'Air Traffic Controller', 'Allied Health', 'Architect', 'Artist', 'Attorney', 'Banker', 'Barber', 'Bookkeeper', 'Builder', 'Businessperson', 'Butcher', 'Carpenter', 'Cashier', 'Chef', 'Coach', 'Designer', 'Developer', 'Doctor', 'Economist', 'Editor', 'Electrician', 'Engineer', 'Farmer', 'Filmmaker', 'Fisherman', 'Flight Attendant', 'Jeweler', 'Judge', 'Lawyer', 'Mechanic', 'Musician', 'Painter', 'Pharmacist', 'Photographer', 'Pilot', 'Plumber', 'Police Officer', 'Politician', 'Programmer', 'Receptionist', 'Salesperson', 'Singer', 'Teacher', 'Translator', 'Videographer', 'Waiter', 'Writer']
  qualifications=["Allergy", "Andrology", "Anesthesiology", "Cardiacsurgery", "Cardiology", "Community", "Dentistry", "Dermatology", "DiabetesandEndocrinology", "E.N.T", "Gastroenterology", "GeneralPractice", "GeneralSurgery", "Gynae/Obs", "Hepatology", "Medicine", "Nephrology", "Neurology", "Neurosurgery", "Nutrition", "Oncology", "Ophthalmology", "Orthopedics", "Paediatricsurgery", "Paediatrics", "Pathology", "Physiotherapy", "PlasticSurgery", "Psychiatry", "PsychologyPulmonology", "Radiology", "Rheumatology", "Urology"]

  persons = [
    {
      name: "Dr Aiman Fairy",
      image: "https://bit.ly/3etyESV",
      gender: "Female",
      age: "24",
      cast: "shah",
      training: "PG Trainee",
      profession: "Psychologist",
      city: "Lahore",
      appearance: "Good Looking",
      color: "White",
      height: "5'5 Tall",
    },
    {
      name: "Dr Aiman Fairy",
      image: "https://bit.ly/3etyESV",
      gender: "Female",
      age: "24",
      cast: "shah",
      training: "PG Trainee",
      profession: "Psychologist",
      city: "Lahore",
      appearance: "Good Looking",
      color: "White",
      height: "5'5 Tall",
    },
    {
      name: "Dr Aiman Fairy",
      image: "https://bit.ly/3etyESV",
      gender: "Female",
      age: "24",
      cast: "shah",
      training: "PG Trainee",
      profession: "Psychologist",
      city: "Lahore",
      appearance: "Good Looking",
      color: "White",
      height: "5'5 Tall",
    },
    {
      name: "Dr Aiman Fairy",
      image: "https://bit.ly/3etyESV",
      gender: "Female",
      age: "24",
      cast: "shah",
      training: "PG Trainee",
      profession: "Psychologist",
      city: "Lahore",
      appearance: "Good Looking",
      color: "White",
      height: "5'5 Tall",
    },
    {
      name: "Dr Aiman Fairy",
      image: "https://bit.ly/3etyESV",
      gender: "Female",
      age: "24",
      cast: "shah",
      training: "PG Trainee",
      profession: "Psychologist",
      city: "Lahore",
      appearance: "Good Looking",
      color: "White",
      height: "5'5 Tall",
    },
    {
      name: "Dr Aiman Fairy",
      image: "https://bit.ly/3etyESV",
      gender: "Female",
      age: "24",
      cast: "shah",
      training: "PG Trainee",
      profession: "Psychologist",
      city: "Lahore",
      appearance: "Good Looking",
      color: "White",
      height: "5'5 Tall",
    },

  ];
  letschat(id: any) {
    this.appService.letschat(this.CurrentUser._id, id).pipe(takeUntil(this.Unsubscribe$)).subscribe((persons) => {
      console.log(persons);
      this.router.navigate(['Chat/' + persons._id]);
    })
    localStorage.setItem("id", id);
  }
  onSendInterestClick(person: User) {
    this.appService.HandleRequest(this.CurrentUser._id, person._id, RequestType.SENDING)
      .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
        this.toasterservice.success("Interest Sent Successfully!");
      })
  }

  AddtoFavClick(person: User) {
    this.appService.AddRemoveFavourite(this.CurrentUser._id, person._id)
      .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
        this.toasterservice.success("Person has been added to Favourites Successfully!");
      })
  }
  getReligion(){
    this.appService.getReligion().subscribe((res:any)=>{
      this.religiousSelect = res;
    })
  }
  getSect(){
    this.appService.getSect().subscribe((res:any)=>{
      this.sectSelect = res;
    })
  }
  filter(name: any) {

    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if (loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);



      this.CurrentUser = JSON.parse(loggedUser);
      console.warn(this.CurrentUser)
      this.appService.filter(this.CurrentUser._id,
        this.MAx,
        this.Min,
        this.country,
        name,
        this.height,
        this.martialstatus, this.province,
        this.professional,
        this.sect, this.city,
        this.religious,

      ).pipe(
        takeUntil(this.Unsubscribe$))
        .subscribe((persons: Array<User>) => {
          this.personList = [];
          this.personList = persons;
          console.warn(this.personList)
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