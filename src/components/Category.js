import React, { Component } from 'react';
// import { GoogleApiWrapper } from 'google-maps-react'
import { Link } from 'react-router-dom';
import MapContainer from './MapContainer';
import Event from './Event';
import axios from 'axios';
import { getUser } from './../redux/reducer';
import { connect } from 'react-redux';

// const {
//     REACT_APP_API_KEY
// } = process.env;

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }

        this.getCategory = this.getCategory.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
    }

    componentDidMount() {
        this.getCategory();
        this.props.getUser();
    }

    getCategory(title, date, hour, price) {
        const body = {
            title: title,
            date: date,
            hour: hour,
            price: price
        }
        axios.get(`/api/category/${this.props.match.params.category}`, body)
            .then((res) => this.setState({ events: res.data }))
    }

    deleteEvent(id) {
        axios.delete(`/api/events/${id}`)
            .then(this.getCategory())
    }

    render() {
        let { user_name } = this.props.user;

        let mappedEvents = this.state.events.map((event, i) => {

            return (
                <div key={i}>
                    <Event
                        event={event}
                        getCategory={this.getCategory}
                        deleteEvent={this.deleteEvent}
                    />
                </div>
            )
        })

        return (
            <div className='category-flex'>
                <div className='event-block' >
                    <div className='event-box'>
                        {mappedEvents}
                        <div>
                            {
                                user_name ? (
                                    <Link to='/add'>
                                        <button className='add-button'>
                                            Add an Event
                                        </button>
                                    </Link>
                                ) : (
                                        <div></div>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className='map-size'>
                    <MapContainer
                        google={this.props.google}
                        events={this.state.events} />
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// export default GoogleApiWrapper({
//     apiKey: REACT_APP_API_KEY
// })(Category)


export default connect(mapStateToProps, { getUser })(Category);