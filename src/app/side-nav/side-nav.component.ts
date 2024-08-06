import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbMenuItem, NbSidebarService} from '@nebular/theme';
import {SignUpService} from "../core/sign-up/sign-up.service";


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
  permissions:string[] =[];
  userId:string;
  name:string;
  designation:string;
  profile: string = '/assets/img.png';

  constructor(private sidebarService:NbSidebarService,
              private signUpService:SignUpService,
              private dialogService: NbDialogService) {}


  // permissions code start //
  ngOnInit(): void {
      let user = JSON.parse(localStorage.getItem('user'));
      user.permissions.push('logout','settings')
      console.log(user);
      this.name = user.name;
      this.designation =user.designation;
      this.userId = user._id;
      console.log(this.userId);
      this.permissions = user.permissions;
      let copyItems = this.items
      this.items = [];
      copyItems.filter((res:any)=>{
        this.permissions.filter((d:any)=>{
          if (d.toUpperCase() == res.title.toUpperCase()){
            this.items.push(res)
            return true;
          }else {
            return false;
          }
        });
      });

    const profileUser = JSON.parse(localStorage.getItem('user'));
    this.userId = profileUser._id;
    this.signUpService.getProfile(this.userId).subscribe(
      (profileBlob: Blob) => {
        const url = window.URL.createObjectURL(profileBlob);
        if (profileBlob.size > 0) {
          this.profile = url;
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
  // permissions code End //
  toggle(){
       this.sidebarService.toggle(true)
    }

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link:"/dashboard/dash"
    },
    {
      title: 'Student',
      icon: 'person-outline',
      link:"/dashboard/student"
    },
    {
      title: 'Conservation',
      icon: {icon: 'suitcase', pack: 'fa'},
      link: "/dashboard/conservation"
    },
    {
      title: 'Expenditure',
      icon: { icon: 'credit-card-outline', pack: 'eva' },
      link:"/dashboard/expenditure"
    },
    {
      title: 'PettyCash',
      icon: { icon: 'inr', pack: 'fa'},
      link:"/dashboard/pettyCash"
    },
    {
      title: 'Installments',
      icon: { icon: 'grid-outline', pack: 'eva' },
      link:"/dashboard/installments"
    },
    {
     title:'Access',
     icon:{ icon: 'checkmark-square-outline', pack: 'eva'  },
      link:"/dashboard/access"
    },
    {
      title:'Settings',
      icon:{ icon: 'settings-outline', pack: 'eva'  },
      link:"/dashboard/settings"
    },
    {
      title: 'Logout',
      icon: 'log-out-outline',
      link:"loginpage",
    },
  ];

}
