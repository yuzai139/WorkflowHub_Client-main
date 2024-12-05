export interface IMemberSetting {
  fMemberID: number,
  fName: string;
  fBirthday: string;
  fPhone: string;
  fEmail: string;
  fAddress: string;
  fPassword: string;

  fPermissions: string;
  fMemberPoints?: number;
  fMemberShip?: boolean;
  fMailVerify?: boolean;
  fSOPExp?: number;

}
