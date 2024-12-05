import { TMembSopList } from 'src/app/interfaces/Workflow/TMembSopList';
import { MemberSopService } from '../../../services/Workflow/memberSop/member-sop.service';
import { Component } from '@angular/core';
import { TMemberSopDTO } from 'src/app/interfaces/Workflow/TMemberSopDTO';
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mberworkflow-index',
  templateUrl: './mberworkflow-index.component.html',
  styleUrls: ['./mberworkflow-index.component.css']
})
export class MberworkflowIndexComponent {

  MemberSopList: TMembSopList[] = []; // 定義一個屬性來存放工作流程清單
  coreViewUrl = 'https://localhost:7151';
  memberId: number | null = null; // 用於儲存取得的 memberId

  constructor(
    private memberSopService: MemberSopService,
    private authGuardService: AuthGuardDemoService
  ) {}


  ngOnInit(): void {
    // 從 authGuardService 中取得 memberId
    this.memberId = this.authGuardService.getMemberId();

    if (this.memberId) {
      // 呼叫 API 獲取工作流程清單
      this.updateSopList();
    }
  }

  // 更新 SOP 清單的方法
  updateSopList(): void {
    this.memberSopService.getApiTMemberSopList(Number(this.memberId)).subscribe({
      next: (data) => {
        console.log('成功呼叫 API，獲得資料:', data);
        this.MemberSopList = data; // 將資料賦值
      },
      error: (error) => {
        console.error('呼叫 API 時發生錯誤:', error);
      }
    });

  }//ngOnInit End

  CreateSopClick(): void {

    if (!this.memberId) return; // 若無 memberId 則停止操作
    // 呼叫 POST 方法來建立新的 SOP
    this.memberSopService.createSop(Number(this.memberId)).subscribe({
      next: (newSopData: TMemberSopDTO) => {
        console.log("API 回應資料：", newSopData);

        if (newSopData && newSopData.FSopid) {
          console.log("已建立新的SOP資料");

          // 取得返回的 SOP ID 並跳轉到編輯頁面
          const redirectUrl = `${this.coreViewUrl}/SopMember/SopMemberEdit?sopId=${newSopData.FSopid}`
          window.location.href = redirectUrl;
        } else {

          console.log("找不到 SOP 資料。");
        }
      },
      error: (error) => {
        console.error("新增 SOP 資料時發生錯誤:", error);
      }
    });
  }

  SopEditClick(sopid:number): void {

    if (sopid) {
      const redirectUrl = `${this.coreViewUrl}/SopMember/SopMemberEdit?sopId=${sopid}`
      window.location.href = redirectUrl;
    } else {

      console.log("找不到 SOP 資料。");
    }

  }



  // 刪除 SOP 的方法
  SopDeleteClick(sopid: number): void {
    const confirmed = window.confirm('確定要刪除這個工作流程嗎？');
    if (confirmed && this.memberId) {
      this.memberSopService.deleteSop(sopid).subscribe({
        next: (response) => {
          console.log("刪除成功:", response.message);
          this.updateSopList(); // 刪除成功後更新 SOP 清單
        },
        error: (error) => {
          console.error("刪除失敗:", error.error.message || "發生錯誤");
        }
      });
    }
  }



  // 使用 SweetAlert2 進行刪除確認的 SOP 刪除方法
  SopDeleteSweetAlert(sopid: number): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    // 顯示刪除確認彈窗
    swalWithBootstrapButtons.fire({
      title: "確定刪除嗎?",
      text: "此動作不可還原",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確定刪除",
      cancelButtonText: "取消",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed && this.memberId) {
        // 如果確認刪除且 memberId 存在，則呼叫刪除 API
        this.memberSopService.deleteSop(sopid).subscribe({
          next: (response) => {
            console.log("刪除成功:", response.message);

            // 顯示刪除成功訊息並更新 SOP 列表
            swalWithBootstrapButtons.fire({
              title: "已刪除",
              text: "工作流程已刪除",
              icon: "success"
            });

            // 更新 SOP 列表
            this.updateSopList();
          },
          error: (error) => {
            console.error("刪除失敗:", error.error.message || "發生錯誤");

            // 顯示刪除失敗的錯誤訊息
            swalWithBootstrapButtons.fire({
              title: "刪除失敗",
              text: "刪除操作未成功，請稍後再試",
              icon: "error"
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // 使用者取消操作，顯示取消訊息
        swalWithBootstrapButtons.fire({
          title: "刪除已取消",
          text: "你的工作流程是安全的 :)",
          icon: "error"
        });
      }
    });
  }


}
