import React from 'react';
//import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {SIGNUP_USER} from '../../query';
import Error from '../Error';
import { withRouter } from 'react-router-dom';

const initialState = {
    username:'',
    email:'',
    password:'',
    PasswordConfirmation:'',
}
class Signup extends React.Component{

    state={...initialState};

    clearState =()=>{
        this.setState({ ...initialState });
    }

    handleChange = event =>{
        const { name, value } = event.target;
        this.setState({[name]:value});
        console.log(name, value);
     }
     handleSubmit = (event,signupUser) =>{
         event.preventDefault();
         signupUser().then(data =>{
             console.log(data);
             localStorage.setItem('token', data.data.signupUser.token);
             this.clearState();
             this.props.history.push('/')
         })

     }
     validateForm =()=>{
        const  { username, email, password, PasswordConfirmation} = this.state;
        const isInvalid = !username || !email || !password ||  password!==PasswordConfirmation;
        return isInvalid;
     }

    render(){
        const  { username, email, password, PasswordConfirmation} = this.state;
        return(
            <Mutation mutation={SIGNUP_USER} variables={{  username, email, password }}>
            {( signupUser, { data, loading, error }) =>{
                return (

            <form style={{display:'relative'}} onSubmit={event=>this.handleSubmit(event, signupUser)}>
            <div>
            <h1 style={{textAlign:'center'}}>Signup</h1>
            <div className='App'>
            <div>
                <input type='text' value={username} name='username' placeholder='Username' onChange={(event) =>this.handleChange(event)}></input>
                </div>
                <div>
                <input type='email' value={email} name='email' placeholder='Email'  onChange={this.handleChange}></input>
                </div>
                <div>
                <input type='password' value={password} name='password' placeholder='Password'  onChange={this.handleChange}></input>
                </div>
                <div>
                <input type='password' value={PasswordConfirmation} name='PasswordConfirmation' placeholder='PasswordConfirmation'  onChange={this.handleChange}></input>
                </div>
                <button  
                disabled={ loading || this.validateForm()}
                type='submit' 
                className='button-primary'> Submit</button>
                { error && <Error error={ error} />}
            </div>
            </div>
</form>
                )
            }}
</Mutation>

        );
    }
}

export default withRouter(Signup);