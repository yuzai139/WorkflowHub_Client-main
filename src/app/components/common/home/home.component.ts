import { TreeselectService } from './../../../services/lecture-publisher/treeselect.service';
import { sopListDTO } from 'src/app/interfaces/lecture-publisher/home';
import { Swiper } from 'swiper';
import { HomeService } from './../../../services/lecture-publisher/home.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { job, jobClass, jobItem } from 'src/app/interfaces/lecture-publisher/treeSelect';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  constructor(private homeService: HomeService,
    private TreeselectService: TreeselectService
  ) { }
  //輪播圖
  images = [
    '../../../../assets/lecture-publisher/work001.webp',
    '../../../../assets/lecture-publisher/work002.webp',
    '../../../../assets/lecture-publisher/work003.webp',
    '../../../../assets/lecture-publisher/work004.webp'
  ];
  // 存sop
  sopList: sopListDTO[] = []
  // 用於存儲搜尋關鍵字
  searchTerm: string = '';
  // 過濾後的數據
  filteredItems: any[] = [];

  //TreeSelect 篩選
  // selectedNodes: any;
  // treeData: TreeNode[] = [];
  // firstLevelData: TreeNode[] = [];
  // secondLevelData: TreeNode[] = [];
  // thirdLevelData: TreeNode[] = [];
  jobClass: jobClass[] = []; // 第一層數據
  selectedJobClass: jobClass | null = null;
  job: job[] = []; // 第二層數據
  selectedJob: job | null = null;
  jobItem: jobItem[] = []; // 第三層數據

  // selectedFirstLevel: jobClass | null = null;
  // selectedSecondLevel: job | null = null;
  ngOnInit(): void {
    this.loadData()
    this.TreeselectService.getFirstLevelData().subscribe((data) => {
      this.jobClass = data
    })
  }
  //將Id傳去service
  selectedIdToService(fSOPID: number) {
    console.log(fSOPID)
    return this.homeService.setSopId(fSOPID)
  }

  //將商品加入購物車
  addToCart(item: any) {
    const cartItem = JSON.parse(localStorage.getItem('cartItems') || '[]');

    //檢查購物車裡是否有商品
    const existingItem = cartItem.find((cartItem: any) => cartItem.fSOPID === item.fSOPID);

    if (existingItem) {
      // 如果商品已存在，顯示提示訊息
      Swal.fire({
        icon: 'warning',
        title: '商品已在購物車中',
        text: '每個商品限購一件',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      // 如果商品不存在，添加新商品
      cartItem.push({
        ...item,
        quantity: 1
      });

      //更新localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItem));

      // 顯示成功加入購物車的提示
      Swal.fire({
        icon: 'success',
        title: '已加入購物車',
        text: '商品已成功加入購物車',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  //class to job to item
  onJobClassSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // 將事件對象轉換為HTMLSelectElement
    const selectedJobClassId = Number(selectElement.value); // 獲取選中的值並轉換為數字

    this.TreeselectService.getSecondLevelData(selectedJobClassId).subscribe((data) => {
      this.job = data
      console.log(data)

    })
  }
  onJobSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedJobItemId = Number(selectElement.value);
    console.log(selectedJobItemId)
    this.TreeselectService.getThirdLevelData(selectedJobItemId).subscribe((data) => {
      this.jobItem = data
    })
  }
  onJobItemSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedJobItemId = Number(selectElement.value);
    this.TreeselectService.getJobItemSop(selectedJobItemId).subscribe((data) => {
      this.sopList = data
    })
  }
  // onFirstLevelSelect(event: any): void {
  //   this.selectedFirstLevel = event.node;

  //   // 根據選中的第一層節點獲取第二層數據
  //   if (this.selectedFirstLevel && this.selectedFirstLevel.fJobClassId) {
  //     this.TreeselectService.getSecondLevelData(this.selectedFirstLevel.fJobClassId).subscribe(data => {
  //       this.secondLevelData = convertToJobNodes(data);
  //       this.thirdLevelData = []; // 清空第三層數據
  //       this.selectedSecondLevel = null; // 重置選中的第二層
  //     });
  //   }
  // }

  // onSecondLevelSelect(event: any): void {
  //   this.selectedSecondLevel = event.node;
  //   console.log(event)

  //   // 根據選中的第二層節點獲取第三層數據
  //   if (this.selectedSecondLevel && this.selectedSecondLevel.fJobId) {
  //     this.TreeselectService.getThirdLevelData(this.selectedSecondLevel.fJobId).subscribe(data => {
  //       this.thirdLevelData = convertToJobItemNodes(data);
  //     });
  //   }
  // }


  //call 全部sop
  loadData() {
    this.homeService.getApiSopList().subscribe((data) => {
      this.sopList = data
    })
  }

  filterData() {
    // 根據搜尋關鍵字過濾數據
    // this.filteredItems = this.sopList.filter(item =>
    //   item.fSopName.toLowerCase().includes(this.searchTerm.toLowerCase())
    // );
    if (this.searchTerm) {
      this.homeService.getSerch(this.searchTerm).subscribe((data) => {
        this.sopList = data
      })
    }
    else {
      this.loadData();
      this.job.length = 0
      this.jobItem.length = 0
      this.jobClass[0]
    }
  }
}
// interface TreeNode {
//   label: string;       // 顯示的文本
//   data: any;          // 相關數據
//   children?: TreeNode[]; // 子節點
// }
// function convertToTreeNode(apiJobClasses: jobClass[]): TreeNode[] {
//   return apiJobClasses.map(jobClass => ({
//     label: jobClass.fJobClass, // 將API的name映射到TreeNode的label
//     data: { id: jobClass.fJobClassId }, // 將API的id和sortOrder映射到data
//     children: jobClass.children ? convertToJobNodes(jobClass.children) : [] // 轉換子工作
//   }));
// }

// function convertToJobNodes(apiJobs: job[]): TreeNode[] {
//   return apiJobs.map(job => ({
//     label: job.fJob, // 將API的name映射到TreeNode的label
//     data: { id: job.fJobId, jobClassId: job.fJobClassId }, // 將API的id和jobClassId映射到data
//     children: job.children ? convertToJobItemNodes(job.children) : [] // 轉換子工作項
//   }));
// }

// function convertToJobItemNodes(apiJobItems: jobItem[]): TreeNode[] {
//   return apiJobItems.map(item => ({
//     label: item.fJobItem, // 將API的name映射到TreeNode的label
//     data: { id: item.fJobItemId }, // 將API的id映射到data
//     // 子工作項通常不會有子項，因此這裡不需要children
//   }));
// }

