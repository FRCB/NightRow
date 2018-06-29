import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import './checkout.css'

export default class Payment extends Component {
    constructor() {
        super();

        this.state = {
            redirect: false,
            price: 0
        }
        this.payEvent = this.payEvent.bind(this)
        this.onToken = this.onToken.bind(this)
    }

    componentDidMount() {
        this.payEvent();
    }

    payEvent(price) {
        const body = {
            price: price
        }

        axios.get(`/api/reservation/${this.props.reservationId}`, body)
            .then(res => {
                this.setState({ price: (res.data[0].event_price) })
            })
    }


    onToken(token) {

        token.card = void 0;
        axios.post('/api/payment', { token, amount: this.state.price })
            .then(res => {
                this.setState({
                    redirect: true
                })
                alert('Thanks for your purchase!')
            });
    }

    render() {

        console.log(this.state)

        if (this.state.redirect)
            return <Redirect to='/reservations' />

        return (
            <div className='checkout-body'>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={'pk_test_zWSnuTWXQ2tVrModzkzKP99P'}
                    amount={this.state.price * 100}>
                </StripeCheckout>
            </div>
        )
    }
}
