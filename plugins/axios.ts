import { Plugin, Context } from '@nuxt/types'
import { initializeAxios } from 'utils/api'

const accessor: Plugin = ({ $axios, $auth }: Context) => {
    initializeAxios($axios)

    const authToken = $auth?.strategy.token.get();

    if (authToken) {
        $axios.onRequest((config: any) => {
            config.headers.common.Authorization = authToken
        })
    }

    // axios error handler
    $axios.onError((error: any) => {
        if (error.response === undefined) {
            console.log('Network Error: Please refresh and try again.');
            throw error
        }
        throw error
    })
}

export default accessor