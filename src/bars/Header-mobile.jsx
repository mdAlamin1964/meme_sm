export default function mobile_header({main_logo}) {
    return (
        <>
            <div className="mobile-header py-2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-5">
                            <div className="logo">
                                <img src={main_logo} alt="" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="search">
                                <input placeholder="Search" type="text" />
                            </div>
                        </div>
                        <div className="col-1">
                            <p className="icon-link">
                                <span class="material-symbols-outlined">favorite</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}