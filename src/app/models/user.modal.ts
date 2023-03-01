export interface UserResponse {
    message: string
    user: User
}

export interface User {
    
    _id?: string;
    email?: string
    personalContact?: string
    parentContact?: string
    socialLinkFb?: string
    socialLinkInsta?: string
    socialLinkTwitter?: string
    name?: string
    profileCreated?: string
    gender?: string
    age?: string
    status?: string
    religious?: string
    otherreligion?: any
    sect?: any
    caste?: string
    religiousStatus?: string
    clan?: string
    montherTonque?: string
    looks?: string
    complexion?: string
    height?: any
    build?: string
    hobbies?: string
    country?: string
    province?: any
    city?: any
    house?: string
    nationality?: string
    futurePlans?: string
    professional?: string
    anotherqualification?: string
    specialties?: any
    qualification?: any
    institution?: string
    income?: string
    professionalInfo?: string
    fatherOccuption?: string
    motherOccuption?: string
    siblingsCountSisters?: string
    siblingsCountBrothers?: string
    socialEconomic?: string
    familyInfo?: string
    jobStatus?: string;
    workplace?: string;
    resetToken?: string;
    active?: boolean;
    password?: string;
    __v?: number;
    favourites?: string[];
    requests?: any[];
    BlockStatus?: boolean;
    image?: string;
    training?: string;
    appearance?: string;
    LoginStatus?: boolean;
    Activenotification?: boolean;
    latestnews?: boolean;
    featurestatus?: boolean;
    Profilestatus?: boolean;
    numberstatus?: boolean;
    color?: string;
    distance?: string;
    connect?:Number;
    Block?:[];
    approve?:boolean;
    packageExpiry?:string;
    packageDate?:string;
  }
  

