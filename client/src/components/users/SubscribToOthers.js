import React from "react";
import {
  updateSubscribers,
  updateOtherParty,
} from "../../services/userService";
import "../../common/style.css";

export default class SubscribeToOthers extends React.Component {
  state = {
    profileUrlInfo: "",
  };
  //if username is already taken you have to get something else ***
  handleSubscriber = (user) =>
    updateSubscribers(user).then((user) =>
      this.props.history.push("./profile")
    );

  handleOtherParty = (user) =>
    updateOtherParty(user).then((user) => console.log(user));

  render() {
    return (
        <div className="container mt-4 mb-4">
            <h1 className="display-6 app-header-font">Subscribe to Others Users</h1>
            {/*<p>{JSON.stringify(this.state)}</p>*/}
            <input
              value={this.state.profileUrlInfo}
              onChange={(e) =>
                this.setState({
                  profileUrlInfo: e.target.value,
                })
              }
              className="form-control app-margin-block col-5"
              placeholder="username"
            />

            <button
              onClick={() =>
                this.handleSubscriber(this.state) &&
                this.handleOtherParty(this.state)
              }
              className="btn app-primary-button app-margin-block col-5"
            >
              Confirm Subscription
            </button>
            <button
              onClick={() => this.props.history.push("./")}
              className="btn app-primary-button app-margin-block col-5"
            >
              Home
            </button>
      </div>
    );
  }
}
