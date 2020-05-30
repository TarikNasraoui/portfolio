import axios from 'axios'
export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user,
    },
    mutations: {
        auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        }
    },
    actions: {
        LOGIN: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/users/login', payload)
                    .then(({ data, status }) => {
                        if (status == 200) {
                            const { token, user } = data
                            localStorage.setItem('token', token)
                            axios.defaults.headers.common['Authorization'] = 'token'
                            commit('auth_success', token, user)
                            resolve(true)
                        }
                    })
                    .catch(error => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },
        register: ({ commit }, payload) => {
           return new Promise((resolve, reject) => {
            console.log(commit)
            axios.post('/api/v1/users/create', payload)
                .then((data) => {
                    console.log(data)

                    resolve(true)
                })
                .catch(error =>{ 
                    console.log(error)
                    reject(error)
                })

           })
        }
    }
}