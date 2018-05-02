import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate(
            {
                variables: { id } //id: id
                //.then(() => this.props.date.refetch());this does not work, try use refetchQueries
                , refetchQueries: [{
                    query
                }]
            })
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {//destructure the parameter from "song"
            return (
                <li key={id} className="collection-item">
                    {title}
                    <i
                        className="material-icons right"
                        onClick={() => this.onSongDelete(id)}//have to use arrow function, or the deleteSong function will call immediately
                    >
                        delete
                    </i>
                </li>
            );
        });
    }

    render() {
        // console.log(this.props);
        if (this.props.data.loading) {
            return <div>Loading...!</div>
        }

        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                    {/* only event handler function need to bind? here this function does not need bind?*/}
                </ul>
                <Link to='/songs/new'
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteSong($id:ID){
        deleteSong(id:$id){
            id
        }     
    }
`


export default graphql(mutation)(
    graphql(query)(SongList)
);// the component will re-render after the query execute, then the data will be in props!
