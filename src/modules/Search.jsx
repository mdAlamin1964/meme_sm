export default function search_main({hanlde_search}) {
    return (
        <>
            <div className="search search-module">
                <input onChange={hanlde_search()} placeholder="Type to find" type="text" />
                <button className="secondery-btn">Search</button>
            </div>
        </>
    )
}