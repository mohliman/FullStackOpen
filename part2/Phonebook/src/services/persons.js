import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

function getAll(){
    let request =  axios.get(baseUrl)
    return request.then(response => response.data)
}
function create(newObject){
    let request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)

}
function edit(id, newObject){
    let request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
function remove(id){
    let request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export default {
 getAll,
 create,
 edit,
 remove
}
