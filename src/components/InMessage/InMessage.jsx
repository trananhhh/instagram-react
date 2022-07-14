import React from 'react'

const InMessage = ({ content }) => {
    return (
        <div className="message-container in-message">
            <p className="message">
                {content}
            </p>
            <i className='bx bx-dots-horizontal-rounded'></i>
        </div>
    )
}

export default InMessage;