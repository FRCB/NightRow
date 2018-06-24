import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Homepage extends Component {

    render() {
        return (
            <div className='homepage'>

                <h2 className='promise'>
                    FIND AND RESERVE
                    <br />
                    <div className='verticalFlip'>
                        <span>A LIVE CONCERT</span>
                        <span>A ROOFTOP PARTY</span>
                        <span>A HAPPY-HOUR</span>
                        <span>MUCH MORE...</span>
                    </div>
                    <br />
                    RIGHT NOW.
                </h2>


                <main className='cat-flex'>

                    <Link
                        to='/category/outdoor'
                        className='cat-box cat-1 pulse'>
                        <p>OUTDOOR</p>
                    </Link>
                    <Link to='/category/afterwork'
                        className='cat-box cat-2 pulse'>
                        <p>AFTERWORK</p>
                    </Link>
                    <Link to='/category/clubbing'
                        className='cat-box cat-3 pulse'>
                        <p>CLUBBING</p>
                    </Link>
                    <Link to='/category/live'
                        className='cat-box cat-4 pulse'>
                        <p>LIVE</p>
                    </Link>
                </main>

            </div>
        )
    }
}
