import React, { Component } from 'react';
import UserService from '../services/UserService';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({users: res.data});
        });
    }

    deleteUser(id) {
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    render() {
        return (
            <div>
                 <br></br>
                 <div className = "row"> 
                 <table className = "table table-striped table-bordered" >
                     <thead className="thead-dark">
                         <tr>
                             <th>Имя пользователя</th>
                             <th>Электронная почта</th>
                             <th>Действия</th>
                         </tr>
                     </thead>

                     <tbody>
                         {
                             this.state.users.map(
                                 user => 
                                 <tr key = {user.id}>
                                 <td> {user.username} </td>
                                 <td> {user.email} </td>
                                 <td>
                                 <RouterLink to = {`/update/${user.id}`}>
                                    <button className="btn btn-outline-info">Обновить данные </button>
                                </RouterLink>
                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-outline-danger">Удалить пользователя </button>
                                 </td>
                                 </tr>
                             )
                         }
                     </tbody>
                 </table>
                </div>
            </div>
        );
    }
}

export default ListUserComponent;