import React from 'react';

class EntryList extends React.Component {
    render() {
        return (
            <div>
                {this.props.entrants.map((entry) =>
                    <div key={entry.email} >
                        <div className="row">
                            <div className="col-xs-4">
                                <p>{entry.name}</p>
                                <p>{entry.date}</p>
                            </div>
                            <div className="col-xs-4">
                                <p>{entry.sex}</p>
                                <p>{entry.weight}  - {entry.length}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><i>{entry.comment}</i></p>
                            </div>
                        </div>
                        <hr/>
                    </div>
                )}
            </div>
        );
    }
}

export default EntryList;