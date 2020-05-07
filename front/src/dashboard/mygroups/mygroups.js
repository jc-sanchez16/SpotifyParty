import React from 'react';
import './mygroups.css';
import {Accordion, Card, ToggleButtonGroup, ToggleButton, Form, Button} from 'react-bootstrap';

class MyGroups extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user: null,
            loggedIn: false,
            getgroups: false,
            groups: null,
        }
    }

    componentDidUpdate(){
        if(this.props.user !== this.state.user && this.props.user !== null) // when user changes
        {
            this.setState({user: this.props.user, loggedIn: true, getgroups: true});
            
        }

        if(this.state.loggedIn = true && this.state.getgroups === true)
        {
            this.getAllgroups();
        }
    }

    getAllgroups() {
        fetch("/getallgroups")
        .then(res => res.json()
        .then(res => {
            console.log("Res is: ", res);
            this.setState({groups: res, getgroups: false})
            
        }));
    }

    handleSelectedPlaylist = (val) => {
        this.props.getplaylist(val);
    }

    render() {

        return (
            <div className="fullsize">
                { this.state.user !== null ?
                    <div className="fullsize">
                        
                        <Accordion>
                            <Accordion.Toggle as={Card.Header} eventKey={1}>
                                Add new group
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1}>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                        <Form.Control type="text" placeholder="Enter name" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>

                        { this.state.groups !== null ?
                            <Accordion defaultActiveKey="0">
                                {   this.state.groups.map((group, index) =>
                                    {
                                        return (
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey={index}>
                                                {group.groupname}
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={index}>
                                                <Card.Body>
                                                    <h4>Members</h4>
                                                    <ul>
                                                        {group.members.map((member, i) => {
                                                            return(<li>{member}</li>)
                                                            })
                                                        }
                                                    </ul>
                                                    <h4>Playlists</h4>

                                                    <ToggleButtonGroup type="radio" name="playlists" vertical onChange={this.handleSelectedPlaylist}>
                                                        {group.playlists.map((playlist, i) => {
                                                            return(
            
                                                                <ToggleButton value={this.state.groups[index].playlists[i]}>{playlist[0]}</ToggleButton>
                                                                
                                                            )
                                                        })
                                                        }
                                                    </ToggleButtonGroup>
                                              </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        
                                        )
                                    })
                                }
                            </Accordion> 
                        :
                            <div>
                                
                            </div>
                        }
                            
                    </div>
                    :
                    <h4>Not logged in</h4>
                }
                    
                
            </div>
        );
    }
}
export default MyGroups;