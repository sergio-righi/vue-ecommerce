/**
 * check if the user is authenticated and validated then 
 * check if there is products in the basket otherwise go back to home screen
 */

export default ({ store, redirect, route, $resolve, $auth }: any) => {
  const isAuthenticated = $auth.loggedIn
  if (isAuthenticated) {
    const { validated } = $auth.user
    const authorizationPath = $resolve.authorization();
    const isAuthorization = route.path === authorizationPath;
    if (!validated && !isAuthorization) {
      return redirect(authorizationPath);
    } else if (validated && isAuthorization) {
      return redirect($resolve.home());
    }
  }

  const basket = { ...store.state.basket };
  const hasProduct = basket.basket.length > 0;
  if (!hasProduct) return redirect($resolve.home());
};
