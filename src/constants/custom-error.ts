interface temp {
  [key: string]: { message: string; status: number };
}

export const CustomError: temp = {
  A001: { message: "Token not found in request header.", status: 401 },
  A002: { message: "Not granted token type.", status: 401 },
  A003: { message: "Jwt is expired.", status: 401 },
  A004: { message: "Invalid Jwt.", status: 401 },
  M001: { message: "Member Not Found.", status: 404 },
  M002: { message: "Member nickname is duplicated.", status: 400 },
  M003: { message: "Member nickname length is out of bounds.", status: 400 },
  M004: { message: "Member nickname is unformatted.", status: 400 },
  M005: { message: "Station doesn't exists in our service.", status: 400 },
  G001: { message: "Group Not Found.", status: 404 },
  G002: { message: "Member is already participating group.", status: 400 },
  G003: { message: "Group is already full.", status: 400 },
  G004: { message: "Group host is absent.", status: 500 },
  G005: { message: "Group capacity is out of bounds.", status: 400 },
  G006: { message: "Group Member's station is already defined.", status: 400 },
  S001: { message: "Station Not Found.", status: 404 },
  P001: { message: "Place Not Found.", status: 404 },
};
