import Banner from "../common/Banner"
import PageTitle from "../common/PageTitle"

const SearchResult = ({ keyword }) => {
    
    return (
        <div className="">
            {/* <PageTitle title='search' /> */}
            <Banner icon='magnifier' text={`you searched for '${keyword}'`} />
            
        </div>
    )
}

export default SearchResult