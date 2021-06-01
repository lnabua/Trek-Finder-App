import React from 'react';
import "semantic-ui-css/semantic.min.css";
import TrailCard from "./TrailCard";
import TrailSpecs from "./TrailSpecs";
import SearchBar from "./SearchBar";

class Home extends React.Component {

  state = {
    trails: [],
    searchTerm: "",
    currentTrail: {},
    view: false,
    reviews: [],
  }

  getTrails = () => {
    let params = {
      lat: "37.09024",
      lon: "-95.712891",
      };
    let trailURL = `http://localhost:3000/trails/?lat=${params.lat}&lon=${params.lon}`


    fetch(trailURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => r.json())
      .then((result) => {
        // console.log(result.trails)
        this.setState({ trails: result.trails });
      });
  };

  getReviews = () => {
    fetch("http://localhost:3000/reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => r.json())
      .then((json) => {
        this.setState({ reviews: json });
      });
  };

  componentDidMount() {
    this.getTrails();
    this.getReviews();
  };
  
  handleSearchTermChange = (searchTerm) => { 
    this.setState({ searchTerm })
  }

  filterTrail = (trail) => {
      const normalized = this.state.searchTerm.toLowerCase().split(" ").join("")
      return trail.location.toLowerCase().split(" ").join("").indexOf(normalized) !== -1;
  }

  viewTrail = (e, trail) => {
    e.stopPropagation();
    this.setState({
      currentTrail: trail,
      view: true,
    });
  };

  goBack = () => {
    this.setState({
      currentTrail: {},
      view: false,
    });
  };

  addToFavorites = (e, trail) => {
    e.stopPropagation()
    let favorite = {
      user_id: this.state.currentUser.id,
      trail_id: trail.id
    }

    let reqPackage = {
      headers: {"Content-Type":"application/json"},
      method: "POST",
      body: JSON.stringify(favorite)
    }
    fetch(`http://127.0.0.1:9393/favorites`, reqPackage)
    .then(r => r.json())
    .then(purch =>  {this.setState({
      trails: this.state.trails.map(trail => trail.id !== purch.trail.id ? trail : purch.trail ), trailView: false})
      this.props.history.push(`/users/${this.state.currentUser.id}`)
    }
    )
  }

  render(){
    return (
      <div class="centered ui four stackable cards">
        <SearchBar searchTerm={this.state.searchTerm} handleSearchTermChange={this.handleSearchTermChange} />
        {!this.state.view ? ( 
          this.state.trails.filter(this.filterTrail).map((trail, id) => (
            <TrailCard trail={trail} key={id} view={this.viewTrail} />
          ))
        ) : (
          <TrailSpecs
          trail={this.state.currentTrail}
          goBack={this.goBack}
          reviews={this.state.reviews}
        />
        )}
    </div>
    );
  }
};

export default Home;