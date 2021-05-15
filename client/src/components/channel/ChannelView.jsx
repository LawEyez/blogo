import Rating from "../common/Rating"
import Social from "../common/Social"
import UserPosts from "../posts/PostGrid"
import SubActionsContainer from "../subs/SubActionsContainer"

const ChannelView = ({ channel, posts, hasSub }) => {
    return (
        <div className="flx flx-col">
            <div className="pd-3 mb-5 bg-swatch-4 flx align-center justify-evenly">
                <div className="flx align-center">
                    <img src="/img/avatar.jpg" alt="" className="round-img mr-3" />

                    <div className="flx flx-col">
                        <h1 className="txt-capitalize mb-1">{channel.user.firstName} {channel.user.lastName}</h1>
                        <Rating />
                        <br />
                        <Social />
                    </div>
                </div>

                <div className="flx flx-col align-center">
                    <h1 className="fw-600 txt-xlg swatch-7">{channel.subCount}</h1>
                    <p className="txt-uppercase swatch-2">subscriber{channel.subCount !== 1 && 's'}</p>
                </div>
                
                <div className="flx flx-col align-center">
                    <h1 className="fw-600 txt-xlg swatch-7">{channel.postCount}</h1>
                    <p className="txt-uppercase swatch-2">post{channel.postCount !== 1 && 's'}</p>
                </div>

                <SubActionsContainer channel={channel.user._id} />
            </div>

            <div className="">
                <h1 className='mb-3'>Posts</h1>

                <UserPosts posts={posts} />
            </div>
        </div>
    )
}

export default ChannelView