export default function home_overlay({data}) {
    
    function data_suffle(arr) {
        var new_arr = []
        var random_index = Math.floor(Math.random() * 12)
        for( let i = 0; i < arr.length; i++) {
            var c_index = random_index + i
            if (c_index < arr.length) {
                new_arr.push(data[c_index])
            }
            else {
                new_arr.push(data[c_index - 12])
            }
            
        }
        

        return new_arr
    }


    return (
        <>
            <div className="container-fluid home-overlay">
                <div className="row">
                    <div className="col-4 p-0 overlayo-sac-1">
                        {data_suffle(data)}
                    </div>
                    <div className="col-4 p-1 overlayo-sac-2">
                        {data}
                    </div>
                    <div className="col-4 p-0 overlayo-sac-3">
                        {data_suffle(data)}
                    </div>
                </div>
                
            </div>
        </>
    )
}