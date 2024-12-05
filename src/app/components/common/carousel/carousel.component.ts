import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() images: string[] = [];
  currentIndex: number = 0;
  intervalId: any; // 用於存儲 setInterval 的 ID

  constructor() { }

  ngOnInit() {
    // 啟動自動播放
    this.startAutoPlay();
  }

  ngOnDestroy() {
    // 清除定時器以防止內存洩漏
    this.stopAutoPlay();
  }

  next() {
    this.stopAutoPlay()
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.startAutoPlay()
  }

  prev() {
    this.stopAutoPlay()
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.startAutoPlay()
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.next(); // 每次自動播放時調用 next 方法
    }, 3000); // 每 3 秒自動切換圖片
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // 清除定時器
    }
  }
}
