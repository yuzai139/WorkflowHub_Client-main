export interface TMmbSopCopyListDTO {
  /** FSopid: 流程操作ID */
  FSopid: number;

  /** FMemberId: 會員ID，可以為空 */
  FMemberId?: number;

  /** FSopType: SOP類型，可以為空 */
  FSopType?: number;

  /** FSopName: SOP名稱 */
  FSopName: string;

  /** FJobItemId: 工作項目ID，可以為空 */
  FJobItemId?: number;

  /** JobItem: 工作項目名稱 */
  JobItem: string;

  /** FIndustryId: 行業ID，可以為空 */
  FIndustryId?: number;

  /** Industry: 行業名稱 */
  Industry: string;

  /** FFileStatus: 檔案狀態 */
  FFileStatus: string;
}
