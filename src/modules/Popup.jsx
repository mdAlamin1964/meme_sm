export default function pop_up({main_pop_handle, data, log_reg_pop, additional_class, search_result}) {
    return (
    <>
        <div className={`pop-in-middle-screen ${additional_class}`} >
            <div className="pop-up-input-module mt-4 pop-data-box">
                <div className="new-post-title">
                    <p className="icon-link">
                        {!log_reg_pop && 
                        <span onClick={main_pop_handle()}  class="material-symbols-outlined pointer">close</span>
                        }
                    </p>
                </div>
                {data}
                
                <div className="serach-result">
                    <ul>
                        {search_result}
                    </ul>
                </div>


                <div className="main-me">
                        <a href="https://www.fiverr.com/alamin1964" target='_blank'>Concept & build by MD. Alamin</a>
                </div>
            </div>
        </div>
    </>
    )
}