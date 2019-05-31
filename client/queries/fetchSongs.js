import gql from 'graphql-tag';

export const GET_SONGS = gql`
  {
    songs {
      id
      title
    }
  }
`;
