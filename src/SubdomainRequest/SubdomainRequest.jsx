import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class SubdomainRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            details: {
                name: '',
                points: '',
                description: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { details } = this.state;
        this.setState({
            details: {
                ...details,
                [name]: value
            }
        });
        console.log('this.state :>> ', this.state.details);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { details } = this.state;
        // if (user.email && user.password) {
            this.props.requestSd(details);
        // }
    }
    // componentDidMount() {
    //     this.props.getUsers();
    // }

    render() {
        const { registering, user  } = this.props;
        const { details, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                                <h1>Hi {user.user.Name}!</h1>

                <p>You're logged in with React!!</p>
                <Link to="/">Dashboard</Link>
                <form onSubmit={this.handleSubmit}>
                    <label for="sd"> Sub domain
                        <input type="text" name="name" value={details.name} onChange={this.handleChange}></input>
                    </label>
                    <label for="pointer"> Points to
                        <input type="text" name="pointer" value={details.pointer} onChange={this.handleChange}></input>
                    </label>                    
                    <label for="description">Description
                        <input type="text" name="description" value={details.description} onChange={this.handleChange}></input>
                    </label>
                    <button>Submit Request</button>
                </form>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    deleteSd: userActions.deleteSd,
    requestSd: userActions.requestSd
}

const connectedHomePage = connect(mapState, actionCreators)(SubdomainRequest);
export { connectedHomePage as SubdomainRequest };