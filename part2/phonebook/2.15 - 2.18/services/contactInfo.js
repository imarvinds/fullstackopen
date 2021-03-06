import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/contacts'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response =>{
        return response.data
    }) 
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deleteContact }

