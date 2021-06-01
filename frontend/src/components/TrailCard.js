import { Card, Image } from "semantic-ui-react";

const TrailCard = (props) => {
  return (
    <Card raised onClick={(e) => props.view(e, props.trail)} className="card-size" style={{ width: "325px" }}>
      <Card.Content>
        <Card.Header>{props.trail.name}</Card.Header>
        <Image src={props.trail.imgSmall} className="centered card-image" />
        <Card.Description>
          <strong>Location: {props.trail.location}</strong>
          <br />
          <br />
          {props.trail.summary}
        </Card.Description>{" "}
      </Card.Content>
    </Card>
  );
};

export default TrailCard;
