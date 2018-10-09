import React from 'react';
//import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {SIGNIN_USER} from '../../query';
import Error from '../Error';
import { withRouter } from 'react-router-dom';

const initialState = {
    username:'',
    password:'',
   
}
class Signin extends React.Component{

    state={...initialState};

    clearState =()=>{
        this.setState({ ...initialState });
    }

    handleChange = event =>{
        const { name, value } = event.target;
        this.setState({[name]:value});
        console.log(name, value);
     }
     handleSubmit = (event,signinUser) =>{
         event.preventDefault();
         signinUser().then(data=>{
             console.log(data);
             localStorage.setItem('token', data.data.signinUser.token);
             this.clearState();
             this.props.history.push('/')
         })

     }
     validateForm =()=>{
        const  { username, password } = this.state;
        const isInvalid = !username ||  !password 
        return isInvalid;
     }

    render(){
        const  { username,  password } = this.state;
        return(
            <Mutation mutation={SIGNIN_USER} variables={{  username,  password }}>
            {( signinUser, { data, loading, error }) =>{
                return (

            <form style={{display:'relative'}} onSubmit={event=>this.handleSubmit(event, signinUser)}>
            <div>
            <h1 style={{textAlign:'center'}}>Signin</h1>
            <div className='App'>
            <div>
                <input type='text' value={username} name='username' placeholder='Username' onChange={(event) =>this.handleChange(event)}></input>
                </div>
               
                <div>
                <input type='password' value={password} name='password' placeholder='Password'  onChange={this.handleChange}></input>
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

export default withRouter(Signin);