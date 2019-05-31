import React, { Component } from 'react';
import { GET_SONG } from '../queries/getSong';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    return (
      <section>
        <nav className="grey lighten-1">
          <div className="nav-wrapper">
            <div className="col s12">
              <Link to="/" className="breadcrumb songCreateBackToSongs">
                Back to Songs
              </Link>
            </div>
          </div>
        </nav>
        <Query query={GET_SONG} variables={{ id: this.props.match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <React.Fragment>
                <h1>{data.song.title}</h1>
                <LyricList {...{ lyrics: data.song.lyrics }} />
                <LyricCreate {...{ songId: data.song.id }} />
              </React.Fragment>
            );
          }}
        </Query>
      </section>
    );
  }
}

export default SongDetail;
