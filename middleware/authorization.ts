export default ({ store, redirect, route }: any) => {
    const user = { ...store.state.session.user };
    const basket = { ...store.state.basket };
    const isAuthenticated = Object.keys(user).length > 0;
    const hasProduct = basket.basket.length > 0;
    if (!isAuthenticated || !hasProduct) {
        return redirect('/');
    }
};
