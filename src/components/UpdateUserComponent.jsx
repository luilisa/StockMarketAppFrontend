import React, { Component } from 'react';
import UserService from '../services/UserService';
import { Link as RouterLink, Navigate, useParams} from "react-router-dom";
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
class UpdateUserComponent extends Component {
    constructor(props) {
        super(props)
        let { id } = this.props.params;
        this.state = {
            id: id,
            email: '',
            username:'',
            hashed_password: '',
            redirect: false
        }
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
        
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then((response) => {
            let user = response.data;
            console.log(user.hashed_password)
            console.log(user.username)
            this.setState({id: user.id, username: user.username, email: user.email, hashed_password:user.hashed_password});
        });
    }


    updateUser = (e) => {
        let user = {username: this.state.username, email: this.state.email, hashed_password: this.state.hashed_password};
 
        UserService.updateUser(user,this.state.id).then((response) => {
           
            // this.forceUpdate();
            console.log(response.data);
        
        });
        this.state.redirect = true
        this.forceUpdate();
        console.log(this.state.redirect)
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
                        <div className='card w-50 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Обновить информацию</h3>
                            <div className='card-body' >
                                <form>
                                <div className='form-group'>
                                        <input placeholder={this.state.username} name = 'username' className='form-control mb-3'
                                        value = {this.state.username} onChange={this.changeUsernameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder={this.state.email} name = 'email' className='form-control mb-3'
                                        value = {this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder={this.state.hashed_password} name = 'hashed_password' className='form-control mb-3'
                                        value = {this.state.hashed_password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <button className='btn btn-outline-success' onClick={this.updateUser}>Подтвердить </button>
                                    <RouterLink to = "/users/">
                                    <button className='btn btn-outline-danger' style={{marginLeft: "10px"}}>Отмена</button>
                                    </RouterLink>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default withParams(UpdateUserComponent);