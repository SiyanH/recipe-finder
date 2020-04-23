// import React from "react";
// import {
//     deleteUser
// } from "../../services/userService";
//
// export default class SubscribeToOthers extends React.Component {
//     state = {
//         profileUrlInfo: "",
//     };
//     //if username is already taken you have to get something else ***
//     handleDeleteUser = (user) =>
//         deleteUser(user).then((user) =>
//                                          this.props.history.push("./profile")
//         );
//
//     handleOtherParty = (user) =>
//         updateOtherParty(user).then((user) => console.log(user));
//
//     render() {
//         return (
//             <div>
//                 <h1>Subscribe to Others!</h1>
//                 <p>{JSON.stringify(this.state)}</p>
//                 <input
//                     value={this.state.profileUrlInfo}
//                     onChange={(e) =>
//                         this.setState({
//                                           profileUrlInfo: e.target.value,
//                                       })
//                     }
//                     className={"form-control"}
//                     placeholder="username"
//                 />
//
//                 <button
//                     onClick={() =>
//                         this.handleSubscriber(this.state) &&
//                         this.handleOtherParty(this.state)
//                     }
//                     className={"btn btn-primary btn-block"}
//                 >
//                     Confirm Subscription
//                 </button>
//                 <button
//                     onClick={() => this.props.history.push("./")}
//                     className={"btn btn-primary btn-block"}
//                 >
//                     Home
//                 </button>
//             </div>
//         );
//     }
// }
