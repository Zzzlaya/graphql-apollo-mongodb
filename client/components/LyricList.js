import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { LIKE_LYRIC } from '../queries/likeLyric';

class LyricList extends Component {
  renderLyrics = () => {
    return this.props.lyrics.map(lyric => (
      <li key={lyric.id} className="collection-item lyricListItem">
        {lyric.content}
        <div className="lyricListLikesWrapper">
          <span
            className="new badge lyricListLikesCount"
            data-badge-caption="likes"
          >
            {lyric.likes}
          </span>
          <Mutation mutation={LIKE_LYRIC}>
            {likeLyric => (
              <a
                className="waves-effect waves-light btn-small btn-floating grey"
                onClick={e => {
                  likeLyric({
                    variables: { id: lyric.id },
                    optimisticResponse: {
                      __typename: 'Mutation',
                      likeLyric: {
                        id: lyric.id,
                        likes: lyric.likes + 1,
                        __typename: 'LyricType'
                      }
                    }
                  });
                }}
              >
                <i className="material-icons">thumb_up</i>
              </a>
            )}
          </Mutation>
        </div>
      </li>
    ));
  };

  render() {
    if (!this.props.lyrics || this.props.lyrics.length === 0) {
      return null;
    }

    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default LyricList;
