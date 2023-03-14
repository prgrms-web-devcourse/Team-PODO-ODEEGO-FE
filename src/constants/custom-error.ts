interface temp {
  [key: string]: { message: string; status: number; error: string };
}

export const CustomError: temp = {
  M001: {
    message: "Member Not Found.",
    status: 404,
    error: "회원 ID에 해당하는 리소스가 없습니다",
  },
  M002: {
    message: "Member nickname is duplicated.",
    status: 400,
    error: "회원 가입 시 닉네임이 중복되었습니다",
  },
  M003: {
    message: "Member nickname length is out of bounds.",
    status: 400,
    error: "회원 가입 시 닉네임 길이가 3~20글자에서 벗어납니다",
  },
  M004: {
    message: "Member nickname is unformatted.",
    status: 400,
    error: "회원 가입 시 닉네임에 한글, 숫자를 제외한 문자가 포함되었습니다.",
  },
  M005: {
    message: "Station doesn't exists in our service.",
    status: 400,
    error: "회원 가입 시 기본 지하철역이 서비스에서 제공하는 역이 아닙니다.",
  },
  G001: {
    message: "Group Not Found.",
    status: 404,
    error: "모임 유효시간이 지났거나 잘못된 모임 주소입니다.",
  },
  G002: {
    message: "Member is already participating group.",
    status: 400,
    error: "회원이 이미 그룹에 호스트 또는 게스트로 참여중입니다.",
  },
  G003: {
    message: "Group is already full.",
    status: 400,
    error: "그룹의 현재 capacity 가 full 입니다.",
  },
  G004: {
    message: "Group host is absent.",
    status: 500,
    error: "그룹 호스트가 존재하지 않습니다.",
  },
  G005: {
    message: "Group capacity is out of bounds.",
    status: 400,
    error: "그룹 생성 시 capacity 가 정해진 범위를 벗어났습니다.",
  },
  G006: {
    message: "Group Member's station is already defined.",
    status: 400,
    error: "그룹 멤버의 역이 이미 있습니다.",
  },
  G007: {
    message: "Group host not matched.",
    status: 403,
    error: "모임 상세 페이지는 모임 주인만 볼 수 있습니다.",
  },
  S001: {
    message: "Station Not Found.",
    status: 404,
    error: "지하철역 ID에 해당하는 리소스가 없습니다.",
  },
  P001: {
    message: "Place Not Found.",
    status: 404,
    error: "장소 ID에 해당하는 리소스가 없습니다.",
  },
  A001: {
    message: "Token not found in request header.",
    status: 401,
    error: "토큰이 Authorization header가 없습니다.",
  },
  A002: {
    message: "Not granted token type.",
    status: 401,
    error:
      " Authorization의 prefix에 붙여주는 granted type이 Bearer가 아닙니다.",
  },
  A003: {
    message: "Jwt is expired.",
    status: 401,
    error: "Jwt가 만료되었습니다.",
  },
  A004: {
    message: "Invalid Jwt.",
    status: 401,
    error: "Jwt 검증에 실패했습니다.",
  },
};
