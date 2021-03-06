import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import './style.sass';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PersonIcon from '@material-ui/icons/Person';
import { push } from 'connected-react-router';

import { loadUserProfile } from '../../store/actions/profile_actions.js';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.menuWindow = React.createRef();
    }
    static propTypes = {
        chatId: PropTypes.string
    }
    
    state = {
        showMenu: false,
        showProfile: false,
        chtLoaded: false
    }


    handleClick = () => {
             document.addEventListener('click', this.hiddenMenu);
             this.setState ({
            showMenu: !this.state.showMenu
        });
        
    }
    
    showProfile = () => {
        this.setState ({
            showProfile: true
        });
   
    }
   
    hiddenProfile = () => {
        this.setState ({
            showProfile: false
        });

    }

    hiddenMenu = () => {  
        document.removeEventListener('click', this.hiddenMenu);
             this.setState ({
                showMenu: false
            });   
    }

    handleNavigate = (link) => {
        this.props.push(link);
    };

    componentDidMount() {
        this.props.loadUserProfile()
        this.setState({
            chtLoaded: true
        })
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hiddenMenu);
    }

    render() {
        let modalPosition = {right: this.state.showProfile == false ? '0' : event.offsetX + 100};
        let menu =  <div className = "header_menu" style = {{right: this.state.showMenu == false ? '0' : event.offsetX + 40}}>

                        <p>Settings</p>
                    </div>;
        
        let profile = <div className = "header_menu" >                  
                          <p>User Name: { this.props.userName }</p>
                          <p>User Email: {this.props.userEmail}</p>
                      </div>;

        return(
            <div className="header w-100">
                <h1 className="header_title w-100"> Chat Room {this.props.chatId ? (!this.props.isLoading && this.state.chtLoaded  && this.props.chats[this.props.chatId].title) : '---' } </h1>
                <div className = 'header_menu__wrapper'>    
                    <button  onClick = { () => this.handleNavigate('/profile/') } onMouseEnter = { this.showProfile } onMouseLeave = { this.hiddenProfile } className= "header_menu__btn" style = {modalPosition}><PersonIcon /></button>
                    <button onClick = { this.handleClick } className= "header_menu__btn"><MoreVertIcon /></button>
                    <TransitionGroup>
                        {this.state.showMenu && <CSSTransition classNames = "option" timeout = {1000}>{menu}</CSSTransition>}
                        {this.state.showProfile && <CSSTransition classNames = "option" timeout = {1000}>{profile}</CSSTransition>}
                    </TransitionGroup>
                </div>
            </div>
        ) 
    }
}

const mapStateToProps = ({ prfReducer, chtReducer }) => ({
    userName: prfReducer.userName,
    userEmail: prfReducer.userEmail,
    chats: chtReducer.chats,
    isLoading: chtReducer.isLoading
});

const mapDispathToProps = dispatch => bindActionCreators({ push, loadUserProfile }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(Header);
