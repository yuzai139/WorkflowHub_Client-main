import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMemberSignin } from 'src/app/interfaces/Member/IMemberSignin';
import { SigninService } from 'src/app/services/Member/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  fName: string = '';
  fBirthday: string = '';
  fEmail: string = '';
  fPhone: string = '';
  fAddress: string = '';
  fPassword: string = '';
  fMemberID: number = 0;

  iMemberSignin: IMemberSignin = {
    fName: this.fName,
    fBirthday: this.fBirthday,
    fEmail: this.fEmail,
    fPhone: this.fPhone,
    fAddress: this.fAddress,
    fPassword: this.fPassword,
    fMemberID: this.fMemberID,
    fPermissions: '',
    fMemberPoints: 0,
    fMemberShip: false,
    fMailVerify: false,
    fSOPExp: 0
  };

  constructor(private signinService: SigninService, private router: Router) { }

  onSubmit() {
    this.signinService.register(this.iMemberSignin).subscribe({
      next: (response: IMemberSignin) => {
        alert('註冊成功');
        console.log('response.fEmail=>' + response.fEmail);
        this.router.navigate(['/login']);
      },
      error: (error: Error) => {
        console.error('註冊失敗:', error);
        alert('註冊失敗');
      }
    });
  }

  demoSignin(){
    this.iMemberSignin.fName = 'Mary';
    this.iMemberSignin.fEmail = 'Mary@yahoo.com';
    this.iMemberSignin.fBirthday = '2003-09-15';
    this.iMemberSignin.fPhone = '0912345678';
    this.iMemberSignin.fAddress = '台北市';
    this.iMemberSignin.fPassword = '123';
  }



}
