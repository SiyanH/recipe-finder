import React from "react";
import userService from "../../services/userService";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class UserListComponent extends React.Component {
    state = {users: []};

    componentDidMount() {
        userService.findAllUsers()
            .then((response) => {
                this.setState({users: response.data});
            });
    }

    deleteUser = (username) =>
        userService.deleteUser(username)
            .then(() => this.setState(state => ({
                users: state.users.filter(user => user.username !== username)
            })));

    subscribe = (user) => {
        userService.subscribe(user)
            .then(() => alert(`You followed ${user.username}`));
    };

    render() {
        return (
            <div className="container mt-4">
                <h2>User List</h2>
                <div className="table-responsive">
                    <table className="table text-center">
                        <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map((user, index) => (
                                <tr key={user._id}>
                                    <th scope="row">{user.username}</th>
                                    <td>{user.first}</td>
                                    <td>{user.last}</td>
                                    <td className="row d-flex justify-content-center">
                                        {
                                            this.props.userRole !== undefined &&
                                            <div>
                                                {
                                                    this.props.userRole === 'ADMIN' &&
                                                    <button
                                                        className="btn btn-primary btn-sm mr-2 mb-1 mb-md-0"
                                                        onClick={() =>
                                                            this.deleteUser(user.username)}>Delete
                                                    </button>
                                                }
                                                <button
                                                    className="btn btn-primary btn-sm mr-2 mb-1 mb-md-0"
                                                    onClick={() => this.subscribe(user)}>Subscribe
                                                </button>
                                            </div>
                                        }
                                            <Link to={`/profile/${user.username}`}
                                                  className="btn btn-primary btn-sm">
                                                Profile
                                            </Link>
                                    </td>
                                </tr>))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => {
    return {
        userRole: state.user.profile.role
    };
};

export default connect(stateToPropertyMapper)(UserListComponent);
