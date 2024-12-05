import { Component } from '@angular/core';
import { Publisher } from 'src/app/interfaces/lecture-publisher/publisher';
import { PublisherService } from 'src/app/services/lecture-publisher/publisher.service';
import { LoginService } from 'src/app/services/Member/login.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {

  // 引入publisher.Service
  constructor(private publisherService: PublisherService,
    private loginService: LoginService
  ) { }

  //定義發布者型態物件，接收API回傳資料用
  publisherList: Publisher[] = [];

  //co會員Id，有可能null,希望不要

  memId: number = +this.loginService.getMemberId()!;


  //頁面初始化取得API回傳發布者資料
  ngOnInit(): void {
    this.publisherService.sliderbarList.subscribe((data) => this.publisherList = data);
    this.publisherService.createDataReturnSlidebar(this.memId);
    // this.publisherService.getApiPublisherList(this.memId).subscribe((data) => {
    //   this.publisherList = data
    //   console.log('slideBarPub', data); //檢查API回傳正常
    //   console.log('slideBarmemId', this.memId);
    // });
  }

  //寫在html方法，用於取得發布者Id，預計給右邊profile使用
  getPublisherId(publisherId: number) {
    console.log(publisherId);//測試ID選取正常
    //subscribe我的pubIdSubject(behaviorSubject)
    this.publisherService.pubIdSubject.next(publisherId)
    //pubid給千琇，存進userService的localStorage，key一樣應該會蓋過去吧
    this.loginService.savePubId(publisherId.toString())
    console.log('localstrage pudId ' + this.loginService.getPubId())
  }

}
