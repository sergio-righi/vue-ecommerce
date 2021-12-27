import { Book } from "@/models";

const source = "data/books.json";

export const BookRepository = ($axios: any, $service: any) => ({
  get id() {
    return $service.session.user();
  },

  async all() {
    const response = await $axios.get(`${source}`);
    return response.data ? response.data.map((item: any) => new Book(item)) : null;
  },

  // async login(username: string, password: string) {
  //   password = crypto.encrypt(password);
  //   const response = await $axios.post(`${controller}/login`, {
  //     username,
  //     password
  //   });
  //   return response.data ? new User(response.data) : null;
  // },

  // async username(id: string, username: string) {
  //   const response = await $axios.post(`${controller}/exists`, { id, username });
  //   return response ? response.data : true;
  // },

  // async email(id: string, email: string) {
  //   const response = await $axios.post(`${controller}/exists`, { id, email });
  //   return response ? response.data : true;
  // },

  // async insert(user: User) {
  //   const response = await $axios.post(`${controller}`, user);
  //   return response.data ? new User(response.data) : null;
  // },

  // async find(id: string) {
  //   if (!id) return;
  //   const response = await $axios.get(`${controller}/${id}`);
  //   return response.data ? new User(response.data) : null;
  // },

  // async findByEmail(email: string) {
  //   if (!email) return;
  //   const response = await $axios.get(`${controller}/email/${email}`);
  //   return response.data ? new User(response.data) : null;
  // },

  // async update(id: string, user: User) {
  //   if (!id) return;
  //   const response = await $axios.put(`${controller}/${id}`, user);
  //   return response.data ? new User(response.data) : null;
  // },

  // async delete(id: string) {
  //   if (!id) return;
  //   const response = await $axios.patch(`${controller}/delete/${id}`);
  //   return response.data ? new User(response.data) : null;
  // },

  // async recover(id: string) {
  //   if (!id) return;
  //   const response = await $axios.patch(`${controller}/recover/${id}`);
  //   return response.data ? new User(response.data) : null;
  // },

  // async lock(id: string) {
  //   if (!id) return;
  //   const response = await $axios.patch(`${controller}/lock/${id}`);
  //   return response.data ? new User(response.data) : null;
  // },

  // async release(id: string) {
  //   if (!id) return;
  //   const response = await $axios.patch(`${controller}/release/${id}`);
  //   return response.data ? new User(response.data) : null;
  // }

});
