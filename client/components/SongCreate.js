import React, {Component} from 'react';
import {Link, hashHistory} from 'react-router';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);//this is onw way to bind

        this.state = {title: ''};
    }

    onSubmit(event){
        event.preventDefault();

        // console.log(this.props);
        this.props.mutate({//this will call the mutation
            variables: {
                title: this.state.title
            },
            refetchQueries:[{ 
                query 
                //becasue the key an value are identical, we can just use one word here
                // variables 
            }]
        }).then(()=> hashHistory.push('/'))


    }

    render(){
        return (
            
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit = {this.onSubmit}>{/* another wayt to bind is to use this.onSubmit.bind(this) here */}
                    <label>Song Title:</label>
                    <input 
                        onChange={event => this.setState({title: event.target.value})}
                        value = {this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title){
            title 
        }
    }
`;

export default graphql(mutation)(SongCreate);