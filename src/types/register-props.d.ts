interface errorType {
  defaultStationName?: string | undefined;
  nickname?: string | undefined;
  nickname_len?: string | undefined;
}

interface valueType {
  nickname?: string;
  defaultStationName?: string;
}

export type { errorType, valueType };
