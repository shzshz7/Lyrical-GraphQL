import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class SongList extends Component{
    render() {
        console.log(this.props);
        return (
            <div> 
                SongList
            </div>
        );
    }
}

const query = gql`
    {
        songs {
            title
        }
    }
`;

export default graphql(query)(SongList);// the component will rerender after the query execute, then the data will be in props!