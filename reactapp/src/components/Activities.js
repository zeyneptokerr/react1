import React, { Component } from 'react'
import Activity from "./Activity";
import ActivityConsumer from "../context";

class Activities extends Component {
    render() {
        return (
            <ActivityConsumer>
                {
                    value => {
                        debugger;
                        const { activities } = value;
                        console.log(activities);
                        return (
                            <div>
                                {   
                                    activities.map(activity => {
                                        return (
                                            <Activity
                                                key={activity.id}
                                                id={activity.id}
                                                hood={activity.hood}
                                                content={activity.content}
                                                date={activity.date}
                                                status={activity.status}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                }
            </ActivityConsumer>
        )
    }
}
export default Activities;