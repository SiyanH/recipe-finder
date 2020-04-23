import React from "react";
import axios from "axios";

export default class ViewUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("/api/users")

      .then((response) => {
        console.log(response);
        this.setState({ users: response.data });
      });
  }

  render() {
    return (
      <ul>
        {this.state.users.map((user) => (
          <li>{user.username}</li>
        ))}
      </ul>
    );
  }
}
