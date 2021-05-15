import React from 'react'

export default function SubView({ channel }) {
    return (
        <div className='pd-3 flx flx-col align-center bg-swatch-4'>
            <img className="round-img mb-2" src="/img/avatar.jpg" alt="" />
            <h1 className='txt-capitalize swatch-1'>{channel.firstName} {channel.lastName}</h1>
            <h2 className="fw-300">Writer</h2>
        </div>
    )
}
