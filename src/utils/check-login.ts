const checkLogin = (currentUser: any) => {
  return currentUser instanceof Object;
};
export default checkLogin;
