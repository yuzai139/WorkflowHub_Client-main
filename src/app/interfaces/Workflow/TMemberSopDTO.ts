export interface TMemberSopDTO {
  /** 工作流程 ID */
  FSopid: number;

  /** 會員 ID */
  FMemberId?: number;

  /** 工作流程類型 */
  FSopType?: number;

  /** 工作流程名稱 */
  FSopName?: string;

  /** 工作流程描述 */
  FSopDescription?: string;

  /** 流程圖路徑 */
  FSopFlowImagePath?: string;

  /** 職業 ID */
  FJobItemId?: number;

  /** 職業名稱 */
  JobItem?: string;

  /** 行業 ID */
  FIndustryId?: number;

  /** 行業名稱 */
  Industry?: string;

  /** 業務 */
  FBusiness?: string;

  /** 客戶 */
  FCustomer?: string;

  /** 公司規模 */
  FCompanySize?: string;

  /** 部門 */
  FDepartment?: string;

  /** 分享 URL */
  FShareUrl?: string;

  /** 編輯時間 */
  FEditTime?: string;

  /** 分享權限 */
  FSharePermission?: string;

  /** 檔案狀態 */
  FFileStatus?: string;
}
