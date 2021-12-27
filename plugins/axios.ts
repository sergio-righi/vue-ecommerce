import { Plugin } from '@nuxt/types'
import { initializeAxios } from 'utils/api'

// const accessor: Plugin = ({ $axios }) => {
//     initializeAxios($axios)
// }

const accessor: Plugin = ({ $axios, app }) => {
    initializeAxios($axios)

    $axios.onError((error: any) => {
        if (error.response === undefined) {
            // Display a flash notification
            app.notify({
                title: 'Network Error: Please refresh and try again.',
                type: 'error',
                duration: -1,
            })

            throw error
        }

        // Handle other types of errors (e.g., redirect to login on 401 errors)

        throw error
    })
}

export default accessor