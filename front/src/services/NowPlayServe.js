import axios from 'axios'

export default {
    // let nowplay = [];
    axios.get('/static/movie_list.json', { baseURL: 'http://localhost:8080' })
    .then(response => {
        // console.log(response)
        // return nowplay.push(response)

    }).catch(error => {
        window.console.log(error);
    })
}