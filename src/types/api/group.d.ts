export interface ParticipantResponse {
  memberId: string;
  nickname: string;
  start: {
    stationName: string;
    lat: number;
    lng: number;
  };
}

export interface GroupDetailResponse {
  capacity: number;
  remainingTime: Date;
  hostId: string;
  participants: ParticipantResponse[];
}
