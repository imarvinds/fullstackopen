import React from 'react';

const Filter = (props) =>{
    return(
        <div>
            &nbsp; find countries <input onChange={props.handleChange} />
        </div>
    )
}

export default Filter