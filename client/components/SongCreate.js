import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_SONGS } from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
  }

  render() {
    return (
      <Mutation
        mutation={ADD_SONG}
        onCompleted={() => {
          this.props.history.push('/');
        }}
        update={(cache, { data: { addSong } }) => {
          const { songs } = cache.readQuery({ query: GET_SONGS });

          cache.writeQuery({
            query: GET_SONGS,
            data: { songs: [...songs, addSong] }
          });
        }}
      >
        {(addSong, { data }) => (
          <React.Fragment>
            <nav className="grey lighten-1">
              <div className="nav-wrapper">
                <div className="col s12">
                  <Link to="/" className="breadcrumb songCreateBackToSongs">
                    Back to Songs
                  </Link>
                </div>
              </div>
            </nav>
            <h1>Create a new song</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                addSong({ variables: { title: this.state.title } });
                this.setState({ title: '' });
              }}
            >
              <label>Song Title</label>
              <input
                onChange={e => {
                  this.setState({ title: e.target.value });
                }}
                value={this.state.title}
              />
            </form>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default SongCreate;
