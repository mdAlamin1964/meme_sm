export default function mobile_header({main_logo, main_search}) {
    return (
        <>
            <div className="mobile-header py-2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <div className="logo">
                                <img src={main_logo} alt="" />
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