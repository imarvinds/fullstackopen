import React from 'react';

const PersonForm = (props) =>{
    return(
        <form onSubmit={props.saveName}>
            <div>
                Name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
                Number: <input value={props.newNum} onChange={props.handleNumChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm