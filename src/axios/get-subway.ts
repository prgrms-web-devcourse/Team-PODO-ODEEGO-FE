import HTTP from "./config/axios-instance";

export const getSubway = async (value: string | undefined) => {
  const requestUrl = `/v1/subway`;

  try {
    const result = await HTTP.get({
      url: requestUrl,
      params: { value: value },
    });

    return result.data.documents;
  } catch (e) {
    console.log(e);
    throw new Error(`axios/get-subway API CALL ERROR`);
  }
};
