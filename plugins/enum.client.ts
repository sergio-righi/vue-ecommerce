import { Plugin } from '@nuxt/types'
import { initializeEnum } from '@/utils/mapper'

const enumerable: Plugin = (_, inject: any) => {
    inject('enum', initializeEnum)
}

export default enumerable