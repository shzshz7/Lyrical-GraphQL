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
                //.then(() => this.props.data.refetch());
                // , refetchQueries: [{
                //     query
                // }]
            }).then(() => this.props.data.refetch())//this is another way to refetch. we can use this here because this query is bond to this component, and the data is in props
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {//destructure the parameter from "song"
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`} >
                        {title}
                    </Link>
                    <i
                        className="material-icons"
                        onClick={() => this.onSongDelete(id)}//have to use arrow function, or the deleteSong function will call immediately when rendering
                    >
                        delete
                    </i>
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
