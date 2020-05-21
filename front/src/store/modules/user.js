import axios from 'axios'
export default  {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        LOGIN: ({commit}, payload) => {
            console.log(commit)
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/users/login', payload)
                .then(({data, status}) => {
                    console.log(data)
                    if(status==200){
                        resolve(true)
                    }
                })
                .catch(error => {
                    reject(error)
                })
            })
        }
    }
}