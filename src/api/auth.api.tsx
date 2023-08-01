import supabase from "api";

export const loginUser = async (accessToken: string, refreshToken: string) => {
  const user = await supabase.auth.getUser();

  if (!user || !user.data.user?.id) {
    if (!accessToken || !refreshToken) {
      return;
    }

    const session = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (!session.data.user?.id) return;

    return session.data.user;
  }

  return null;
};
