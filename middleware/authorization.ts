export default ({ store, redirect, route, $resolve, $service }: any) => {
  const page = ["checkout", "order"];
  const isAuthenticated = store.getters["user/isAuthenticated"];
  const matches = page.filter(item => route.path.match(item));

  if (!isAuthenticated && matches.length > 0) {
    $service.session.redirect(route.path);
    return redirect($resolve.login());
  } else if (matches.length > 0) {
    if (matches.includes(page[0])) {
      const basket = { ...store.state.basket };
      const hasProduct = basket.basket.length > 0;
      if (!hasProduct) {
        return redirect($resolve.home());
      }
    }
  }
};
