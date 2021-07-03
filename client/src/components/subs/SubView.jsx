import React from 'react'

export default function SubView({ channel }) {
    return (
        <div className='pd-3 flx flx-col align-center bg-swatch-4 br-3'>
            { channel.avatar ? (
                <img className="round-img mb-2" src={channel.avatar} alt="" />
            ) : (
                <div className="icon-view mb-2">
                    <i className="lnr lnr-user"></i>
                </div>
            )}
            <h1 className='txt-capitalize swatch-1'>{channel.firstName} {channel.lastName}</h1>
            <h2 className="fw-300">Writer</h2>
        </div>
    )
}
