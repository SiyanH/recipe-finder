import React from "react";
import {profile, updateSubscribers} from "../../services/userService";
import {findProfile} from "../../actions/userActions";
import {connect} from "react-redux";

class Profile extends React.Component {
    componentDidMount() {
        this.props.findProfile().then();

    }

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <p>{this.props.profile.first}</p>
                <p>{this.props.profile.last}</p>
                <p>{JSON.stringify(this.props.profile)}</p>
                <button
                    onClick={() => this.props.history.push("./update-profile")}
                    className={"btn btn-primary btn-block"}
                >
                    Update Profile Information
                </button>
                <button
                    onClick={() => this.props.history.push("./view-all-users")}
                    className={"btn btn-primary btn-block"}
                >
                    View All Users
                </button>
                <button
                    onClick={() => this.props.history.push("./delete-user")}
                    className={"btn btn-primary btn-block"}
                >
                    Delete User
                </button>
                <button
                    onClick={() => this.props.history.push("./subscribe-to-others")}
                    className={"btn btn-primary btn-block"}
                >
                    Subscribe to Other Users
                </button>
                <button
                    onClick={() => this.props.history.push("./liked-recipes")}
                    className={"btn btn-primary btn-block"}>View Liked Recipes
                </button>
                <button
                    onClick={() => this.props.history.push("./")}
                    className={"btn btn-primary btn-block"}
                >
                    Home
                </button>
                <p>{this.props.profile.subscribeToOthers}</p>
                <p>{this.props.profile.subscriptionsFromOthers}</p>
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => {
    return {
        profile: state.user.profile
    }
};

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findProfile: () => profile().then(profile => dispatch(findProfile(profile.data)))
    }
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(Profile);
