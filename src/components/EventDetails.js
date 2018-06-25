import React, { Component } from 'react';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';

const { REACT_APP_AWSAccessKeyId, REACT_APP_AWSSecretKey } = process.env

const config = {
    bucketName: 'nightrow',
    region: 'us-east-1',
    accessKeyId: REACT_APP_AWSAccessKeyId,
    secretAccessKey: REACT_APP_AWSSecretKey,
}

export default class EventDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            toggleBtn: false,
            eventId: 0,
            editTitle: '',
            editDate: '',
            editTime: '',
            editAddress: '',
            editAbout: '',
            editContact: '',
            editPrice: '',
            editLat: '',
            editLng: '',
            selectedImg: ''
        }

        this.getEvent = this.getEvent.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.editEvent = this.editEvent.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
        this.createReservation = this.createReservation.bind(this)
        this.upload = this.upload.bind(this)

    }

    componentDidMount() {
        this.getEvent();
        axios.get(`/auth/user`).then((res) => this.setState({ user: res.data }))
    }

    getEvent(title, date, time, address, about, contact, price, lat, lng, img) {
        const body = {
            title: title,
            date: date,
            time: time,
            address: address,
            about: about,
            contact: contact,
            price: price,
            lat: lat,
            lng: lng,
            img: img
        }
        axios.get(`/api/event/${this.props.match.params.id}`, body)
            .then((res) => this.setState({
                events: res.data,
                eventId: res.data[0].event_id,
                editTitle: res.data[0].event_title,
                editDate: res.data[0].event_date,
                editTime: res.data[0].event_time,
                editAddress: res.data[0].event_address,
                editAbout: res.data[0].event_about,
                editContact: res.data[0].event_contact,
                editPrice: res.data[0].event_price,
                editLat: res.data[0].event_lat,
                editLng: res.data[0].event_lng,
                selectedImg: res.data[0].event_img
            }))
    }

    toggleEdit() {
        if (this.state.toggleBtn) {
            this.editEvent(
                this.state.editTitle, this.state.editDate, this.state.editTime, this.state.editAddress, this.state.editAbout, this.state.editContact, this.state.editPrice,
                this.state.editLat,
                this.state.editLng, this.state.selectedImg)
        }
        this.setState({ toggleBtn: !this.state.toggleBtn })
    }

    editEvent(title, date, time, address, about, contact, price, lat, lng, img) {
        const body = {
            title: title,
            date: date,
            time: time,
            address: address,
            about: about,
            contact: contact,
            price: price,
            lat: lat,
            lng: lng,
            img: img
        }
        axios.put(`/api/event/${this.props.match.params.id}`, body)
            .then(res => {
                this.setState({
                    editTitle: res.data[0].event_title,
                    editDate: res.data[0].event_date,
                    editTime: res.data[0].event_time,
                    editAddress: res.data[0].event_address,
                    editAbout: res.data[0].event_about,
                    editContact: res.data[0].event_contact,
                    editPrice: res.data[0].event_price,
                    editLat: res.data[0].event_lat,
                    editLng: res.data[0].event_lng,
                    selectedImg: res.data[0].event_img
                })
            })
            .then(this.getEvent())
    }

    deleteEvent(id) {
        axios.delete(`/api/event/${id}`)
            .then(() => {
                this.props.history.push('/')
            })
    }

    createReservation() {
        const body = {
            user_id: this.state.user.id,
            event_id: this.state.eventId
        }

        axios.post(`/api/reservation`, body)
            .then((res) => console.log(res.data))
            .then(() => {
                this.props.history.push(`/reservations`)
            })
    }

    upload(e) {
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then(data => this.setState({ selectedImg: data.location }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div>
                    {
                        !this.state.toggleBtn
                            ?
                            <div className='show-details'>
                                <h1>{this.state.editTitle}</h1>
                                <hr />
                                <p>
                                    Date
                                    <h6>{this.state.editDate}</h6>
                                </p>
                                <p>
                                    Time
                                    <h6>{this.state.editTime}</h6>
                                </p>
                                <p>
                                    Address
                                    <h6>{this.state.editAddress}</h6>
                                </p>
                                <hr />
                                <p>
                                    About
                                    <h6>{this.state.editAbout}</h6>
                                </p>
                                <hr />
                                <p>
                                    Contact
                                    <h6>{this.state.editContact}</h6>
                                </p>
                                <p>
                                    Price
                                    <h6>{this.state.editPrice}</h6>
                                </p>
                                <hr />
                                <p>Latitude & Longitude
                                    <h6>{this.state.editLat}</h6>
                                    <h6>{this.state.editLng}</h6>
                                </p>
                                <img src={this.state.selectedImg} alt="pic" />
                            </div>
                            :
                            <div className='edit-box'>
                                <p>Title</p>
                                <input
                                    value={this.state.editTitle}
                                    onChange={(e) => this.setState({ editTitle: e.target.value })} />
                                <br />
                                <p>Date</p>
                                <input
                                    value={this.state.editDate}
                                    onChange={(e) => this.setState({ editDate: e.target.value })} />
                                <br />
                                <p>Time</p>
                                <input
                                    value={this.state.editTime}
                                    onChange={(e) => this.setState({ editTime: e.target.value })} />
                                <br />
                                <p>Address</p>
                                <textarea
                                    value={this.state.editAddress}
                                    onChange={(e) => this.setState({ editAddress: e.target.value })} />
                                <br />
                                <p>About</p>
                                <textarea
                                    value={this.state.editAbout}
                                    onChange={(e) => this.setState({ editAbout: e.target.value })} />
                                <br />
                                <p>Contact</p>
                                <input
                                    value={this.state.editContact}
                                    onChange={(e) => this.setState({ editContact: e.target.value })} />
                                <br />
                                <p>Price</p>
                                <input
                                    value={this.state.editPrice}
                                    onChange={(e) => this.setState({ editPrice: e.target.value })} />
                                <br />
                                <p>Latitude</p>
                                <input
                                    value={this.state.editLat}
                                    onChange={(e) => this.setState({ editLat: e.target.value })} />
                                <br />
                                <p>Longitude</p>
                                <input
                                    value={this.state.editLng}
                                    onChange={(e) => this.setState({ editLng: e.target.value })} />
                                <input
                                    type="file"
                                    onChange={this.upload}
                                />
                            </div>
                    }

                    <button
                        className='reserve-button'
                        onClick={this.createReservation}>
                        Reserve
                    </button>
                    <br />

                    <button
                        className='delete-button-2'
                        onClick={() => this.deleteEvent(this.state.eventId)}>
                        Delete
                    </button>
                    <br />

                    <button
                        className='edit-button'
                        onClick={() => this.toggleEdit()}>
                        {this.state.toggleBtn ? "Save" : "Edit"}
                    </button>
                </div>
            </div >
        );
    }
}
