import React, { Component } from 'react'
import axios from 'axios';

const ActivityContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {

        case "DELETE_ACTIVITY":
            return {
                ...state,
                activities: state.activities.filter(activity => action.payload !== activity.id)
            }
        case "ADD_ACTIVITY":
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }
        case "UPDATE_ACTIVITY":
            return {
                ...state,
                activities: state.activities.map(activity => activity.id === action.payload.id ? action.payload : activity)
            }

        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        default:
            return state;
    }
}

export class ActivityProvider extends Component {

        state = {
        activities: [],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
        
    }  

    componentDidMount = async () => {
        const response = await axios.get("http://localhost:8080/api/activities")
        this.setState({
            activities: response.data
        })
    }  

    render() {
        return (
            <ActivityContext.Provider value={this.state}>
                {this.props.children}
            </ActivityContext.Provider>
        )
    }
}
const ActivityConsumer = ActivityContext.Consumer;

export default ActivityConsumer;