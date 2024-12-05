import { HomeService } from './../../../services/lecture-publisher/home.service';
import { ActivatedRoute } from '@angular/router';
import { Publisher } from 'src/app/interfaces/lecture-publisher/publisher';
import { PublisherService } from 'src/app/services/lecture-publisher/publisher.service';
import { Component, OnInit } from '@angular/core';
import { sopListDTO } from 'src/app/interfaces/lecture-publisher/home';

@Component({
  selector: 'app-publisher-profile',
  templateUrl: './publisher-profile.component.html',
  styleUrls: ['./publisher-profile.component.css']
})
export class PublisherProfileComponent {
  constructor(
    private PublisherService: PublisherService,
    private ActivatedRoute: ActivatedRoute,
    private HomeService: HomeService
  ) { }
  //街該頁發布者資訊
  Publisher: Publisher = null!
  //接此頁發布者的sop清單
  pubSopList: sopListDTO[] = []
  // 用於存儲圖片預覽的 URL
  imagePreview: string | null = null;
  sopImagePreview: string | null = null;

  ngOnInit(): void {
    const pubId: number = +this.ActivatedRoute.snapshot.paramMap.get('pubId')!

    this.PublisherService.getApiPublisher(pubId).subscribe({
      next: (data) => {
        this.Publisher = data
        console.log('發布者檔案', data)
        this.linkObj = JSON.parse(this.Publisher.fPubLink)
        // this.imagePreview = `data:image/jpeg;base64,${data.fPubImagePath}`; // MIME限制，假設後端返回 Base64 字符串
        this.imagePreview = data.fPubImageUrl; // MIME限制，假設後端返回 Base64 字符串

        this.HomeService.getPubList(data.fPublisherId).subscribe((data) => {
          this.pubSopList = data
          console.log('該發布者的SOP', this.pubSopList)
        })
      }
    })

  }

  selectedIdToService(sopId: number) {

  }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.Publisher.fPubImage = input.files[0];

  //     // 圖片預覽，使用 FileReader 讀取文件
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.imagePreview = e.target?.result as string; // 將結果設置為預覽 URL
  //     };
  //     reader.readAsDataURL(this.Publisher.fPubImage); // 讀取文件為 Data URL
  //   }
  // }

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

