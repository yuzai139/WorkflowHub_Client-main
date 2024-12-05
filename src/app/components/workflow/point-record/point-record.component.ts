import { Component } from '@angular/core';
import { TPointRecordDTO } from 'src/app/interfaces/Workflow/TPointRecordDTO';
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import { PointRecordService } from 'src/app/services/Workflow/point-record/point-record.service';

@Component({
  selector: 'app-point-record',
  templateUrl: './point-record.component.html',
  styleUrls: ['./point-record.component.css']
})
export class PointRecordComponent {

  memberId: number | null = null; // 用於儲存取得的 memberId
  memberPoint: number = 0;
  pointRecordList:TPointRecordDTO[] = [];

  constructor(
    private authGuardService: AuthGuardDemoService,
    private pointRecordService: PointRecordService,
  ) {}

  ngOnInit(): void {
    // 從 authGuardService 中取得 memberId
    this.memberId = this.authGuardService.getMemberId();

    // 確認 memberId 是否存在，若不存在會自動跳轉至登入頁面
    if (this.memberId) {
      this.updateMemberPoint();
      this.updatePointRecordList();
    }
  }

  updateMemberPoint(): void{
    this.pointRecordService.getTMemberPoint(Number(this.memberId)).subscribe({
      next: (data) => {
        console.log('成功呼叫 API，獲得會員點數資料:', data);
        this.memberPoint = Number(data.FMemberPoints); // 將資料賦值
      },
      error: (error) => {
        console.error('呼叫會員點數 API 時發生錯誤:', error);
      }
    });
  }

  // 更新 SOP 清單的方法
  updatePointRecordList(): void {
    this.pointRecordService.getTPointRecordList(Number(this.memberId)).subscribe({
      next: (data) => {
        console.log('成功呼叫 API，獲得點數紀錄資料:', data);
        this.pointRecordList = data; // 將資料賦值
      },
      error: (error) => {
        console.error('呼叫點數紀錄 API 時發生錯誤:', error);
      }
    });
  }

  // 刪除 SOP 的方法
  PointRecordDeleteClick(pointRecordId: number): void {
    const confirmed = window.confirm('確定要刪除此點數紀錄嗎？');
    if (confirmed) {
      this.pointRecordService.deletePointRecord(pointRecordId).subscribe({
        next: (response) => {
          console.log('刪除成功:', response);
          this.updatePointRecordList();
        },
        error: (error) => {
          console.error('刪除失敗:', error);
          alert('刪除失敗，請稍後再試');
        }
      });
    }
  }


}
