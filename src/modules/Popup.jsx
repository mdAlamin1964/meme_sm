export default function pop_up({main_pop_handle, data, log_reg_pop, additional_class}) {
    return <>
        <div className={`pop-in-middle-screen ${additional_class}`} >
            <div className="pop-up-input-module mt-4">
                <div className="new-post-title my-2">
                    <p className="icon-link">
                        {!log_reg_pop && 
                        <span onClick={main_pop_handle()}  class="material-symbols-outlined pointer">close</span>
                        }
                    </p>
                </div>
                {data}
            </div>
        </div>
    </>
}