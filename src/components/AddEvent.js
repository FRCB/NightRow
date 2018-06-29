import React, { Component } from 'react';
import axios from 'axios';
import S3FileUpload from 'aws-s3';
import { Link } from 'react-router-dom'

const { REACT_APP_AWSAccessKeyId, REACT_APP_AWSSecretKey } = process.env

const config = {
    bucketName: 'nightrow',
    region: 'us-east-1',
    accessKeyId: REACT_APP_AWSAccessKeyId,
    secretAccessKey: REACT_APP_AWSSecretKey,
}

export default class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            title: '',
            date: '',
            time: '',
            address: '',
            about: '',
            contact: '',
            price: '',
            lat: '',
            lng: '',
            img: ''
        }
        this.uploadImg = this.uploadImg.bind(this)
        this.createEvent = this.createEvent.bind(this)
    }

    createEvent() {
        let { category, title, date, time, address, about, contact, price, lat, lng, img } = this.state;
        category = +category;
        let body = { category, title, date, time, address, about, contact, price, lat, lng, img };

        axios.post(`/api/event`, body)
            .then(() => this.setState({
                category: '',
                title: '',
                date: '',
                time: '',
                address: '',
                about: '',
                contact: '',
                price: '',
                lat: '',
                lng: '',
                img: ''
            }))
    }

    uploadImg(e) {
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then(data => this.setState({ img: data.location }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <div className='add-event-page'>
                <p>Category</p>
                <select
                    name='category'
                    onChange={(e) => this.setState({ category: e.target.value })}>
                    <option value=''>-</option>
                    <option value='1'>Outdoor</option>
                    <option value='2'>Afterwork</option>
                    <option value='3'>Clubbing</option>
                    <option value='4'>Live</option>
                </select>
                <br />
                <p>Title</p>
                <input
                    type="text"
                    placeholder='Title'
                    onChange={(e) => this.setState({ title: e.target.value })} />
                <br />
                <p>Date</p>
                <input
                    type="date"
                    placeholder='Date'
                    onChange={(e) => this.setState({ date: e.target.value })} />
                <br />
                <p>Time</p>
                <input
                    type="time"
                    placeholder='Time'
                    onChange={(e) => this.setState({ time: e.target.value })} />
                <br />
                <p>Address</p>
                <textarea
                    type="text"
                    placeholder='Address'
                    onChange={(e) => this.setState({ address: e.target.value })} />
                <br />
                <p>About</p>
                <textarea
                    type="text"
                    placeholder='About'
                    onChange={(e) => this.setState({ about: e.target.value })} />
                <br />
                <p>Contact</p>
                <input
                    type="text"
                    placeholder='Contact'
                    onChange={(e) => this.setState({ contact: e.target.value })} />
                <br />
                <p>Price</p>
                <input
                    type="text"
                    placeholder='Price'
                    onChange={(e) => this.setState({ price: e.target.value })} />
                <br />
                <p>Latitude (map)</p>
                <input
                    type="text"
                    placeholder='Latitude'
                    onChange={(e) => this.setState({ lat: e.target.value })} />
                <br />
                <p>Longitude (map)</p>
                <input
                    type="text"
                    placeholder='Longitude'
                    onChange={(e) => this.setState({ lng: e.target.value })} />
                <br />
                <input
                    className='choose-file'
                    type="file"
                    value={this.state.img}
                    onChange={this.uploadImg}
                />
                <Link to='/'>
                    <button
                        className='complete-button'
                        onClick={this.createEvent}>
                        COMPLETE
                </button>
                </Link>
            </div>
        )
    }
}

