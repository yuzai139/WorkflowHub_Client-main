import { Component } from '@angular/core';
import { IMember } from 'src/app/interfaces/Member/IMember';
import { IMemberSignin } from 'src/app/interfaces/Member/IMemberSignin';
import { SettingsService } from 'src/app/services/Member/settings.service';

@Component({
  selector: 'app-member-setting',
  templateUrl: './member-setting.component.html',
  styleUrls: ['./member-setting.component.css']
})
export class MemberSettingComponent {

  iMemberSignin: IMemberSignin = {
    fMemberID: 13,
    fName: '',
    fBirthday: '',
    fPhone: '',
    fEmail: '',
    fAddress: '',
    fPassword: '',

    fPermissions: '',
    fMemberPoints: 0,
    fMemberShip: false,
    fMailVerify: false,
    fSOPExp: 0
  };

  message: string = '';

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    // const memberId = 1;
    this.settingsService.getMemberById(this.iMemberSignin.fMemberID).subscribe({
      next: (data) => {
        this.iMemberSignin = data;
      },
      error: (err) => {
        console.error('Error fetching member data:', err);
      },
    });// 可在此加載會員資料進行初始化
  }

  updateMember(): void {
    this.settingsService.updateMember(this.iMemberSignin).subscribe({
      next: (response) => {
        this.message = '會員資料已更新成功！';
      },
      error: (err) => {
        this.message = '更新失敗，請再試一次。';
      }
    });
  }

}
