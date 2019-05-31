import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_LYRIC_TO_SONG } from '../queries/addLyricToSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
  }

  render() {
    return (
      <Mutation
        mutation={ADD_LYRIC_TO_SONG}
        onCompleted={() => {
          this.setState({ content: '' });
        }}
      >
        {(addLyricToSong, { data }) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              addLyricToSong({
                variables: {
                  songId: this.props.songId,
                  content: this.state.content
                }
              });
            }}
          >
            <label>Add Lyric</label>
            <input
              {...{
                value: this.state.content,
                onChange: e => this.setState({ content: e.target.value })
              }}
            />
          </form>
        )}
      </Mutation>
    );
  }
}

export default LyricCreate;
