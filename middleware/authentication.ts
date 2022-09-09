import { UserModel } from "@/models";

export default async ({ store, $service }: any) => {
  await $service.session.fetch();
  const { _id } = store.state.user?.user;
  if (!_id) {
    const verified = $service.session.isVerified();
    if (verified) {
      const auth = $service.session.user();
      const response = await $service.user.findByUser(auth._id);
      if (response) {
        $service.user.setUser(response);
      } else {
        $service.user.create(new UserModel({ userId: auth._id } as any));
      }
    }
  }
};
