import React from "react"

import PageTitle from "../common/PageTitle"
import DashCard from "../common/DashCard"
import Chart from "../charts/Chart"

const Dashboard = ({ data }) => {
    return (
        <div className="dashboard">
            <PageTitle title='dashboard' />

            <div className="dashboard__grid">
                <DashCard>
                    <div className="flx flx-col align-center mb-3">
                        <div className="bd-round flx flx-col align-center justify-center">
                            <h1 className="fw-300 txt-lg-md swatch-7">{data.postCount}</h1>
                            <p className="fw-300 txt-md-sm txt-uppercase">posts</p>
                        </div>
                    </div>

                    <div className="flx align-center justify-between">
                        <div className="pin bg-swatch-5 pd-1 br-1">
                            <h1 className="fw-300 txt-lg swatch-7">{data.publishedCount}</h1>
                            <p className="fw-300 txt-md-sm txt-uppercase">published</p>
                        </div>

                        <div className="pin bg-swatch-5 pd-1 br-1">
                            <h1 className="fw-300 txt-lg red-txt">{data.draftCount}</h1>
                            <p className="fw-300 txt-md-sm txt-uppercase">drafts</p>
                        </div>                        
                    </div>
                </DashCard>

                <div className="flx flx-col">
                    <DashCard margin='mb-2'>
                        <h1 className="fw-300 txt-lg-md swatch-7">{data.subscriberCount}</h1>
                        <p className="fw-300 txt-md-sm txt-uppercase">subscribers</p>
                    </DashCard>

                    <DashCard>
                        <h1 className="fw-300 txt-lg-md swatch-7">{data.totalReads}</h1>
                        <p className="fw-300 txt-md-sm txt-uppercase">total reads</p>
                    </DashCard>
                </div>

                {/* <div className="col-span-3"> */}
                    <DashCard margin='col-span-2 row-span-2 bg-swatch-8'>
                        <Chart data={data.postData}/>
                    </DashCard>
                {/* </div> */}
            </div>

        </div>
    )
}

export default Dashboard