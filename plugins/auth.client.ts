import { Plugin, Context } from '@nuxt/types'
import { initializeAuth } from "@/auth";

const auth: Plugin = (context: Context, inject: any) => {
  inject('auth', initializeAuth(context))
}

export default auth