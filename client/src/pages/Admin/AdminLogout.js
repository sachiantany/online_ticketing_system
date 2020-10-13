import React, {Component} from 'react';
import PropType from "prop-types";
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    NavItem,
    NavLink
} from "reactstrap";
import {connect} from "react-redux";
import {logout} from "../../actions/authActions";
import Logout from "../../components/auth/Logout";
import Redirect from "react-router-dom/es/Redirect";

class AdminLogout extends Component {

    state = {
        modal: false,
        msg: null
    };

    static propType = {
        logout: PropType.func.isRequired
    };

    toggle = () => {
        this.setState({
            modal: !this.state.model
        });
    };

    onCloseModal = () => {
        this.setState({
            modal: false
        });


    };

    onLogout = (e) => {
        e.preventDefault();

        this.props.logout();
        this.onCloseModal();
        return <Redirect to='/' />
    }

    render() {

        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Logout
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.onCloseModal}>
                    <ModalHeader toggle={this.onCloseModal}>Logout</ModalHeader>
                    <ModalBody>

                                <Label for='email'>Confirm</Label>

                                <Button onClick={this.onLogout} color='dark' style={{marginTop: '2rem'}} block>
                                    Logout
                                </Button>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(
    null,
    { logout }
)(AdminLogout);