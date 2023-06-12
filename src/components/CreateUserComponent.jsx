import React, { Component } from 'react';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import UserService from '../services/UserService';
import img1 from './main-pic.jpg';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            username: '',
            email: '',
            hashed_password: '',
            redirect: false
        }
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
        
    }


    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, email: this.state.email,  hashed_password: this.state.hashed_password};

        UserService.createUser(user).then((response) => {
            this.state.redirect = true
            console.log(response.data);
            this.forceUpdate()
        }).catch(error => {
            console.log(error);
        });
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }


    changePasswordHandler = (event) => {
        this.setState({hashed_password: event.target.value});
    }

    render() {
        const { redirect } = this.state;
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return  <Navigate to="/users" /> 
        }
        return (
            <div>
                <br></br>
            
                
                <div className = "container" >
                    <div className='row'>
                    <div>
                    <img src={img1} alt="" object-fit="contain"/>
                        <div className='card w-50 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Регистрация </h3>
                            <div className='card-body' >
                                <form>
                                    <div className='form-group'>
                                        <input placeholder='Введите имя' name = 'username' className='form-control mb-3'
                                        value = {this.state.username} onChange={this.changeUsernameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Введите электронную почту' name = 'email' className='form-control mb-3'
                                        value = {this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input type = 'password' placeholder='Введите пароль' name = 'hashed_password' className='form-control'
                                        value = {this.state.hashed_password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <button className='btn btn-outline-success' onClick={this.saveUser}> Сохранить </button>
                                    <RouterLink to = "/users/all">
                                    <button className='btn btn-outline-danger' style={{marginLeft: "10px"}}>Отмена</button>
                                    </RouterLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default CreateUserComponent;