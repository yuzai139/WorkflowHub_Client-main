export interface TPublisherSopDTO {
  FSopid: number;
  FMemberId?: number;
  FPublisherId?: number;
  FSopType?: number;
  FSopName?: string;
  FSopDescription?: string;
  FPubContent?: string;
  FSopFlowImagePath?: string;
  FPubSopImagePath?: string;
  FJobItemId?: number;
  JobItem?: string; // JobItem資料表的值
  FIndustryId?: number;
  Industry?: string; // Industry資料表的值
  FBusiness?: string;
  FCustomer?: string;
  FCompanySize?: string;
  FDepartment?: string;
  FReleaseTime?: string;
  FReleaseStatus?: string;
  FProductUrl?: string;
  FIsRelease?: boolean; // 是否曾經發佈過
  FPrice?: number;
  FSalePoints?: number;
}
