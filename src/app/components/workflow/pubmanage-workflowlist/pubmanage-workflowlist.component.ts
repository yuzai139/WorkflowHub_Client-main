import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TMembSopListDTO } from 'src/app/interfaces/Workflow/TPublisherSopListDTO';
import { LoginService } from 'src/app/services/Member/login.service';
import { CopyMmbSoptoPubService } from 'src/app/services/Workflow/CopyMmbSopToPubSop/copy-mmb-sopto-pub.service';
import { PublisherSopService } from 'src/app/services/Workflow/publisherSop/publisher-sop.service';
import { TestMemberIdPublisherIdService } from 'src/app/services/Workflow/test-Mmb-Pub-id/test-member-id-publisher-id.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pubmanage-workflowlist',
  templateUrl: './pubmanage-workflowlist.component.html',
  styleUrls: ['./pubmanage-workflowlist.component.css']
})
export class PubmanageWorkflowlistComponent {

  publisherSopList: TMembSopListDTO[] = []; // 定義一個屬性來存放工作流程清單
  coreViewUrl = 'https://localhost:7151';
  dialogVisible: boolean = false; //pop up
  selectedSopId!: number; // 儲存選中的 SOP ID (pop up)
  publisherId:string | null = null;
  searchKeyword: string = ''; // 綁定搜尋欄位

  constructor(
    private publisherSopService: PublisherSopService,
    private sopService: CopyMmbSoptoPubService,
    private loginservice:LoginService,
    private router:Router,

  ){}

  ngOnInit(): void {
    // 初始化時載入 SOP 列表
    this.publisherId = this.loginservice.getPubId();
    this.searchSopList();
    console.log("發佈者Id:",this.publisherId);
  }

  // 新增的 loadPublisherSopList 方法，用來加載 SOP 列表
  // loadPublisherSopList(): void {
  //   this.publisherSopService.getTPublisherSopList(Number(this.publisherId)).subscribe({
  //     next: (data) => {
  //       console.log('成功呼叫 API，獲得資料:', data);
  //       this.publisherSopList = data; // 更新資料
  //     },
  //     error: (error) => {
  //       console.error('呼叫 API 時發生錯誤:', error);
  //     }
  //   });
  // }



  // 搜尋 SOP 列表的方法
  searchSopList(): void {
    if (!this.publisherId) {
      console.error("無法執行搜尋，發佈者 ID 無效。");
      return;
    }

    this.publisherSopService.getPublisherSops(Number(this.publisherId), this.searchKeyword).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
        console.log('搜尋成功，資料如下:', data);
        this.publisherSopList = data; // 更新查詢結果
      } else if (data) {
        // 如果回傳的是物件且有 message 屬性，表示查無結果
        this.publisherSopList = [];
        console.log('查無sop資料');
      }
      },
      error: (error) => {
        console.error('搜尋失敗:', error);
        this.publisherSopList = []; // 查詢失敗時清空列表
      }
    });
  }



    SopEditClick(sopid:number): void {

      if (sopid) {
        const redirectUrl = `${this.coreViewUrl}/SopPublisher/SopPublisherEdit?sopId=${sopid}`
        window.location.href = redirectUrl;
      } else {

        console.log("找不到 SOP 資料。");
      }

    }


    SopDeleteSweetAlert(sopid: number): void {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "確定刪除嗎?",
        text: "此動作不可還原",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確定刪除",
        cancelButtonText: "取消",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // 呼叫刪除 SOP API
          this.publisherSopService.deleteSop(sopid).subscribe({
            next: () => {
              console.log("刪除成功");

              // 更新 SOP 列表資料
              this.refreshSopList();

              // 顯示成功訊息
              swalWithBootstrapButtons.fire({
                title: "已刪除",
                text: "工作流程已刪除",
                icon: "success"
              });
            },
            error: (error) => {
              console.error("刪除失敗:", error.error.message || "發生錯誤");

              // 顯示刪除失敗訊息
              swalWithBootstrapButtons.fire({
                title: "刪除失敗",
                text: "刪除操作未成功",
                icon: "error"
              });
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "刪除已取消",
            text: "你的工作流程是安全的 :)",
            icon: "error"
          });
        }
      });
    }

    // 提取出的更新 SOP 列表的方法
    private refreshSopList(): void {
      this.publisherSopService.getPublisherSops(Number(this.publisherId),this.searchKeyword).subscribe({
        next: (data) => {
          console.log('成功呼叫 API，獲得資料:', data);
          this.publisherSopList = data; // 更新資料至列表
        },
        error: (error) => {
          console.error('更新列表時發生錯誤:', error);
        }
      });
    }




    SopDeleteClick(sopid:number): void {

      // 使用 window.confirm 來顯示確認訊息
      const confirmed = window.confirm('確定要刪除這個工作流程嗎？');
      if (confirmed) {
        this.publisherSopService.deleteSop(sopid).subscribe({
          next: (response) => {
            console.log("刪除成功:", response.message);
            // 可在此更新列表或顯示成功訊息

            //  [ 重新抓現有的sop ]
             this.publisherSopService.getPublisherSops(Number(this.publisherId),this.searchKeyword).subscribe({
               next: (data) => {
                 console.log('成功呼叫 API，獲得資料:', data);
                 this.publisherSopList = data; // 將資料賦值
               },
               error: (error) => {
                 console.error('呼叫 API 時發生錯誤:', error);
               }
             });

          },
          error: (error) => {
            console.error("刪除失敗:", error.error.message || "發生錯誤");
          }
        });
      }
   }

   //pop up
   showDialog() {
    this.dialogVisible = true;
  }

  onSelectionChange(sopId: number) {
    this.selectedSopId = sopId;
    console.log('選中的 SOP ID:', this.selectedSopId);
    this.copySop(this.selectedSopId, Number(this.publisherId));
  }


  //copy sop
  copySop(sopId: number, publisherId: number): void {

      this.sopService.copySop(sopId, publisherId).subscribe({
        next: (response) => {
          console.log('複製成功:', response);
          // alert('複製成功!');
          this.showSuccessAlert();
          // 複製成功後，更新 SOP 列表
          this.searchSopList();
        },
        error: (error) => {
          console.error('複製失敗:', error);
          this.showErrorAlert();
        }
      });

  }


      // 顯示失敗提示
    private showErrorAlert(): void {
      Swal.fire({
        icon: 'error',
        title: '複製失敗！',
        text: '請稍後再試。',
        confirmButtonText: '確定'
      });
    }


  // 訂單完成時的提示
  private showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: '複製工作流程成功！',
      text: '',
      confirmButtonText: '確定'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigate(['/workflow/memberworkflow-index']);
      }
    });
  }


}
