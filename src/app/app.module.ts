import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { LectureTicketsComponent } from './components/lecture-publisher/lecture-tickets/lecture-tickets.component';
import { LectureShopComponent } from './components/lecture-publisher/lecture-shop/lecture-shop.component';
import { LectureSerchComponent } from './components/lecture-publisher/lecture-serch/lecture-serch.component';
import { LectureProductComponent } from './components/lecture-publisher/lecture-product/lecture-product.component';
import { PublisherProfileComponent } from './components/lecture-publisher/publisher-profile/publisher-profile.component';
import { PublisherMainComponent } from './components/lecture-publisher/publisher-main/publisher-main.component';
import { PublisherSerchComponent } from './components/lecture-publisher/publisher-serch/publisher-serch.component';
import { PublisherLecturelistComponent } from './components/lecture-publisher/publisher-lecturelist/publisher-lecturelist.component';
import { PubmanageMainComponent } from './components/lecture-publisher/pubmanage-main/pubmanage-main.component';
import { PubmanageProfileComponent } from './components/lecture-publisher/pubmanage-profile/pubmanage-profile.component';
import { PubmanageLecturelistComponent } from './components/lecture-publisher/pubmanage-lecturelist/pubmanage-lecturelist.component';
import { PubmanageItemComponent } from './components/lecture-publisher/pubmanage-item/pubmanage-item.component';
import { OrderComponent } from './components/order/order/order.component';
import { CartComponent } from './components/order/cart/cart.component';
import { LoginComponent } from './components/member/login/login.component';
import { WelcomeComponent } from './components/member/welcome/welcome.component';
import { ForgetpasswordComponent } from './components/member/forgetpassword/forgetpassword.component';
import { SigninComponent } from './components/member/signin/signin.component';
import { SigninCompletedComponent } from './components/member/signin-completed/signin-completed.component';
import { MemberSettingComponent } from './components/member/member-setting/member-setting.component';
import { FavoriteComponent } from './components/member/favorite/favorite.component';
import { ForumBackupComponent } from './components/forum/forum-backup/forum-backup.component';
import { HomeComponent } from './components/common/home/home.component';
import { WkflowmarketSearchresultComponent } from './components/workflow/wkflowmarket-searchresult/wkflowmarket-searchresult.component';
import { WkflowmarketProductComponent } from './components/workflow/wkflowmarket-product/wkflowmarket-product.component';
import { PublisherWorkflowlistComponent } from './components/workflow/publisher-workflowlist/publisher-workflowlist.component';
import { PubmanageWorkflowlistComponent } from './components/workflow/pubmanage-workflowlist/pubmanage-workflowlist.component';
import { PubmanageWorkflowComponent } from './components/workflow/pubmanage-workflow/pubmanage-workflow.component';
import { WkflowmarketIndexComponent } from './components/workflow/wkflowmarket-index/wkflowmarket-index.component';
import { PublisherBankaccountComponent } from './components/workflow/publisher-bankaccount/publisher-bankaccount.component';
import { MemberUpgradeComponent } from './components/workflow/member-upgrade/member-upgrade.component';
import { MberworkflowListComponent } from './components/workflow/mberworkflow-list/mberworkflow-list.component';
import { MberworkflowItemComponent } from './components/workflow/mberworkflow-item/mberworkflow-item.component';
import { MberworkflowIndexComponent } from './components/workflow/mberworkflow-index/mberworkflow-index.component';
import { ForumListComponent } from './components/forum/forum-list/forum-list.component';
import { ForumDetailComponent } from './components/forum/forum-detail/forum-detail.component';
import { OrderBackupComponent } from './components/order/order-backup/order-backup.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { ForumComponent } from './components/forum/forum/forum.component';
import { NotfoundPageComponent } from './components/common/notfound-page/notfound-page.component';
import { WkflowmarketListComponent } from './components/workflow/wkflowmarket-list/wkflowmarket-list.component';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { CanvaLayoutComponent } from './components/layout/canva-layout/canva-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SlidebarLayoutComponent } from './components/layout/slidebar-layout/slidebar-layout.component';
import { SlidebarComponent } from './components/template/slidebar/slidebar.component';
import { EditorModule } from 'primeng/editor';
import { LucideAngularModule, Mail, ArrowRightFromLine, ArrowRight, ArrowLeft } from 'lucide-angular';
import { Trash } from 'lucide-angular';
import { TooltipModule } from 'primeng/tooltip'; //primeng tooltip
import { DialogModule } from 'primeng/dialog'; //primeng pop up
import { TableModule } from 'primeng/table'; //primeng table
import { ButtonModule } from 'primeng/button'; //primeng button
import { InputSwitchModule } from 'primeng/inputswitch'; // primeng inputSwitch
import { OverlayPanelModule } from 'primeng/overlaypanel'; //primeng overlay
import { MessagesModule } from 'primeng/messages'; //primeng message
import { MessageService } from 'primeng/api'; //primeng message
import Swiper from 'swiper';
import { DuplicateSopPopupComponent } from './components/workflow/duplicate-sop-popup/duplicate-sop-popup.component';
import { PointRecordComponent } from './components/workflow/point-record/point-record.component';
import { PointOrderComponent } from './components/workflow/point-order/point-order.component';
import { OrderPrepareTestComponent } from './components/workflow/order-prepare-test/order-prepare-test.component';
import { OrderCheckedTestComponent } from './components/workflow/order-checked-test/order-checked-test.component';
import { OrderSuccessTestComponent } from './components/workflow/order-success-test/order-success-test.component';
import { OrderNotifyTestComponent } from './components/workflow/order-notify-test/order-notify-test.component';
import { PaymentConfirmComponent } from './components/order/payment-confirm/payment-confirm.component';
import { PaymentCancelComponent } from './components/order/payment-cancel/payment-cancel.component';
import { PaginatorModule } from 'primeng/paginator';//primeng 分頁器
import { FTMemberService } from './services/Forum/SFTMember';
import { TabViewModule } from 'primeng/tabview';
import { CarouselComponent } from './components/common/carousel/carousel.component';
import { TreeSelectModule } from 'primeng/treeselect';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, //template
    FooterComponent, //template
    LectureTicketsComponent, //lecture-publisher
    LectureShopComponent, //lecture-publisher
    LectureSerchComponent, //lecture-publisher
    LectureProductComponent, //lecture-publisher
    PublisherProfileComponent, //lecture-publisher
    PublisherMainComponent, //lecture-publisher
    PublisherSerchComponent, //lecture-publisher
    PublisherLecturelistComponent, //lecture-publisher
    PubmanageMainComponent, //lecture-publisher
    PubmanageProfileComponent, //lecture-publisher
    PubmanageLecturelistComponent, //lecture-publisher
    PubmanageItemComponent, //lecture-publisher
    OrderComponent, //Order
    OrderBackupComponent, //Order
    OrderDetailComponent, //Order
    CartComponent, //Order
    LoginComponent, //memeber
    WelcomeComponent, //memeber
    ForgetpasswordComponent, //memeber
    SigninComponent, //memeber
    SigninCompletedComponent, //memeber
    MemberSettingComponent, //memeber
    FavoriteComponent, //memeber
    ForumBackupComponent, //forum
    ForumComponent, //forum
    ForumListComponent, //forum
    ForumDetailComponent, //forum
    WkflowmarketSearchresultComponent, //workflow
    WkflowmarketProductComponent, //workflow
    PublisherWorkflowlistComponent, //workflow
    PubmanageWorkflowlistComponent, //workflow
    PubmanageWorkflowComponent, //workflow
    WkflowmarketIndexComponent, //workflow
    PublisherBankaccountComponent, //workflow
    MemberUpgradeComponent, //workflow
    MberworkflowListComponent, //workflow
    MberworkflowItemComponent, //workflow
    MberworkflowIndexComponent, //workflow
    WkflowmarketListComponent, //workflow
    HomeComponent, //common
    NotfoundPageComponent, //common
    LoginLayoutComponent, //layout
    MainLayoutComponent, //layout
    CanvaLayoutComponent, //layout
    SlidebarLayoutComponent, //layout
    SlidebarComponent, //layout
    DuplicateSopPopupComponent,
    PointRecordComponent,
    PointOrderComponent,
    OrderPrepareTestComponent,
    OrderCheckedTestComponent,
    OrderSuccessTestComponent,
    OrderNotifyTestComponent,
    PaymentConfirmComponent,
    PaymentCancelComponent,
    CarouselComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule, //前台的後台editor
    LucideAngularModule, //icon
    LucideAngularModule.pick({ Mail, ArrowRightFromLine, Trash, ArrowRight, ArrowLeft }), //icon
    TooltipModule, //primeng tooltip
    DialogModule, //primeng pup up
    TableModule, //primeng table
    ButtonModule, //primeng button
    InputSwitchModule, //primeng inputSwitch
    OverlayPanelModule, //primeng overlaymodule
    MessagesModule, //primeng message

    PaginatorModule, //primeng 分頁器
    TabViewModule,
    TreeSelectModule

  ],
  providers: [
    FTMemberService,
    MessageService,
  ], // 在這裡提供 MessageService
  bootstrap: [AppComponent]
})
export class AppModule { }
