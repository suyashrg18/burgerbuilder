import axios from 'axios'

const instance = axios.create(
    {
        baseURL: 'https://react-burger-builder-c91c8-default-rtdb.firebaseio.com/'
    }
)

export default instance;