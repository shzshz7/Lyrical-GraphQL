import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    {song.title}
                    <button className="material-icons btn-medium right">clear</button>
                </li>
            );
        });
    }

    render() {
        console.log(this.props);
        if (this.props.data.loading) {
            return <div>Loading...!</div>
        }

        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
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
