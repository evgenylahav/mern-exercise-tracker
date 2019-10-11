import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Exercise = props => {
    return <tr>
        <td>{ props.exercise.username }</td>
        <td>{ props.exercise.description }</td>
        <td>{ props.exercise.duration }</td>
        <td>{ props.exercise.date.substring(0,10) }</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> I <a href="" onClick={() => props.deleteExercise(props.exercise._id)}>delete</a>
        </td>
    </tr>
}


export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [],
        }

    }

    componentDidMount = () => {
        const url = "http://localhost:5000/exercises";
        axios.get(url)
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    exercises: response.data,
                })
            }
        })
        .catch(err => console.log(err));
    }

    deleteExercise = id => {
        const url = "http://localhost:5000/exercises/" + id;
        axios.delete(url)
        .then(res => console.log(res));
        
        this.setState({
            exercises: this.state.exercises.filter(item => item._id === id)
        });
    }

    exerciseList = () => {
        return this.state.exercises.map(item => {
            return <Exercise 
                        exercise={item} 
                        deleteExercise={this.deleteExercise}
                        key={item._id} />;
        });
    }

    render(){
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}