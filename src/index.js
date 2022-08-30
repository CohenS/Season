import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

if (module.hot) {
  module.hot.accept();
}

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() { // updating 2 properties by overriding did mount method
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() { // concentrating all the components in one method to ease any further change
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />; // the main componennt - season display
    }

    return <Spinner message="Please accept location request" />; // spinner components call
  }

  render() {
    return <div >{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));