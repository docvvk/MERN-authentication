import React, { Component } from "react";
import Userbadge from "../components/UserBadge";
import ProjectCard from "../components/ProjectCard";

class DashBoard extends Component {
    state = {
        user: {
            firstName: "Neha",
            lastName: "Pathak",
            projects: ["123", "456", "789"],
            score: 455
        },
        projects: [
            {
                name: "Project 1",
                rating: 4.5
            },
            {
                name: "Project 2",
                rating: 4
            },
            {
                name: "Project 3",
                rating: 5
            }
        ]
    }
    render() {
        return (
            <div className="row jumbotron jumbotron-fluid">
                <div className="col-md-8">
                    <div className="row projects">
                        {this.state.projects.map(project => (
                            <ProjectCard
                                name={project.name}
                                id={project.id}
                                key={project.id}
                                rating={project.rating}
                            />)
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <Userbadge user={this.state.user} />
                </div>
            </div>
        )
    }
}

export default DashBoard;