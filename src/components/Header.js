import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
        }
    }

    toggle() {
        this.setState({
            toggle: !this.state.toggle
        })
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
                            onClick={() => this.toggle()}>
                            <div className='menu-wrapper'>
                                {this.state.toggle ?
                                    <div className='hamburger-menu active'></div>
                                    :
                                    <div className='hamburger-menu'></div>}
                            </div>
                        </button>

                        {this.state.toggle
                            ?
                            <div className='smooth'>
                                <ul className='menu-list'>
                                    <li>
                                        <Link
                                            to='/reservations'
                                            onClick={() => this.toggle()} >
                                            Reservations
                                        </Link>
                                    </li>

                                    <li>
                                        {user_name ? (
                                            <a href="http://localhost:3666/auth/logout">
                                                Logout
                                            </a>
                                        ) : (
                                                <a href={process.env.REACT_APP_LOGIN}>
                                                    Login
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
                </header >
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Homepage);


