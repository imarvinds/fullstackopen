import axios from 'axios'
const baseUrl = '/api/contacts' 

//baseURL = without backend '/persons' ; With backend '/api/contacts (for part 3)'

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

