import { Plugin, Context } from '@nuxt/types'
import { initializeService } from "@/services";

const service: Plugin = (context: Context, inject: any) => {
    inject('service', initializeService(context))
}

export default service