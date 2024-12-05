//用在
export interface Publisher {
  fPublisherId: number;
  fMemberId: number;
  fPubName: string;
  fPubDescription: string;
  fPubLink: string;
  fPubImagePath: string;
  fPubImageUrl: string;
  fPubImage: File | null;

  // fPubStatus: string | null;
  // fPubCreateDate: string;
}

// 新增用，
export interface forCreatePublisher {
  fMemberId: number;
  fPubName: string;
  fPubDescription: string;
  fPubImage: File | null;
  fPubLink: string;
  // fPublisherId: number | null;
  // fPubImagePath: string | null;
  fPubStatus: string;
  fPubCreateDate: string | null;
}
