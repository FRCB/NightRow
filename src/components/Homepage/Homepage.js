import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'

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


                <main className='cat-flex hover'>

                    <Link
                        to='/category/outdoor'
                        className='cat-box cat-1'>
                        OUTDOOR
                    </Link>
                    <Link to='/category/afterwork'
                        className='cat-box cat-2'>
                        AFTERWORK
                    </Link>
                    <Link to='/category/clubbing'
                        className='cat-box cat-3'>
                        CLUBBING
                    </Link>
                    <Link to='/category/live'
                        className='cat-box cat-4'>
                        LIVE
                    </Link>
                </main>

            </div>
        )
    }
}
