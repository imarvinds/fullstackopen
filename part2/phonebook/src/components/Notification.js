import React from 'react'

const Notification = ({ message, ifError }) => {
    if (message === null) {
        return null
    } else if(message.includes('already')) {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else {
        return (
            <div className="noti">
                {message}
            </div>
        )
    }
}

export default Notification