/**
 * check if the user is authenticated and validated then 
 * check if there is products in the basket otherwise go back to home screen
 */

export default ({ store, redirect, $resolve, $service }: any) => {
  const isAuthenticated = $service.session.isAuthenticated()
  const verified = $service.session.isVerified()

  if (!isAuthenticated) return redirect($resolve.login(window.location.href))
  else if (!verified) return redirect($resolve.authorization(window.location.href))

  const basket = { ...store.state.basket }
  const hasProduct = basket.basket.length > 0
  if (!hasProduct) return redirect($resolve.home())
}