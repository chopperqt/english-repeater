import supabase from "api";
import { store } from "services/store";
import { setUserId } from "services/user";

export const loginUser = async (accessToken: string, refreshToken: string) => {
  const user = await supabase.auth.getUser();

  if (user.data.user?.id) {
    store.dispatch(setUserId(user.data.user.id));
  }

  if (!user || !user.data.user?.id) {
    if (!accessToken || !refreshToken) {
      return;
    }

    const session = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    console.log("ssis", session);

    if (!session.data.user?.id) return;

    store.dispatch(setUserId(session.data.user.id));

    return session.data.user;
  }

  return null;
};
