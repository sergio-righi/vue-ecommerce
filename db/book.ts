import { Book } from "@/models";

const source = "data/books.json";

export const BookRepository = ($axios: any, $service: any) => ({

  async all() {
    const response = await $axios.get(`${source}`);
    return response.data ? response.data.map((item: any) => new Book(item)) : null;
  },

});
