import { BookRepository } from "./book";

export const initializeRepository = ($axios: any, $service: any) => ({
  book: BookRepository($axios, $service),
});
