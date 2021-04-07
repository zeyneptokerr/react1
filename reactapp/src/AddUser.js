import React, { Component } from 'react'
import posed from 'react-pose';
import ActivityConsumer from "./context";
import axios from 'axios';


const Animation = posed.div({
    visible: {
        opencity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opencity: 0,
        applyAtEnd: {
            display: "none"
        }
    }
});

class AddUser extends Component {

    state = {
        id: "",
        adsoyad: "",
        tel: "",
        mail: "",
        sifre: ""
    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const response = await axios.post("http://localhost:8080/apii/add")
        this.setState({
            users: response.data
        })
    }
    addUser = async (dispatch, e) => {
        e.preventDefault();
        const { id, adsoyad, tel, mail, sifre } = this.state;

        const newUser = {
            id,
            adsoyad,
            tel,
            mail,
            sifre
        }

        const response = await axios.post("http://localhost:8080/apii/add", newUser)

        dispatch({ type: "ADD_USER", payload: response.data });
        this.props.history.push("/home");
    }

    render() {
        const { visible, adsoyad, tel, mail, sifre } = this.state;
        return (
            <ActivityConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (

                            <div className="col-md-8 mb-4">
                                <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form For Register"}</button>
                                <Animation pose={visible ? "visible" : "hidden"}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Add User Form</h4>
                                        </div>
                                        <form
                                            onSubmit={this.addUser.bind(this, dispatch)}
                                        >
                                            <div className="form-group">
                                                <label>Ad Soyad</label>
                                                <input
                                                    type="text"
                                                    //id="id"
                                                    placeholder="Enter Ad Soyad"
                                                    name="adsoyad"
                                                    className="form-control"
                                                    value={adsoyad}
                                                    onChange={this.changeInput}
                                                ></input>
                                            </div>
                                            <div className="form-group">
                                                <label>Tel</label>
                                                <input
                                                    type="number"
                                                    //id="id"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter tel"
                                                    name="tel"
                                                    className="form-control"
                                                    value={tel}
                                                    onChange={this.changeInput}
                                                ></input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input
                                                    type="mail"
                                                    //id="id"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter email"
                                                    name="mail"
                                                    className="form-control"
                                                    value={mail}
                                                    onChange={this.changeInput}
                                                ></input>
                                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input
                                                    type="password"
                                                    //id="sifre"
                                                    placeholder="Password"
                                                    name="sifre"
                                                    className="form-control"
                                                    value={sifre}
                                                    onChange={this.changeInput}
                                                ></input>
                                            </div>
                                            <div className="form-check">
                                                <input 
                                                type="checkbox" 
                                                className="form-check-input" 
                                                //id="exampleCheck1"
                                                ></input>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </form>
                                    </div>
                                </Animation>
                            </div>
                        )
                    }
                }
            </ActivityConsumer>
        )
    }
}
export default AddUser;
