import axios from "axios";

const authHelper = {
  tokenCheck: () => {
    if (localStorage.token) return true;
    else return false;
  },
  fetchUserWithToken: async () => {
    try {
      const response = (
        await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        })
      ).data;
      const user = response.user;
      if (user) return user;
      else {
        localStorage.removeItem("token");
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default authHelper;
