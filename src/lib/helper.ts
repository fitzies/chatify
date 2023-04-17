import { getUser } from "./supabase";

const handleUserUpdate = (callback: Function) => {
  getUser(localStorage.getItem("user")!)
    .then((res) => {
      callback(res!);
    })
    .catch((error) => console.log(error));
};

export { handleUserUpdate };
