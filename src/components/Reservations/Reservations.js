import React, { Component } from "react";
import Homepage from "./../Homepage/Homepage";
import Reservation from "./../Reservation/Reservation";
import { getUser } from './../../redux/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Reservations.css';

class Reservations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: [],
        }

        this.getReservations = this.getReservations.bind(this)
        this.deleteReservation = this.deleteReservation.bind(this)
    }

    componentDidMount() {
        this.props.getUser();
        this.getReservations();
    }

    getReservations() {
        axios.get(`/api/reservation`)
            .then((res) => this.setState({ reservations: res.data }))
    }

    deleteReservation(id) {
        axios.delete(`/api/reservation/${id}`)
            .then(this.getReservations())
    }

    render() {
        let { user_name, picture } = this.props.user;

        let mappedReservations = this.state.reservations.map((reservation, i) => {
            return (
                <div key={i}>
                    <Reservation
                        reservation={reservation}
                        deleteReservation={this.deleteReservation}
                    />
                </div>

            )
        })

        return (
            <div>
                {
                    user_name ? (
                        <div className='reservation-flex' >
                            <div className='left-block'>
                                <div className='reservation-title'>
                                    <h1>{user_name}'s</h1>
                                    <h1>Reservations</h1>
                                </div>
                                <img
                                    className='profile-image'
                                    src={picture} alt="profile pic"
                                />
                            </div>
                            <div className='right-block'>
                                <div className='reserved-event'>
                                    {mappedReservations}
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <p className='alert'>Please, login in order to be redirected to your reservations</p>.
                                <Homepage />
                            </div>
                        )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getUser })(Reservations);

