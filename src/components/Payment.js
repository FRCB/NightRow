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
            user: {},
            title: '',
            price: 0
        }
        this.payEvent = this.payEvent.bind(this)
    }

    componentDidMount() {
        this.payEvent();
        axios.get(`/auth/user`).then((res) => this.setState({ user: res.data }))
    }

    payEvent(title, price) {
        const body = {
            title: title,
            price: price
        }
        axios.get(`/api/reservation/${this.props.match.params.id}`, body)
            .then((res) => this.setState({
                title: res.data[0].event_title,
                price: res.data[0].event_price,
            }))
    }



    // onPurchaseConfirmation() {
    //     axios.put('/api/update_paid/' + this.props.location.query.userId)
    // }

    onToken(token) {
        token.card = void 0;
        axios.post('http://localhost:3666/api/payment', { token, amount: this.state.price }).then(res => {
            this.onPurchaseConfirmation();
            this.setState({
                redirect: true
            })
            alert('Thanks for your purchase')
        });
    }

    render() {

        if (this.state.redirect)
            return <Redirect to='/reservations' />

        return (
            <div className='checkout-body'>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={'pk_test_zWSnuTWXQ2tVrModzkzKP99P'}
                    amount={this.state.price}
                /> */}

            </div>
        )
    }
}
