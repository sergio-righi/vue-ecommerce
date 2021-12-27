import { Book } from "@/models";

export const BasketService = (store: any) => ({

  all() {
    store.dispatch("basket/fetchBasket");
  },

  find(id: string) {
    store.dispatch("basket/fetchItem", id);
  },

  insert(id: string, count: number) {
    store.dispatch("basket/addItem", { id, count });
  },

  set(id: string, count: number) {
    store.dispatch("basket/setItem", { id, count });
  },

  update() {
    store.dispatch("basket/putItem");
  },

  delete(id: string) {
    store.dispatch("basket/deleteItem", id);
  },

  recover() {
    store.dispatch("basket/recoverItem");
  },

  clear() {
    store.dispatch("basket/clearBasket");
  },

  // filtered({ name }: any, page: number, count: number) {
  //   return store.state.basket.basket.filter((x: Book) =>
  //     name ? x.name ? x.name.toLowerCase().includes(name.toLowerCase()) : false : true
  //   );
  // }

});
