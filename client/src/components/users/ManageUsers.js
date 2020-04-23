import React from "react";
import axios from "axios";
import {deleteUsers, updateOtherParty, updateSubscribers} from "../../services/userService";

export default class ManageUsers extends React.Component {
    state = {users: []};

    componentDidMount() {
        axios
            .get("/api/users")

            .then((response) => {
                console.log(response);
                this.setState({users: response.data});
            });
    }

    deleteUser = (username, index) =>
        deleteUsers(username)
            .then(() => this.setState(state => {
                state.users.splice(index, 1);
                return {users: state.users};
            }));

    subscribe = (username) => {
        updateSubscribers(username)
            .then(() => updateOtherParty(username))
            .then(() => alert(`You followed ${username}`));
    };

    render() {
        return (
            <div className="container mt-4">
                <h2>User List</h2>
                <table className="table text-center">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map((user, index) => (
                            <tr key={user._id}>
                                <td scope="row">{user.username}</td>
                                <td>{user.first}</td>
                                <td>{user.last}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm mr-3"
                                            onClick={() =>
                                                this.deleteUser(user.username, index)}>Delete
                                    </button>
                                    <button className="btn btn-primary btn-sm"
                                            onClick={() => this.subscribe(user.username)}>Subscribe
                                    </button>
                                </td>
                            </tr>))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
