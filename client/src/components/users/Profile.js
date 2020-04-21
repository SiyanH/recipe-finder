import React from "react";
import {profile} from "../../services/userService";

export default class Profile extends React.Component {

    state = {
        profile: {
            username: '',
            password: '',
            first: '',
            last: '',
            email: '',
            roles: []
        }
    }

    componentDidMount() {
        profile().then(res => this.setState({
            profile: res.data
        }))
    }

    render() {
        return(
            <div>
                <h1>Profile</h1>
                <p>{this.state.profile.first}</p>
                <p>{this.state.profile.last}</p>
                <p>{JSON.stringify(this.state.profile)}</p>
                <button
                    onClick={() => this.props.history.push('./')}
                    className={'btn btn-primary btn-block'}>
                    Home
                </button>
            </div>
        )
    }
}