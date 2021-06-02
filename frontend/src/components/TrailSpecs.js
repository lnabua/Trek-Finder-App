import React from "react";
// import ReviewForm from "./ReviewForm";

const TrailSpecs = (props) => {
  return (
    <div className="ui segment">
      <div className="ui two column centered grid">
        <div className="row">
          <div className="eight wide column">
            <img
              alt="oh no!"
              className="ui large rectangular image bordered"
              src={props.trail.imgSmall}
            />
          </div>
          <div className="six wide column">
            <h2>{props.trail.name}</h2>
            <p>
              <strong>Location: {props.trail.location}</strong>
              <br />
              <strong>Difficulty: {props.trail.difficulty}</strong>
              <br />
              <strong>Length: {props.trail.length}</strong>
              <br />
              <strong>Rating: {props.trail.stars}★</strong>
              <br />
              <strong>Overview: </strong><br />
              {props.trail.summary}
              <br />
            </p>
            <div>
              <strong>Reviews</strong>
              {/* {props.reviews.filter((review) => review.trail_id === props.trail.id).map((review) => (
                <li key={review.id}>{review.comment}</li>
              ))} */}
              <br />
              {/* {props.newReview && props.logged_in ? (
                <ReviewForm
                addNewReview={props.addNewReview}
                user={props.user}
                  trail={props.trail}
                  // handleSubmit={props.handleSubmit}
                  cancelReview={props.cancelReview}
                />
              ) : null}
              <br />
              {!props.newReview ? (
                <button
                  className="ui button fluid"
                  onClick={() => props.addReview()}
                >
                  Leave a review
                </button>
              ) : null} */}
            </div>
            <br />
            <button
              className="ui button fluid"
              onClick={(e) => props.addToFavorites(e, props.trail)}
            >
              Add to Favorites
            </button>
            <br />
            <button 
              className="ui button fluid"
              onClick={() => props.goBack()}
            >
              Go Back to Trails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailSpecs;
