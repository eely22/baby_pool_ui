import React from 'react';

class EntryList extends React.Component {
    render() {
        return (
            <div>
                {this.props.entrants.map((entry) =>
                    <div key={entry.email} >
                        <p>{entry.name}</p>
                        <p>{entry.date}</p>
                        <p>{entry.sex}</p>
                        <p>{entry.weight}  - {entry.length}</p>
                        <p><i>{entry.comment}</i></p>

                        <hr/>
                    </div>
                )}
            </div>
        );
    }
}

export default EntryList;