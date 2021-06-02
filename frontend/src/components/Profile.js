import React from 'react';
import { Segment } from 'semantic-ui-react'

class Profile extends React.Component {

  render(){
    return (
      <div>
      <Segment raised onClick={() => console.log("Faves")}>Favorite Trails</Segment>
      <br />
      <Segment raised onClick={() => console.log("Complete")}>Completed Trails</Segment>
      <br />
      <Segment raised onClick={() => console.log("Reviews")}>Trail Reviews</Segment>
      </div>
    )
  }
}

export default Profile;