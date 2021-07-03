import { useParams } from "react-router"
import SearchResult from "./SearchResult"

const SearchResultContainer = () => {
    const {keyword} = useParams()
    
    return <SearchResult keyword={keyword} />
}

export default SearchResultContainer