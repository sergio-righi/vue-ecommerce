/**
 * check if the user has the role to access the feature
 */

export default ({ redirect, $resolve, $service }: any) => {
  const isAdmin = $service.session.isAdmin;
  if (!isAdmin) {
    return redirect($resolve.home());
  }
};
