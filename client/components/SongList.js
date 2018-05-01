import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class SongList extends Component{
    renderSongs(){
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    {song.title}
                </li>
            );
        });
    }

    render() {
        // console.log(this.props);
        if (this.props.data.loading){
            return <div>Loading...!</div>
        }

        return (
            <ul className="collection"> 
                {this.renderSongs()}
            </ul>
        );
    }
}

const query = gql`
    {
        songs {
            id
            title
        }
    }
`;

export default graphql(query)(SongList);// the component will rerender after the query execute, then the data will be in props!
