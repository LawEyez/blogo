import Banner from "../common/Banner"
import PageTitle from "../common/PageTitle"
import PostGrid from '../posts/PostGrid'

const BookmarkList = ({ bookmarks }) => {
    let posts

    if (bookmarks.length > 0) {
        posts = bookmarks.map(bk => bk.post)
    }

    console.log('bk list posts: ', bookmarks)

    return (
        <div className="">
            <PageTitle title='bookmarks' />

            {bookmarks.length > 0 ? (
                <PostGrid posts={posts} />
            ) : (
                <Banner icon='bookmark' text='You have no bookmarks yet.' />
            )}

        </div>
    )
}

export default BookmarkList