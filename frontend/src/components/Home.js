import React from 'react';
import "semantic-ui-css/semantic.min.css";
import TrailCard from "./TrailCard";
import TrailSpecs from "./TrailSpecs";
import SearchBar from "./SearchBar";

class Home extends React.Component {

  state = {
    searchTerm: "",
    currentTrail: {},
    view: false
  }
  
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

  render(){
    return (
      <div class="centered ui four stackable cards">
        <SearchBar searchTerm={this.state.searchTerm} handleSearchTermChange={this.handleSearchTermChange} />
        {!this.state.view ? ( 
          this.props.trails.filter(this.filterTrail).map((trail, id) => (
            <TrailCard trail={trail} key={id} view={this.viewTrail} />
          ))
        ) : (
          <TrailSpecs
          trail={this.state.currentTrail}
          goBack={this.goBack}
          reviews={this.props.reviews}
        />
        )}
    </div>
    );
  }
};

export default Home;