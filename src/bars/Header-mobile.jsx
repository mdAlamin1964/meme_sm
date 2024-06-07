export default function mobile_header({main_logo, main_search, backendURL}) {
    return (
        <>
            <div className="mobile-header py-2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <div className="logo">
                                <a href={backendURL}>
                                    <img src={main_logo} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-8">
                           {main_search}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}