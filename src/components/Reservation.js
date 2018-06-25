import React from 'react';
import { Link } from 'react-router-dom';

export default function Reservation(props) {

    return (
        <div>
            <div className='each-box' >
                <div>
                    <p >Event :
                    <h6>{props.reservation.event_title} </h6>
                    </p>
                </div>
                <div>
                    <p>Date :
                    <h6>{props.reservation.event_date} </h6>
                    </p>
                </div>
                <div>
                    <p>Time :
                    <h6>{props.reservation.event_time} </h6>
                    </p>
                </div>
                <div>
                    <p>Address :
                    <h6>{props.reservation.event_address} </h6>
                    </p>
                </div>
                <div>
                    <p>Price :
                    <h6>{props.reservation.event_price} </h6>
                    </p>
                </div>
                <button className='delete-button'
                    onClick={() => props.deleteReservation(props.reservation.reservation_id)}>
                    Delete
                </button>
                <Link to='/payment'>
                    <button className='pay-button'>
                        Pay
                    </button>
                </Link>
            </div>
        </div>
    );
}