import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Event extends Component {

    render() {

        return (
            <div>
                <Link style={{ textDecoration: 'none' }} to={`/event/${this.props.event.event_id}`}>
                    <div className='each-box'>
                        <div>
                            <p>Event :
                            <h6>{this.props.event.event_title} </h6>
                            </p>
                        </div>
                        <div>
                            <p>Date :
                            <h6>{this.props.event.event_date} </h6>
                            </p>
                        </div>
                        <div>
                            <p>Time :
                            <h6>{this.props.event.event_time} </h6>
                            </p>
                        </div>
                        <div>
                            <p>Price :
                            <h6>${this.props.event.event_price} </h6>
                            </p>
                        </div>
                    </div>
                </Link>
            </div >
        );
    }
}

