export default ({ store, redirect, route }: any) => {
  const exceptions = ["sign_in", "sign_up", "forgot_password"];
  const user = { ...store.state.session.user };
  const isAuthenticated = Object.keys(user).length > 0;
  const outside = exceptions.filter(item => route.path.match(item)).length > 0;
  if (isAuthenticated) {
    const authorization = route.path.match("authorization");
    if (user.locked && !authorization) return redirect("/authorization");
    else if (!user.locked && (outside || authorization)) return redirect("/");
  } else if (!outside) return redirect("/sign_in");
};
