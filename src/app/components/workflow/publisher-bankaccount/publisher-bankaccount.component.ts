import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 引入 Angular Router
import { AuthGuardDemoService } from 'src/app/services/Workflow/auth-guard-demo/auth-guard-demo.service';
import Swal from 'sweetalert2';  // 引入 SweetAlert2

@Component({
  selector: 'app-publisher-bankaccount',
  templateUrl: './publisher-bankaccount.component.html',
  styleUrls: ['./publisher-bankaccount.component.css'],


})
export class PublisherBankaccountComponent {


  memberId:number | null = null;


  constructor(
              private authGuardService: AuthGuardDemoService,
              private router: Router, // 注入 Router
  ) {}

ngOnInit(){
    this.memberId = this.authGuardService.getMemberId();
}




}



