import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TMmbSopCopyListDTO } from 'src/app/interfaces/Workflow/TMmbSopCopyListDTO';
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import { CopyMmbSoptoPubService } from 'src/app/services/Workflow/CopyMmbSopToPubSop/copy-mmb-sopto-pub.service';


@Component({
  selector: 'app-mberworkflow-list',
  templateUrl: './mberworkflow-list.component.html',
  styleUrls: ['./mberworkflow-list.component.css']
})
export class MberworkflowListComponent {

  //此Component當作CopyMemberSopToPublisherSop 的 pup up 使用

  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<number>();

  sops: TMmbSopCopyListDTO[] = []; // 存放從 API 獲取的 SOP 清單
  selectedSop!: TMmbSopCopyListDTO; // 選中的 SOP
  memberId: number | null = null; // 用於儲存取得的 memberId

  constructor(
    private copyMemberSopToPubSopService: CopyMmbSoptoPubService,
    private authGuardService: AuthGuardDemoService
  ) {}



  ngOnInit() {

   this.memberId = this.authGuardService.getMemberId();
    this.copyMemberSopToPubSopService.getSopsByMemberId(Number(this.memberId)).subscribe((data) => {
      this.sops = data;
    });
  }

  showDialog() {
    this.dialogVisible = true;
    this.dialogVisibleChange.emit(this.dialogVisible);
  }

  closeDialog() {
    this.dialogVisible = false;
    this.dialogVisibleChange.emit(this.dialogVisible);
  }

  // 當按下選擇按鈕時，傳遞選中的 FSopid
  selectSop() {
    if (this.selectedSop) {
      this.selectionChange.emit(this.selectedSop.FSopid); // 傳遞選中的 FSopid
      this.closeDialog();
    }
  }
}
