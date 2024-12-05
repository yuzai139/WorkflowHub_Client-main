import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/member/login/login.component';
import { SigninComponent } from './components/member/signin/signin.component';
import { SigninCompletedComponent } from './components/member/signin-completed/signin-completed.component';
import { WelcomeComponent } from './components/member/welcome/welcome.component';
import { MemberSettingComponent } from './components/member/member-setting/member-setting.component';
import { ForgetpasswordComponent } from './components/member/forgetpassword/forgetpassword.component';
import { FavoriteComponent } from './components/member/favorite/favorite.component';
import { HomeComponent } from './components/common/home/home.component';
import { NotfoundPageComponent } from './components/common/notfound-page/notfound-page.component';
import { MberworkflowIndexComponent } from './components/workflow/mberworkflow-index/mberworkflow-index.component';
import { MberworkflowListComponent } from './components/workflow/mberworkflow-list/mberworkflow-list.component';
import { MberworkflowItemComponent } from './components/workflow/mberworkflow-item/mberworkflow-item.component';
import { MemberUpgradeComponent } from './components/workflow/member-upgrade/member-upgrade.component';
import { PublisherBankaccountComponent } from './components/workflow/publisher-bankaccount/publisher-bankaccount.component';
import { PublisherWorkflowlistComponent } from './components/workflow/publisher-workflowlist/publisher-workflowlist.component';
import { PubmanageWorkflowComponent } from './components/workflow/pubmanage-workflow/pubmanage-workflow.component';
import { PubmanageWorkflowlistComponent } from './components/workflow/pubmanage-workflowlist/pubmanage-workflowlist.component';
import { WkflowmarketIndexComponent } from './components/workflow/wkflowmarket-index/wkflowmarket-index.component';
import { WkflowmarketListComponent } from './components/workflow/wkflowmarket-list/wkflowmarket-list.component';
import { WkflowmarketProductComponent } from './components/workflow/wkflowmarket-product/wkflowmarket-product.component';
import { WkflowmarketSearchresultComponent } from './components/workflow/wkflowmarket-searchresult/wkflowmarket-searchresult.component';
import { LectureProductComponent } from './components/lecture-publisher/lecture-product/lecture-product.component';
import { LectureSerchComponent } from './components/lecture-publisher/lecture-serch/lecture-serch.component';
import { LectureShopComponent } from './components/lecture-publisher/lecture-shop/lecture-shop.component';
import { LectureTicketsComponent } from './components/lecture-publisher/lecture-tickets/lecture-tickets.component';
import { PublisherLecturelistComponent } from './components/lecture-publisher/publisher-lecturelist/publisher-lecturelist.component';
import { PublisherMainComponent } from './components/lecture-publisher/publisher-main/publisher-main.component';
import { PublisherProfileComponent } from './components/lecture-publisher/publisher-profile/publisher-profile.component';
import { PublisherSerchComponent } from './components/lecture-publisher/publisher-serch/publisher-serch.component';
import { PubmanageItemComponent } from './components/lecture-publisher/pubmanage-item/pubmanage-item.component';
import { PubmanageLecturelistComponent } from './components/lecture-publisher/pubmanage-lecturelist/pubmanage-lecturelist.component';
import { PubmanageMainComponent } from './components/lecture-publisher/pubmanage-main/pubmanage-main.component';
import { PubmanageProfileComponent } from './components/lecture-publisher/pubmanage-profile/pubmanage-profile.component';
import { CartComponent } from './components/order/cart/cart.component';
import { OrderComponent } from './components/order/order/order.component';
import { OrderBackupComponent } from './components/order/order-backup/order-backup.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { ForumComponent } from './components/forum/forum/forum.component';
import { ForumBackupComponent } from './components/forum/forum-backup/forum-backup.component';
import { ForumDetailComponent } from './components/forum/forum-detail/forum-detail.component';
import { ForumListComponent } from './components/forum/forum-list/forum-list.component';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { CanvaLayoutComponent } from './components/layout/canva-layout/canva-layout.component';
import { SlidebarLayoutComponent } from './components/layout/slidebar-layout/slidebar-layout.component';
import { AuthGuard } from './auth/auth.guard'; // 路由守衛
import { DuplicateSopPopupComponent } from './components/workflow/duplicate-sop-popup/duplicate-sop-popup.component';
import { PointOrderComponent } from './components/workflow/point-order/point-order.component';
import { PointRecordComponent } from './components/workflow/point-record/point-record.component';
import { OrderCheckedTestComponent } from './components/workflow/order-checked-test/order-checked-test.component';
import { OrderPrepareTestComponent } from './components/workflow/order-prepare-test/order-prepare-test.component';
import { OrderNotifyTestComponent } from './components/workflow/order-notify-test/order-notify-test.component';
import { OrderSuccessTestComponent } from './components/workflow/order-success-test/order-success-test.component';
import { PaymentConfirmComponent } from './components/order/payment-confirm/payment-confirm.component';
import { PaymentCancelComponent } from './components/order/payment-cancel/payment-cancel.component';


const routes: Routes = [

  {
    path: '', redirectTo: 'login',  // 預設重定向到 login
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginLayoutComponent, // 使用 login 佈局
    children: [
      {
        path: '', // 預設為 login 頁面
        component: LoginComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signin-completed',
        component: SigninCompletedComponent
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      {
        path: 'forget-password',
        component: ForgetpasswordComponent
      }
    ]
  },
  {
    path: 'member',
    component: MainLayoutComponent, //使用main layout
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'member-setting',
        component: MemberSettingComponent
      },
      {
        path: 'favorite',
        component: FavoriteComponent
      },
    ]
  },
  {
    path: 'workflow',
    component: MainLayoutComponent, //使用main layout
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'memberworkflow-index',//我的工作流程
        component: MberworkflowIndexComponent
      },
      {
        path: 'memberworkflow-list',
        component: MberworkflowListComponent
      },
      {
        path: 'member-upgrade',
        component: MemberUpgradeComponent
      },
      {
        path: 'publisher-bankaccount',
        component: PublisherBankaccountComponent
      },
      {
        path: 'publisher-workflow-list',
        component: PublisherWorkflowlistComponent
      },
      {
        path: 'publishermanage-workflowlist',
        component: PubmanageWorkflowlistComponent
      },
      {
        path: 'workflowmarket-index',
        component: WkflowmarketIndexComponent
      },
      {
        path: 'workflowmarket-list',
        component: WkflowmarketListComponent
      },
      {
        path: 'workflowmarket-product/:sopId',
        component: WkflowmarketProductComponent
      },
      {
        path: 'workflowmarket-searchresult',
        component: WkflowmarketSearchresultComponent
      },
      {
        path: 'duplicate-sop-popup',
        component: DuplicateSopPopupComponent
      },
    ]
  },
  {
    path: 'workflow-canva',
    component: CanvaLayoutComponent, //使用canva layout
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'memberworkflow-item',
        component: MberworkflowItemComponent
      },
      {
        path: 'publishermanage-workflow',
        component: PubmanageWorkflowComponent
      },
    ]
  },
  {
    path: 'point',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'order',
        component: PointOrderComponent
      },
      {
        path: 'record',
        component: PointRecordComponent
      },
    ]
  },
  {
    path: 'moneyflow',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'order-check-test',
        component: OrderCheckedTestComponent
      },
      {
        path: 'order-prepare-test',
        component: OrderPrepareTestComponent
      },
      {
        path: 'order-notify-test',
        component: OrderNotifyTestComponent
      },
      {
        path: 'order-success-test',
        component: OrderSuccessTestComponent
      },
    ]
  },
  {
    path: 'lecture',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'product',
        component: LectureProductComponent
      },
      {
        path: 'search',
        component: LectureSerchComponent
      },
      {
        path: 'shop',
        component: LectureShopComponent
      },
      {
        path: 'tickets',
        component: LectureTicketsComponent
      }
    ]
  },
  {
    path: 'publisher',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'lecture-list',
        component: PublisherLecturelistComponent
      },
      {
        path: 'main',
        component: PublisherMainComponent
      },
      {
        path: 'profile/:pubId',
        component: PublisherProfileComponent
      },
      {
        path: 'search',
        component: PublisherSerchComponent
      }
    ]
  },
  {
    path: 'pubmanage',
    component: SlidebarLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'item',
        component: PubmanageItemComponent
      },
      {
        path: 'lecture-list',
        component: PubmanageLecturelistComponent
      },
      {
        path: 'main',
        component: PubmanageMainComponent
      },
      {
        path: 'profile',
        component: PubmanageProfileComponent
      },
    ]
  },
  {
    path: 'order',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'backup',
        component: OrderBackupComponent
      },
      {
        path: 'detail/:orderId',
        component: OrderDetailComponent
      },
    ]
  },
  {
    path: 'forum',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'forum',
        component: ForumComponent
      },
      {
        path: 'backup/:fCategoryNumber', // 這是用來處理新增文章的路由
        component: ForumBackupComponent
      },
      {
        path: 'backup/:fCategoryNumber/:fArticleID', // 這是用來處理修改文章的路由
        component: ForumBackupComponent
      },

      {
        path: 'detail/:fArticleID',
        component: ForumDetailComponent
      },
      {
        path: 'list/:fCategoryNumber',
        component: ForumListComponent
      },
    ]
  },
  {
    path: 'common',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // 使用 AuthGuard 保護路由
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
    ]
  },
  { path: 'order/confirm', component: PaymentConfirmComponent },
  { path: 'order/cancel', component: PaymentCancelComponent },
  {
    path: 'payment',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'confirm',
        component: PaymentConfirmComponent
      },
      {
        path: 'cancel',
        component: PaymentCancelComponent
      }
    ]
  },

  // {
  //   path:'cart',
  //   component:CartComponent
  // },
  // {
  //   path:'order-backup',
  //   component:OrderBackupComponent
  // },
  {
    path: '**', //notfound-page (找不到畫面-放在最後的路徑)
    component: NotfoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
