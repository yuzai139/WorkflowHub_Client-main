import { Component } from '@angular/core';
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';

@Component({
  selector: 'app-member-upgrade',
  templateUrl: './member-upgrade.component.html',
  styleUrls: ['./member-upgrade.component.css']
})
export class MemberUpgradeComponent {

  memberId: number | null = null; // 用於儲存取得的 memberId

  constructor(
    private authGuardService: AuthGuardDemoService,
  ) {}

  ngOnInit(): void {
    // 從 authGuardService 中取得 memberId
    this.memberId = this.authGuardService.getMemberId();

  }


}
