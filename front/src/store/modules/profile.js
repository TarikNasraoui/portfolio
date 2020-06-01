import axios from 'axios';

export default {
    state: {
        profile: {},
        status: ''
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        newProfile: ({commit},payload) => {
            console.log('test')
            return new Promise((resolve, reject)=> {
                console.log(commit)
                // axios.post('/api/v1/users/profile', payload)
                axios.post('/api/v1/profile', payload,{
                    headers: {
                      'Authorization': `${localStorage.getItem('token')}`
                    }
                })
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