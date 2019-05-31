import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_SONGS } from '../queries/fetchSongs';
import { DELETE_SONG } from '../queries/deleteSong';

class SongList extends Component {
  render() {
    return (
      <Query query={GET_SONGS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :(</p>;
          }

          return (
            <React.Fragment>
              <h1>Songs</h1>
              <ul className="collection">
                {data.songs.map((song, i) => (
                  <li key={i} className="collection-item songListItem">
                    <Link to={`/songs/${song.id}`}>{song.title}</Link>
                    <Mutation mutation={DELETE_SONG}>
                      {(deleteSong, { data }) => (
                        <a
                          className="waves-effect waves-light btn-small btn-floating grey"
                          onClick={e => {
                            deleteSong({
                              variables: { id: song.id },
                              update: (cache, { data: { deleteSong } }) => {
                                const { songs } = cache.readQuery({
                                  query: GET_SONGS
                                });
                                const remainingSongs = songs.filter(
                                  songInCache => songInCache.id !== song.id
                                );
                                cache.writeQuery({
                                  query: GET_SONGS,
                                  data: { songs: remainingSongs }
                                });
                              }
                            });
                          }}
                        >
                          <i className="material-icons">delete</i>
                        </a>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
              <Link
                to="/songs/new"
                className="waves-effect waves-light btn btn-large teal lighten-2 left"
              >
                <i className="material-icons left">add</i>Add song
              </Link>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default SongList;
