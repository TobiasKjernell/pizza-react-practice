import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handeSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        navigate(`/order/${searchQuery}`);
        setSearchQuery('');
    }
    
    return (
        <form onSubmit={handeSubmit}>
            <input placeholder="Search order #" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </form>
    )
}

export default SearchOrder;