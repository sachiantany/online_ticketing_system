import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModel extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        role: 'user',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps,prevState,s) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            //checking register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg});
            }else {
                this.setState({msg: null});
            }
        }

        //if auth then close model
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    onCloseModal = () => {
        this.setState({
            modal: false
        });
    };

    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.model
        });
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value });
    };

    onSubmit = e =>{
        e.preventDefault();

        const { name, email, password, role } = this.state;

        //create user
        const newUser = {
            name,
            email,
            password,
            role
        };

        //Attempt to register
        this.props.register(newUser);

        //close toggle
         //this.toggle();
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.onCloseModal}>
                    <ModalHeader toggle={this.onCloseModal}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    className='mb-3'
                                    placeholder='Name'
                                    onChange={this.onChange}
                                    />

                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='mb-3'
                                    placeholder='Email'
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className='mb-3'
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{marginTop: '2rem'}} block>
                                    Register
                                </Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    {register, clearErrors}
)(RegisterModel);