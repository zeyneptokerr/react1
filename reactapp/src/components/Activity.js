import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import ActivityConsumer from "../context";
import axios from "axios";
import { Link } from 'react-router-dom';

class Activity extends Component {

    static defaultProps = {
        id:"Bilgi Yok",
        hood: "Bilgi Yok",
        content: "Bilgi Yok",
        date: "Bİlgi Yol",
        status: "Bilgi Yok"
    }
    onDeleteActivite = async (dispatch, e) => {
        const { id } = this.props;
        await axios.delete(`http://localhost:8080/api/activities/${id}`);
        dispatch({ type: "DELETE_ACTIVITY", payload: id });
    }

    render() {
        const { id, hood, content, date, status } = this.props;
        return (
            <ActivityConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div>
                                <div className="col-md-8 mb-4">
                                    <Table responsive >
                                        <tbody
                                        >
                                            <tr>
                                                <th>Id</th>
                                                <th>Başlık</th>
                                                <th>İçerik</th>
                                                <th>Tarih</th>
                                                <th>Durum</th>
                                                <th>Aksiyon</th>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>
                                                    <p className="d-inline">{hood}</p>
                                                </td>
                                                <td>
                                                    <p className="card-text">{content}</p>
                                                </td>
                                                <td>
                                                    <p className="card-text">{date}</p>
                                                </td>
                                                <td>
                                                    <p className="card-text">{status}</p>
                                                </td>
                                                <td><Link to={`edit/${id}`} className="btn btn-dark">Edit</Link></td>
                                                <td><i onClick={this.onDeleteActivite.bind(this, dispatch)} className="far fa-trash-alt" style={{ cursor: "pointer" }}></i></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        )
                    }
                }
            </ActivityConsumer>
        )
    }
}
Activity.propTypes = {
    hood: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired
}
export default Activity;