/**
 * handle callback from sso
 */

export default ({ route, $service }: any) => {
  const { accessToken, refreshToken, logout } = route.query;
  if (accessToken && refreshToken) {
    $service.session.setToken(accessToken, refreshToken);
    $service.session.fetch();
    $service.user.fetch();
  } else if (logout) {
    $service.session.logout();
  }

  delete route.query.accessToken;
  delete route.query.refreshToken;

  return null;
};
