import * as React from 'react';
import { Button, Image, FormControl } from 'react-bootstrap';
var style = require('./userCard.css');

export interface UserCardProps {
    user: any;
    picture: any;
    age: any;
}

export default class UserCard extends React.Component<UserCardProps> {
    constructor(props: any) {
        super(props);

        this.state = {
            user : [],
            pictures: [],
            age: 1
        };
    }

    render() {
        const user = this.props.user;
        const picture = this.props.picture;
        return (
            <div className={style.card}>
                <div className={style.topInfo}>
                    <Image
                        className={style.cardImage}
                        src={picture}
                        alt="Profil picture"
                    />
                    <div className={style.cardInfo}>
                        <p className={style.cardUserName}>{user.username}</p>
                        <p>{this.props.age} - {user.gender === 'male' ? 'M' : 'F'} - {user.city}</p>
                    </div>
                </div>
                <div className={style.bottomInfo}>
                    <Button>SAVE</Button>
                </div>
            </div>
        );
    }
}