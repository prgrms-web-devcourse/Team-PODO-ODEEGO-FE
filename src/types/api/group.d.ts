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
  remainingTime: string;
  hostId: string;
  participants: ParticipantResponse[];
}

interface GroupResponse {
  groupId: string;
  capacity: number;
  createdAt: Date;
  remainingTime: string;
}
export interface AllGroupsResponse {
  groups: [GroupResponse];
}
