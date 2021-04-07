import React, { Component } from 'react'
import ActivityConsumer from "../context";
import axios from 'axios';

class UpdateActivity extends Component {
    state = {
        hood: "",
        content: "",
        date: "",
        status: ""
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;

        const response = await axios.get(`http://localhost:8080/activities/${id}`);

        const { hood, content, date, status } = response.data;

        this.setState({
            hood,
            content,
            date,
            status
        });
        this.props.history.push("/home");
    }


    updateActivity = async (dispatch, e) => {
        e.preventDefault();

        //update Activity
        const { hood, content, date, status } = this.state;
        const { id } = this.props.match.params;
        const updatedActivity = {
            hood,
            content,
            date,
            status
        }

        const response = await axios.put(`http://localhost:8080/activities/${id}`,updatedActivity)

        dispatch({type:"UPDATE_ACTIVITY", payload:response.data})

        //redirect
        this.props.history.push("/home");
    }

    render() {
        const { hood, content, date, status } = this.state;
        return (
            <ActivityConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Update Action Form</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.updateActivity.bind(this, dispatch)}>
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
                                            <div className="form-group">
                                                <label htmlFor="hood">Başlık</label>
                                                <input
                                                    type="text"
                                                    name="hood"
                                                    id="id"
                                                    placeholder="Enter hood"
                                                    className="form-control"
                                                    value={hood}
                                                    onChange={this.changeInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="content">İçerik</label>
                                                <input
                                                    type="text"
                                                    name="content"
                                                    id="content"
                                                    placeholder="Enter content"
                                                    className="form-control"
                                                    value={content}
                                                    onChange={this.changeInput}
                                                />
                                            </div><div className="form-group">
                                                <label htmlFor="date">Tarih</label>
                                                <input
                                                    type="text"
                                                    name="date"
                                                    id="date"
                                                    placeholder="Enter date"
                                                    className="form-control"
                                                    value={date}
                                                    onChange={this.changeInput}
                                                />
                                            </div>
                                            <button className="btn btn-danger btn-block" type="submit">Edit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </ActivityConsumer>
        )
    }
}
export default UpdateActivity;