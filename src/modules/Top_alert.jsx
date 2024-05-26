export default function top_alert({data}) {
    return (
        <>
            <div className={`top-alert`} >
                <div className="top-alert-module">
                    <div className="alert-text">
                        {data}
                    </div>
                </div>
            </div>
        </>
    )
}