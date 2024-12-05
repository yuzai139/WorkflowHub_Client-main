export interface TPointRecordDTO{

  /** FPointRecordId: 點數記錄 ID */
  FPointRecordId: number;

  /** FMemberId: 會員 ID，可以為空 */
  FMemberId?: number;

  /** FPointRecord: 點數記錄內容 */
  FPointRecord: string;

  /** FExplanation: 點數操作說明 */
  FExplanation: string;

  /** FRecordTime: 點數記錄時間 */
  FRecordTime: string;

}
