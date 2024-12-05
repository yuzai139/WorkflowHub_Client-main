import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { forCreatePublisher, Publisher } from 'src/app/interfaces/lecture-publisher/publisher';
import { PublisherService } from 'src/app/services/lecture-publisher/publisher.service';
import { LoginService } from 'src/app/services/Member/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pubmanage-item',
  templateUrl: './pubmanage-item.component.html',
  styleUrls: ['./pubmanage-item.component.css']
})
export class PubmanageItemComponent {
  // text: string | undefined; //editor

  //-------------------------------------
  constructor(
    private publisherService: PublisherService,
    private loginService: LoginService,
    private router: Router) { }
  //co會員Id，有可能null,希望不要
  memId: number = +this.loginService.getMemberId()!;

  // 定義發布者格式
  publisher: forCreatePublisher = null!
  // 用於存儲圖片預覽的 URL
  imagePreview: string | null = null;

  ngOnInit(): void {
    this.publisher = {
      fPubName: '',
      fPubDescription: '',
      fPubStatus: '未審核',
      fPubImage: null as File | null,
      fMemberId: this.memId,
      fPubLink: '',
      fPubCreateDate: null,
      // fPubImagePath: null,
      // fPublisherId: null
    }
    this.linkObj = {
      fEmail: '',
      fLinkin: '',
      fGithub: ''
    }
  }
  demoData() {
    this.publisher.fPubName = 'Tony';
    this.publisher.fPubDescription = '我喜歡和貓在一起生活，於是促成我成為貓咪Youtuber';
    this.linkObj.fEmail = 'tony0988@gmail.com'
    this.linkObj.fGithub = 'https://github.com/'
    this.linkObj.fLinkin = 'https://tw.linkedin.com/'
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.publisher.fPubImage = input.files[0];

      // 使用 FileReader 讀取文件
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string; // 將結果設置為預覽 URL
      };
      reader.readAsDataURL(this.publisher.fPubImage); // 讀取文件為 Data URL
    }
  }

  // AI FormData版
  createPub() {
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
    formData.append('fPubStatus', this.publisher.fPubStatus)
    if (this.publisher.fPubImage) {
      formData.append('fPubImage', this.publisher.fPubImage)
    }

    //儲存新增資料
    this.publisherService.createPubDataByPost(formData).subscribe(
      {
        next: () => {
          //確認儲存後，將會員id傳給
          this.publisherService.createDataReturnSlidebar(this.publisher.fMemberId);

          // 千琇給，新增發布者成功的sweetAlert2
          Swal.fire({
            icon: 'success',
            title: '發佈者建立成功！',
            text: '提醒您，若您的任一工作流程被購買，即可獲得點數售價的80%分潤金',
            timer: 1500
          }).then(() => {
            this.router.navigate(["pubmanage/profile"])
          }
          );
        }
      })
    console.log(this.publisher.fMemberId);
  }

  cancelCreate() {
    Swal.fire({
      icon: 'error',
      title: '取消新增',
      timer: 1500
    })
    this.router.navigate(["pubmanage/profile"])
  }

  // 新增完儲存click事件，修改發布者資料，暫時不用，原本的儲存按鈕
  // saveByPostApi() {
  //   this.publisher = {
  //     fPubName: this.publisher.fPubName,
  //     fPubDescription: this.publisher.fPubDescription,
  //     fPubCreateDate: null,
  //     fMemberId: this.memId,
  //     fPubImage: null as File | null,//存照片在這
  //     // fPubImagePath: null,
  //     // fPublisherId: null,
  //     fPubStatus: '未審核',
  //     fPubLink: JSON.stringify({
  //       fEmail: this.linkObj.fEmail,
  //       fLinkin: this.linkObj.fLinkin,
  //       fGithub: this.linkObj.fGithub
  //     })
  //   }
  //   console.log('測試用', this.publisher)
  //   return this.publisherService.createPubDataByPost(this.publisher).subscribe()
  // }
  //選圖片



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
