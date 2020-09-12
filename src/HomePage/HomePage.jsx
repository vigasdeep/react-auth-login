import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteSd(id) {
        return (e) => this.props.deleteSd(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.user.Name}!</h1>
                <p>You're logged in with React!!</p>
                <Link to="/request-subdomain">Request Subdomain</Link>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((sd, index) =>
                            <li key={sd.ID}>

                                { sd.Name + ' ' + sd.Pointer + ' ' + sd.Description}
                                {
                                    sd.deleting ? <em> - Deleting...</em>
                                    : sd.deleteError ? <span className="text-danger"> - ERROR: {sd.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteSd(sd.ID)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
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
    deleteSd: userActions.deleteSd
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };