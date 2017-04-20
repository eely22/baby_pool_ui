import React, { Component } from 'react';
import './App.css';
import 'flexboxgrid';
import EntryList from './components/EntryList'
import AppFetch from './fetch/AppFetch'
import BabyPoolFetch from './fetch/BabyPoolFetch'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import RefreshIndicator from 'material-ui/RefreshIndicator';

let DateTimeFormat;
DateTimeFormat = global.Intl.DateTimeFormat;

class App extends Component {
    constructor(props) {
        super(props);

        this.state={
            email: "",
            name: "",
            pounds: "",
            ounces: "",
            length: "",
            date: {},
            sex: "",
            comment: "",
            open: false,
            errorOpen: false,
            loading: false,
            alreadySaved: false,
            entrants: []
        }
    }

    render() {
        var isSaveDisabled = !this.saveButtonEnabled();
        var waitingHeight = 60;
        var waitingTop = (window.innerHeight/2)-(waitingHeight)+50;
        var waitingLeft = (window.innerWidth/2)-(waitingHeight)+20;
        var status = this.state.loading ? 'loading' : 'hide';

        var buttonMessage = this.state.alreadySaved ? 'Update' : 'Submit';

        return (
            <div className="App">
                <div className="App-header">
                    <img src={process.env.PUBLIC_URL+'/baby.png'} height="80px" width="80px" alt="" />
                </div>
                <h3>Ely Baby Pool</h3>
                <div className="row">
                    <div className="col-xs-offset-3 col-xs-6">
                        <div className="row">
                            <div className="col-xs-6">
                                <TextField
                                    floatingLabelText="name"
                                    fullWidth={true}
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.textFieldChanged}
                                />
                            </div>
                            <div className="col-xs-6">
                                <TextField
                                    floatingLabelText="email"
                                    fullWidth={true}
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.textFieldChanged}
                                    disabled={this.state.alreadySaved}
                                />
                            </div>
                        </div>

                        <br/>
                        <DatePicker
                            hintText="date"
                            fullWidth={true}
                            value={this.state.date}
                            onChange={this.dateChanged}
                            formatDate={new DateTimeFormat('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }).format}
                        /><br/>

                        <div className="row">
                            <div className="col-xs-6">
                                <TextField
                                    floatingLabelText="pounds"
                                    fullWidth={true}
                                    name="pounds"
                                    value={this.state.pounds}
                                    onChange={this.textFieldNumberChanged}/>
                            </div>
                            <div className="col-xs-6">
                                <TextField
                                    floatingLabelText="ounces"
                                    fullWidth={true}
                                    name="ounces"
                                    value={this.state.ounces}
                                    onChange={this.textFieldNumberChanged}/>
                            </div>
                        </div>

                        <TextField
                            floatingLabelText="length (inches)"
                            fullWidth={true}
                            name="length"
                            value={this.state.length}
                            onChange={this.textFieldNumberChanged}
                        /><br/>

                        <TextField
                            floatingLabelText="comment"
                            multiLine={true}
                            rows={3}
                            fullWidth={true}
                            name="comment"
                            value={this.state.comment}
                            onChange={this.textFieldChanged}
                        /><br/>
                        <RadioButtonGroup
                            onChange={this.radioButtonChanged}
                            name="sex"
                            defaultSelected="Boy"
                            valueSelected={this.state.sex}
                            style={{maxWidth: 100, margin: 'auto'}}>
                                <RadioButton
                                    value="Girl"
                                    label="Girl"
                                />
                                <RadioButton
                                    value="Boy"
                                    label="Boy"
                                />
                        </RadioButtonGroup>
                        <br/><br/>

                        <RaisedButton
                            onClick={this.submit}
                            disabled={isSaveDisabled}
                            label={buttonMessage}
                            primary={true}/>

                        <br/><br/>
                        <h3>Other Guesses</h3>
                        <hr/>

                        <EntryList
                            entrants={this.state.entrants}
                        />

                        <Snackbar
                            open={this.state.open}
                            message="Entry Saved!"
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />

                        <Snackbar
                            open={this.state.errorOpen}
                            message="Entry Failed to Save!"
                            autoHideDuration={4000}
                            onRequestClose={this.handleErrorRequestClose}
                        />

                        <RefreshIndicator
                            size={waitingHeight}
                            left={waitingLeft}
                            top={waitingTop}
                            status={status}
                            style={{margin: "auto"}}
                        />

                    </div>
                </div>
            </div>
        );
    }

    textFieldChanged = (object, value) => {
        var newState = {...this.state};

        newState[object.target.name] = value;
        this.setState(newState);
    };

    textFieldNumberChanged = (object, value) => {
        if (isNaN(value)) {return;}

        var newState = {...this.state};

        newState[object.target.name] = value;
        this.setState(newState);
    };

    dateChanged = (object, value) => {
        this.setState({
            date: value
        });
    }

    radioButtonChanged = (object, value) => {
        this.setState({
            sex: value
        })
    }

    saveButtonEnabled = () => {
        return this.state.email !== "" &&
            this.state.name !== "" &&
            this.state.pounds !== "" &&
            this.state.ounces !== "" &&
            this.state.length !== "" &&
            this.state.date !== "" &&
            this.state.sex !== "";
    }


    submit = () => {
        var data = {
            "email": this.state.email,
            "name": this.state.name,
            "weight": this.state.pounds + "lb " + this.state.ounces + "oz",
            "comment": this.state.comment,
            "length": this.state.length + " inches",
            "date": this.state.date.toLocaleDateString(),
            "sex": this.state.sex
        }

        this.setState({loading: true});

        BabyPoolFetch.postEntrant(data).then(json => {
            this.setState({
                open: true
            });
            AppFetch.saveEmail(this.state.email);
            this.fetchEntries();
        }).catch((error) => {
            console.log("Error saving: " + error);
            this.setState({
                errorOpen: true,
                loading: false
            });
        });
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    }

    handleErrorRequestClose = () => {
        this.setState({
            errorOpen: false
        });
    }

    componentWillMount = (nextState) => {
        this.setState({
            loading: true
        });
        this.fetchEntries();
        var email = AppFetch.getEmail();
        if (email) {
            this.fetchEntry(email);
        }
    }

    fetchEntries = () => {
        BabyPoolFetch.getEntrants().then(json => {
            this.setState({
                entrants: json,
                loading: false

            });
        }).catch((error) => {
            //TODO: Better error handling
            console.log("Error fetching baby entries: " + error);
        });
    }

    fetchEntry = (email) => {
        BabyPoolFetch.getEntrant(email).then(json => {
            this.setState({
                email: json.email,
                name: json.name,
                pounds: json.weight.split(' ')[0].split('lb')[0],
                ounces: json.weight.split(' ')[1].split('oz')[0],
                length: json.length.split(' ')[0],
                date: new Date(Date.parse(json.date)),
                sex: json.sex,
                comment: json.comment,
                loading: false,
                alreadySaved: true

            });
        }).catch((error) => {
            //TODO: Better error handling
            console.log("Error fetching baby entries: " + error);
        });
    }
}

export default App;
