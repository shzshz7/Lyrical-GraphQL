import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
    

    // fetchSong(){
    //     this.props.params.id
    // }

    render() {
        const song  = this.props.data.song;

        if(!song) {//this is important, because sond will be undefined when first render the component, and there will be an error without this
            return <div>Loading...!</div>
        }

        console.log(song);
        return (
            <div>
                <Link to='/'>Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/> 
                <LyricCreate songId={this.props.params.id}/>
            </div>
        );
    }
}



export default graphql(fetchSong,{
    options: (props) => {return { variables: { id: props.params.id} } }
})(SongDetail);