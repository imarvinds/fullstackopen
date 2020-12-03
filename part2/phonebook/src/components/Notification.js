import React from 'react'

const Notification = ({ message, error }) => {

    if (message === null) {
        return null
    } else {
        if (error) {
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
}

export default Notification