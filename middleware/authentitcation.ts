export default ({ store, redirect, route, $resolve, $service }: any) => {
  const page = ["sign_in", "sign_up", "forgot_password"];
  const user = { ...store.state.session.user };
  const isAuthenticated = Object.keys(user).length > 0;
  const matches = page.filter(item => route.path.match(item));
  if (isAuthenticated && matches.length > 0) {
    return redirect($resolve.home());
  } else if (!isAuthenticated && matches.length === 0) {
    $service.session.redirect(route.path);
  }
};
