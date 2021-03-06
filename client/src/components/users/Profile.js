import React from "react";
import {profile, findFollowers} from "../../services/userService";
import {findProfile} from "../../actions/userActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Profile extends React.Component {
    state = {
        followers: []
    };

    componentDidMount() {
        this.props.findProfile()
            .then(() => findFollowers(this.props.profile._id))
            .then(followers => this.setState({followers: followers}));
    }

    render() {
        return (
            /*Profile Header*/
            <div className="container mt-4 mb-4">
                {this.props.profile.username && this.props.profile.role === "ADMIN"
                && (
                    <div className="card">
                        <div className="card-header">
                            <h1 className="display-5 text-center app-header-font">
                                Chef {this.props.profile.first} {this.props.profile.last}'s
                                Profile
                            </h1>
                            <h6 className="card-subtitle mb-2 app-text-font text-muted">
                                Username: {this.props.profile.username} </h6>
                            <h6 className="card-subtitle mb-2 app-text-font text-muted">
                                Role: Administrator</h6>
                        </div>
                    </div>
                )}
                {this.props.profile.username && this.props.profile.role === "USER"
                && (
                    <div className="card">
                        <div className="card-header">
                            <h1 className="display-5 text-center app-header-font">
                                Chef {this.props.profile.first} {this.props.profile.last}'s
                                Profile
                            </h1>
                            <h6 className="card-subtitle mb-2 app-text-font text-muted">
                                Username: {this.props.profile.username} </h6>
                            <h6 className="card-subtitle mb-2 app-text-font text-muted">
                                Role: User</h6>
                        </div>
                    </div>
                )}
                {/* PROFILE BUTTONS*/}
                {this.props.profile.username && (
                    <button
                        onClick={() => this.props.history.push("./update-profile")}

                        className="btn btn-block app-margin-block app-primary-button mt-3">
                        Update Profile Information
                    </button>
                )}

                <button
                    onClick={() => this.props.history.push("./user-list")}
                    className="btn btn-block app-margin-block app-primary-button">
                    User List
                </button>

                {this.props.profile.username && (
                    <button
                        onClick={() => this.props.history.push("./liked-recipes")}

                        className="btn btn-block app-margin-block app-primary-button">
                        View Liked Recipes
                    </button>
                )}

                {this.props.profile.username && (
                    <button
                        onClick={() => this.props.history.push("./create-recipe")}
                        className="btn btn-block app-margin-block app-primary-button">
                        Create Your Own Recipe!
                    </button>
                )}

                <button
                    onClick={() => this.props.history.push("./")}
                    className="btn btn-block app-margin-block app-primary-button">
                    Home
                </button>
                <br/>

                {/*Followers and Following Lists*/}
                {
                    this.props.profile.username &&
                    <div className= 'mt-4'>
                        <div className="card">
                            <div className="card-header">
                                <h1 className="display-6 text-center app-header-font">
                                    Following
                                </h1>
                                <ul className="list-group">
                                    {
                                        this.props.profile.subscribedUsers.map(
                                            subscribedUser =>
                                                <li key={subscribedUser._id} className="list-group-item">
                                                    <Link
                                                        to={`/profile/${subscribedUser.username}`}>
                                                        {subscribedUser.username}</Link>
                                                </li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-header">
                                <h1 className="display-6 text-center app-header-font">
                                    Followers
                                </h1>
                                <ul className="list-group">
                                    {
                                        this.state.followers.map(
                                            follower =>
                                                <li key={follower._id} className="list-group-item">
                                                    <Link to={`/profile/${follower.username}`}>
                                                        {follower.username}</Link>
                                                </li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => {
    return {
        profile: state.user.profile,
    };
};

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findProfile: () =>
            profile().then(profile => dispatch(findProfile(profile.data))),
    };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(Profile);
