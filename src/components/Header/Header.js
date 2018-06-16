import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css'

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        }
    }

    toggleEdit() {
        this.setState({ toggle: !this.state.toggle })
    }


    render() {
        let { user_name } = this.props.user;

        return (
            <div >
                <header>
                    <Link to='/' id='logo'>
                        <h1>Night Row</h1>
                    </Link>

                    <menu>
                        <button
                            className='button-menu'
                            onClick={() => this.toggleEdit()}>
                            MENU
                        </button>
                        {this.state.toggle
                            ?
                            <div className='smooth'>
                                <ul>
                                    <li>
                                        <button>
                                            Search
                                        </button>
                                    </li>

                                    <Link to='/reservations' >
                                        <li>
                                            <button>
                                                Reservations
                                            </button>
                                        </li>
                                    </Link>

                                    <li>
                                        {user_name ? (
                                            <a href="http://localhost:3666/auth/logout">
                                                <button>
                                                    Logout
                                                </button>
                                            </a>
                                        ) : (
                                                <a href={process.env.REACT_APP_LOGIN}>
                                                    <button>
                                                        Login
                                                    </button>
                                                </a>
                                            )}
                                    </li>
                                </ul>
                            </div>
                            :
                            <div></div>
                        }

                    </menu>

                    <div className='leftie' >
                        <input
                            className='header-box search'
                            type='text'
                            placeholder='Search' />
                        <Link to='/reservations' >
                            <button className='header-box'>
                                Reservations
                            </button>
                        </Link>

                        <div>
                            {user_name ? (
                                <a href="http://localhost:3666/auth/logout">
                                    <button className='header-box'>
                                        Logout
                            </button>
                                </a>
                            ) : (
                                    <a href={process.env.REACT_APP_LOGIN}>
                                        <button className='header-box' >
                                            Login
                                        </button>
                                    </a>
                                )}
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Homepage);


