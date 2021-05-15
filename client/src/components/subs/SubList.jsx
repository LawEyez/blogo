import React from 'react'
import { Link } from 'react-router-dom'
import SubView from './SubView'

export default function SubList({ subs, title }) {
    return (
        <React.Fragment>
            <h1 className="title red-txt fw-700">
                <span className="">+ </span>
                <span className="swatch-1 fw-700">{title}</span>
                <span className=""> +</span>
            </h1>

            <div className="grid grid-col-5 gap-3">
                {subs.map(sub => (
                    <Link key={sub._id} to={`/channels/${sub.channel._id}`}>
                        <SubView channel={sub.channel} />
                    </Link>
                ))}
            </div>
        </React.Fragment>
    )
}
