import React from 'react';
import { Query} from 'react-apollo';
import {GET_CEURRENT_USER } from '../query';

 const withSession = Component => props =>(
     <Query query={ GET_CEURRENT_USER }>
        {({ data, loading, refetch }) => {
            if(loading) return null;
            console.log(data);
            return (
                <Component {...props} refetch = {refetch} session={data} />
            )
        }}
     </Query>
 )
 export default withSession;