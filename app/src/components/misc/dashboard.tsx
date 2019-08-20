import * as React from 'react';
import { connect } from 'react-redux';
import Info from '../messages/Message';
import api from '../../services/api';
import { logout } from '../state/actions/auth';
import { Input } from 'semantic-ui-react';
import * as socketIOClient from 'socket.io-client';

interface Props {
    user: any;
    logout: Function;

}

interface State {
    dbInfos: {
        usersCount: number;
        connectedUsers: number;
    };
    usersToAdd: string;
    //
}

class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            dbInfos: {
                usersCount: 0,
                connectedUsers: 0,
            },
            usersToAdd: '',
        };
    }

    componentWillMount() {
        this.getInfos();
    }

    changeUsersAdd = (e: any, data: any) => {
        console.log(data);
        this.setState({ usersToAdd: data.value });
    }

    getInfos = () => {
        api.dev.getDBinfos()
            .then((result) => this.setState({ dbInfos: result }))
            .catch((err) => console.log(err));
    }

    makeUser = () => {
        api.dev.makeUser()
            .then(() => this.getInfos());
    }

    // fetchApiProgress = async (onProgress: any, nb: number) => {
    //     return new Promise((res, rej) => {
    //         let xhr = new XMLHttpRequest();
    //         xhr.open('get', 'http://localhost:3000/api/dev/makeUsers/' + nb);
    //         xhr.onload = (e: any) => res(e.target);
    //         xhr.onerror = rej;
    //         if (xhr.upload && onProgress) {
    //             xhr.upload.onprogress = onProgress;
    //         }
    //         xhr.send();
    //     });
    // }

    makeUsers = () => {
        let nb = parseInt(this.state.usersToAdd, 10);
        if (nb > 0 && nb < 1500) {
            const socket = socketIOClient('http://localhost:3000/makeUsers');
            socket.emit('NUMBER', nb);
            socket.on('COUCOU', (data: any) => console.log(data));
        }
    }

    render() {
        const { user } = this.props;
        const { dbInfos, usersToAdd } = this.state;
        const userConnected = (user && user.info && user.info.login) ? user.info.login : 'None';
        return (
            <div className="main-dashboard">
                <h1>Connected as user : {userConnected}</h1>
                <h1>Users in DB: {dbInfos.usersCount}</h1>
                <h1>Connected users : {dbInfos.connectedUsers}</h1>
                <div style={{ marginTop: 20 }}>
                    <button className="btn btn-primary" onClick={() => this.props.logout()}>Logout</button>
                    <button className="btn btn-primary" style={{ marginLeft: 20 }} onClick={this.makeUser}>
                        Make User
                    </button>
                </div>
                <div className="addUsersInput">
                    <p>Add</p>
                    <Input
                        value={usersToAdd}
                        onChange={this.changeUsersAdd}
                        max={1500} />
                    <p>users.</p>
                    <button className="btn btn-primary" onClick={this.makeUsers}>==></button>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state: any) {
    return {
        user: state.user.user,
    };
}

export default connect<{}, any>(mapStateToProps, { logout })(Dashboard);