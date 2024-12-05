import { HttpClient } from '@angular/common/http';
import { PublisherService } from 'src/app/services/lecture-publisher/publisher.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publisher } from 'src/app/interfaces/lecture-publisher/publisher';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/Member/login.service';
@Component({
  selector: 'app-pubmanage-profile',
  templateUrl: './pubmanage-profile.component.html',
  styleUrls: ['./pubmanage-profile.component.css']
})
export class PubmanageProfileComponent {
  // text: string | undefined; //editor

  isEdit: boolean = false; //編輯按鈕切換
  isEditClick() {
    this.isEdit = !this.isEdit;
  }
  isCreate: boolean = true;
  changePage() {
    this.isCreate = !this.isCreate;
  }
  //-------------------------------------
  constructor(private route: ActivatedRoute,
    private publisherService: PublisherService,
    private loginService: LoginService) { }

  // 定義發布者格式
  publisher: Publisher = null!
  // 用於存儲圖片預覽的 URL
  imagePreview: string | null = null;

  //co會員Id，有可能null,希望不要
  memId: number = +this.loginService.getMemberId()!;

  ngOnInit(): void {
    // 以rxjs的behaviorSubject做資料跨component的綁訂
    this.publisherService.pubIdSubject.subscribe((pubId) => {

      this.publisherService.getApiPublisher(pubId).subscribe((data) => {
        this.publisher = {
          // 欄位清空
          fPublisherId: pubId,
          fMemberId: this.memId,//測試寫1
          fPubName: '',
          fPubDescription: '',
          // fPubCreateDate: '',
          fPubImage: File as any | null,
          fPubImageUrl: '',
          fPubImagePath: '',
          // fPubStatus: '未審核',
          fPubLink: JSON.stringify({
            fEmail: '',
            fLinkin: '',
            fGithub: ''
          })
        }
        this.linkObj = {
          fEmail: '',
          fLinkin: '',
          fGithub: ''
        }
        this.imagePreview = null

        this.publisher = data
        this.linkObj = JSON.parse(this.publisher.fPubLink)
        // this.imagePreview = `data:image/jpeg;base64,${data.fPubImagePath}`; // MIME限制，假設後端返回 Base64 字符串
        this.imagePreview = data.fPubImageUrl;
      })
    })
    //先拿到數字給subject
    this.publisherService.getApiPublisherList(this.memId).subscribe((data) => {
      this.publisher = data[0];

    })
  }

  //圖片用
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.publisher.fPubImage = input.files[0];

      // 圖片預覽，使用 FileReader 讀取文件
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string; // 將結果設置為預覽 URL
      };
      reader.readAsDataURL(this.publisher.fPubImage); // 讀取文件為 Data URL
    }
  }

  //取消修改要show出原資料
  showPubProfile(pubId: number) {
    this.publisherService.getApiPublisher(pubId).subscribe((data) => {
      this.publisher = data
      this.linkObj = JSON.parse(this.publisher.fPubLink)
      Swal.fire({
        icon: "error",
        title: "取消修改",
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  // 編輯完儲存click事件，修改發布者資料
  editByPutApi() {
    const formData = new FormData();
    formData.append('fMemberId', this.publisher.fMemberId.toString());
    formData.append('fPubName', this.publisher.fPubName);
    formData.append('fPubDescription', this.publisher.fPubDescription);
    formData.append('fPubLink', this.publisher.fPubLink =
      JSON.stringify({
        fEmail: this.linkObj.fEmail,
        fLinkin: this.linkObj.fLinkin,
        fGithub: this.linkObj.fGithub
      }));
    if (this.publisher.fPubImage) {
      formData.append('fPubImage', this.publisher.fPubImage)
    }
    console.log(this.publisher.fPublisherId)
    return this.publisherService.editPubDataByPut(formData, this.publisher.fPublisherId).subscribe({
      next: () => {
        this.publisherService.getApiPublisher(this.publisher.fPublisherId).subscribe((data) => {
          this.publisher = data;
          console.log(this.publisher)
        })
        Swal.fire({
          icon: "success",
          title: "發佈者修改成功！",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err) => {
        // 錯誤處理
        console.error("更新失敗", err);
        Swal.fire({
          icon: "error",
          title: "發佈者修改失敗，請稍後再試一次",
          text: err.message,
        });
      }
    })
  }


  //千琇給，新增發布者成功的sweetAlert2
  // Swal.fire({
  //   icon: 'success',
  //   title: '發佈者建立成功！',
  //   text: '提醒您，若您的任一工作流程被購買，即可獲得點數售價的80%分潤金',
  //   confirmButtonText: '確定'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     // 可以選擇是否要導向其他頁面
  //   }
  // });

  //定義連結物件 link
  linkObj: link = {
    fEmail: '',
    fLinkin: '',
    fGithub: ''
  }
}
interface link {
  fEmail: string
  fLinkin: string
  fGithub: string
}



