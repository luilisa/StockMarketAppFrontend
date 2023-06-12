import axios from 'axios';

const USER_API_BASE_URL = "http://127.0.0.1:8000/users";

class UserService {
    getUsers() {
        return axios.get(USER_API_BASE_URL + '/all');
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL + '/create-user', user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/get/' + userId);
    }

    updateUser(user, userId) {
        return axios.put(USER_API_BASE_URL + '/update/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/delete/' + userId);
    }
}

export default new UserService()