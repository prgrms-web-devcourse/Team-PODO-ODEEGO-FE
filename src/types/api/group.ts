export interface ParticipantResponse {
  username: string;
  start: {
    stationName: string;
    lat: number;
    lng: number;
  };
}

export interface GroupDetailResponse {
  capacity: number;
  remainingTime: Date;
  owner: string;
  participants: ParticipantResponse[];
}
