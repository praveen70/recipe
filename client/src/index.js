import React, { Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router, Route, Switch, Redireact } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import Serach from './components//Recipe/Serach';
import Profile from './components/Profile/Profile';
import AddRecipe from './components/Recipe/AddRecipe';


const client = new ApolloClient({
    uri:'http://localhost:4444/graphql',
    fatchOptions :{
        credentials: 'include'
    },
    request: operation =>{
        const token = localStorage.getItem('token');
        operation.setContext({
            headers : {
                authorization : token
            }
        })
    },
    onError:({ networkError}) =>{
        if(networkError){
            console.log('Network Error', networkError);
        }
       
    }
});

const Root =({refetch, session}) =>(
    <Router>
    <Fragment>
    <Navbar session={ session } />
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/Serach' component={Serach} />
            <Route path='/Signin' render={() => <Signin refetch={refetch} />}  />
            <Route path='/Signup' render={() => <Signup refetch={refetch} />}  />
            <Route path='/Recipe/AddRecipe' component={AddRecipe } />
            <Route path='/Profile' component={Profile } />

        </Switch>
        </Fragment>
    </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
<ApolloProvider client={ client }>
<RootWithSession  />
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
