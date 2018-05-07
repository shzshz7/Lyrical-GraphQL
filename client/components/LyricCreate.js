import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
    constructor(props){
        super(props);

        this.state = {
            content:''
        }
    }

    onSubmit(event) {
        event.preventDefault();
        // console.log(this.props);

        this.props.mutate({
            variables:{
                content: this.state.content,
                songId: this.props.songId
            },
            update: (store, {data: {addToSong}}) => {//this is to update the list immediately
              const data = store.readQuery({query:querySong});//read from store
              data.lyrics.push(addToSong);//add new item
              store.writeQuery({query:gql`
                  {
                      song(id:"${this.props.songId}"){
                      id
                      title
                      lyrics {
                          id
                          content
                      }`
                      , data});
            }//write back to store

            // ,refetchQueries:[{
            //     query:gql`
            //     {
            //         song(id:"${this.props.songId}"){
            //         id
            //         title
            //         lyrics {
            //             id
            //             content
            //         }
            //         }
            //     }
            // `
            // }]
        }).then(() => this.setState({content: ''}));
    }

    render(){
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    value = {this.state.content}
                    onChange={event => this.setState({content:event.target.value})}
                />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content:String, $songId:ID){
        addLyricToSong(content:$content, songId:$songId){
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`

export default graphql(mutation)(LyricCreate);
