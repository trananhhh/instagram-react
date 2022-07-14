import React from 'react'

const OutMessage = ({ content }) => {
    return (
        <div className="message-container out-message">
            <i className='bx bx-dots-horizontal-rounded'></i>
            <p className="message">
                {content}
            </p>
        </div>
    )
}

export default OutMessage;