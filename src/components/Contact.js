import React, { Component } from 'react';
import axios from 'axios';

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            message: ''
        }
        this.sendEmail = this.sendEmail.bind(this)
    }

    sendEmail() {
        let { user_name, user_email, message } = this.state;
        let body = { user_name, user_email, message };

        axios.post(`/send`, body)
            .then(() => this.setState({
                user_name: this.state.name,
                user_email: this.state.email,
                message: this.state.message
            }))
            .then(() => {
                alert('Your message has been sent')
                this.props.history.push('/')
            })
    }

    render() {

        return (
            <div className='add-event-page'>
                <p>Name</p>
                <input
                    type='text'
                    placeholder='Name'
                    onChange={(e) => this.setState({ user_name: e.target.value })} />
                <br />
                <p>Email</p>
                <input
                    type='text'
                    placeholder='Email'
                    onChange={(e) => this.setState({ user_email: e.target.value })} />
                <br />
                <p>Message</p>
                <textarea
                    style={{ whiteSpace: 'pre-wrap' }}
                    rows="10"
                    type="text"
                    placeholder='Write your message here'
                    onChange={(e) => this.setState({ message: e.target.value })} />
                <br />
                <button
                    className='send-button'
                    onClick={this.sendEmail}>
                    Send your message
                </button>
            </div>
        )
    }
}
