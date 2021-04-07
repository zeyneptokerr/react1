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

class Login extends Component {
    state = {
        //id:"",
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

    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);// doğru kullanımı bu şekilde
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const response = await axios.get("http://localhost:8080/apii/users")
        this.setState({
            users: response.data
        })
    }

    loginUser = async (e) => {
        e.preventDefault();

        const response = await axios.get(`http://localhost:8080/apii/users/`);
       
       debugger;
        response.data.forEach(element => {
            
            if(element.mail===this.state.mail&&element.sifre===this.state.sifre){
                this.props.history.push("/home");
                //window.location("http://localhost:3000/home");
            }
            else{
                console.log("Yanlış mail veya şifre girdiniz.")
            }
        });

    }

    render() {
        const { visible, mail, sifre } = this.state;
        return (
            <ActivityConsumer>
                {
                    value => {
                        //const { dispatch } = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form For Login"}</button>
                                <Animation pose={visible ? "visible" : "hidden"}>
                                    <form method="POST"
                                        onSubmit={this.loginUser}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input
                                                type="email"
                                                id="mail"
                                                aria-describedby="emailHelp"
                                                placeholder="Enter email"
                                                name="mail"
                                                className="form-control"
                                                value={mail}
                                                onChange={this.changeInput}></input>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input
                                                type="password"
                                                id="sifre"
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
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </form>
                                </Animation>
                            </div>
                        )
                    }
                }
            </ActivityConsumer>
        )
    }

}
export default Login;
