import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../common/PageTitle'
import SubView from './SubView'

export default function SubList({ subs, title }) {
    return (
        <React.Fragment>
            <PageTitle title={title} />

            {subs.length > 0 ? (
                <div className="grid grid-col-5 gap-3">
                    {subs.map(sub => (
                        <Link key={sub._id} to={`/channels/${sub.channel._id}`}>
                            <SubView channel={sub.channel} />
                        </Link>
                    ))}
                </div>

            ) : (
                <div className="grid align-center justify-center bg-swatch-4 pd-5">
                    <div className="flx flx-col align-center">
                        <div className="icon-display flx align-center justify-center mb-3">
                            <i className="lnr lnr-pushpin red-txt txt-xlg"></i>
                        </div>
                        
                        <h1 className="fw-300  swatch-7 txt-center">You have no subscriptions yet.</h1>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
