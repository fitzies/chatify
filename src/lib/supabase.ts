import { UserType } from "@/types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uudaxkzzbiqwdbmnnuls.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1ZGF4a3p6Ymlxd2RibW5udWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3MjA4MDksImV4cCI6MTk5NzI5NjgwOX0.dpl28i5cS7PWd1Q7f1ssA5rimo3q6NviFgeWcxF5IoU"
);

const createUser = async (address: string) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ username: address, address: address }]);
  console.log(data, error);
};

const getUser = async (address: string): Promise<UserType> => {
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("address", address);

  return {
    address: users![0].address,
    created_at: users![0].created_at,
    icon: users![0].icon,
    id: users![0].id,
    username: users![0].username,
  };
};

const updateUser = async (
  address: string,
  username: string,
  icon: string | null | undefined
) => {
  if (username) {
    const { data, error } = await supabase
      .from("users")
      .update({ username: username })
      .eq("address", address);
    console.log(data, error);
  }
  if (icon) {
    const { data, error } = await supabase
      .from("users")
      .update({ icon: icon })
      .eq("address", address);
    console.log(data, error);
  }
};

export { createUser, getUser, updateUser };
