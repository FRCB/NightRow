import React from 'react';
import './Reservation.css'

export default function Reservation(props) {

    return (
        <div>
            <div >
                <div>
                    <p >Event :
                    <p>{props.reservation.event_title} </p>
                    </p>
                </div>
                <div>
                    <p>Date :
                    <p>{props.reservation.event_date} </p>
                    </p>
                </div>
                <div>
                    <p>Time :
                    <p>{props.reservation.event_time} </p>
                    </p>
                </div>
                <div>
                    <p>Address :
                    <p>{props.reservation.event_address} </p>
                    </p>
                </div>
                <div>
                    <p>Price :
                    <p>{props.reservation.event_price} </p>
                    </p>
                </div>
                <button
                    onClick={() => props.deleteReservation(props.reservation.reservation_id)}>
                    Delete
                    </button>
            </div>
        </div>
    );
}