export interface TMembSopListDTO {
  /** 作業識別碼 */
  FSopid: number;

  /** SOP類型，可為空 */
  FSopType?: number;

  /** 會員識別碼，可為空 */
  FMemberId?: number;

  FPublisherId?: number;

  /** SOP名稱 */
  FSopName: string;

  /** SOP流程圖路徑 */
  FPubSopImagePath: string;

  /** 作業項目識別碼，可為空 */
  FJobItemId?: number;

  /** 作業項目名稱 (來源於JobItem資料表) */
  JobItem: string;

  /** 行業識別碼，可為空 */
  FIndustryId?: number;

  /** 行業名稱 (來源於Industry資料表) */
  Industry: string;

  FReleaseStatus: string;

  FReleaseTime: string;
}
