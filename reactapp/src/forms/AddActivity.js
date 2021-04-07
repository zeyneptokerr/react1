import React, { Component } from 'react'
import posed from 'react-pose';
import ActivityConsumer from "../context";
//import axios from 'axios';

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

class AddActivity extends Component {
    state = {
        visible: false,
        hood: "",
        content: "",
        date: "",
        status: ""
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
    addActivity = async (dispatch, e) => {
        e.preventDefault();
        const { hood, content, date, status } = this.state;

        // const newActivity = {
        //     hood,
        //     content,
        //     date,
        //     status
        // }

        fetch('http://localhost:8080/api/add', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "baslik": hood,
                "icerik": content,
                "tarih": date,
                "durum": status,
            }),
          });

        //const response = await axios.post("http://localhost:8080/api/add", newActivity)
        //dispatch({ type: "ADD_ACTIVITY", payload: response.data });

        this.props.history.push("/home");
    }
    render() {
        const { visible, hood, content, date, status } = this.state;
        return (
            <ActivityConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                                <Animation pose={visible ? "visible" : "hidden"}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Add Action Form</h4>
                                        </div>
                                            <form 
                                            onSubmit={this.addActivity.bind(this, dispatch)}
                                            >
                                                <div className="form-check">
                                                    <input 
                                                    name="status"
                                                    id="status"
                                                    value={status}
                                                    onChange={this.changeInput}
                                                    className="form-check-input"
                                                    type="checkbox" ></input>
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Aktif
                                                    </label>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Başlık</label>
                                                    <input 
                                                    type="text" 
                                                    name="hood" 
                                                    id="hood" 
                                                    
                                                    placeholder="hood" 
                                                    className="form-control" 
                                                    value={hood} 
                                                    onChange={this.changeInput}></input>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Tarih</label>
                                                    <input 
                                                    type="text" 
                                                    name="date" 
                                                    id="date" 
                                                    placeholder="Enter date" 
                                                    className="form-control" 
                                                    value={date} onChange={this.changeInput}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlTextarea1">İçerik</label>
                                                    <textarea 
                                                    type="text" 
                                                    name="content" 
                                                    id="content" 
                                                    placeholder="Enter content" 
                                                    className="form-control" 
                                                    value={content} 
                                                    onChange={this.changeInput} 
                                                    rows="10"></textarea>
                                                </div>
                                                <button className="btn btn-danger btn-block" type="submit">Add</button>
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
export default AddActivity;