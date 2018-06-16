import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'

export default class Homepage extends Component {

    render() {
        return (
            <div>

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
                    <Link to='/category/outdoor'>
                        <button className='cat-box cat-1'>
                            OUTDOOR
                    </button>
                    </Link>
                    <Link to='/category/afterwork'>
                        <button className='cat-box cat-2'>
                            AFTERWORK
                    </button>
                    </Link>
                    <Link to='/category/clubbing'>
                        <button className='cat-box cat-3'>
                            CLUBBING
                    </button>
                    </Link>
                    <Link to='/category/live'>
                        <button className='cat-box cat-4'>
                            LIVE
                    </button>
                    </Link>
                </main>

            </div>
        )
    }
}
