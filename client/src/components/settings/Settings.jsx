import React, { useState } from "react"

import Avatar from "../common/Avatar"
import DataDisplay from "../common/DataDisplay"
import Spinner from "../common/Spinner"
import EditProfile from "../profile/EditProfile"
import NewModal from "../common/NewModal"
import PageTitle from "../common/PageTitle"

const Settings = ({ data }) => {
    const [openModal, setOpenModal] = useState(false)

    const toggleModalState = e => {
        setOpenModal(!openModal)
    }

    return (
        <div className="">
            {!data ? <Spinner /> :
                <React.Fragment>

                    {openModal && (
                        <NewModal toggleModalState={toggleModalState} render={state => <EditProfile user={data} modal={{...state, toggleModalState}} />} />
                    )}
                    {/* <PageTitle title='settings' /> */}

                    <div className="grid align-center justify-center bg-swatch-4 pd-5 br-2">
                        <div className="flx flx-col align-center">
                            <div className="icon-display flx align-center justify-center mb-3">
                                <i className="lnr lnr-cog red-txt txt-xlg"></i>
                            </div>
                            
                            <h1 className="fw-300 txt-md-lg swatch-7 txt-center">Account Settings</h1>
                        </div>
                    </div>
                    
                    <div className="mt-4 bg-swatch-8 pd-5 br-2">
                        <div className="flx align-center justify-between mb-4">
                            <h1 className="txt-capitalize">personal settings</h1>
                            <button className="btn btn-swatch7-outline" onClick={toggleModalState}>Edit Profile</button>
                        </div>

                        <div className="flx align-center flx-wrap">
                            <Avatar src={data.avatar} />

                            <div className="ml-5">
                                <div className="mb-3">
                                    <DataDisplay label='first name' value={data.firstName} icon='user' />
                                </div>
                                
                                <div className="mb-3">
                                    <DataDisplay label='last name' value={data.lastName} icon='user' />
                                </div>
                            </div>
                            
                            <div className="ml-5">
                                <div className="mb-3">
                                    <DataDisplay label='email' value={data.email} icon='envelope' />
                                </div>
                                
                                <div className="mb-3">
                                    <DataDisplay label='phone' value={'-'} icon='phone-handset' />
                                </div>
                            </div>
                            
                            <div className="ml-5">
                                <div className="mb-3">
                                    <DataDisplay label='username' value={data.username} icon='user' />
                                </div>
                                
                                <div className="mb-3">
                                    <DataDisplay label='website' value={data.website} icon='link' />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default Settings