import axios from "axios";

const SignupAPI = {
  getSignUn: async (values: any) => {
    const { nickname, defaultStationName } = values;

    const get = localStorage.getItem("token");

    console.log(get, "-----------------------------");
    const { data } = await axios.patch(
      `https://odeego.shop/api/v1/members/sign-up`,
      {
        data: {
          nickname,
          defaultStationName,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(data);
  },
};

export default SignupAPI;
