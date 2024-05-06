import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './bars/Footer';
import Header from './bars/Header';
import Home from './pages/Home';
import Left_sidebar from './bars/left-sidebar';
import Mobile_header from './bars/Header-mobile';
import Right_sidebar from './bars/right-sidebar';
import './styles/main.css'
function app() {
  return (
    <>
      {/* Main Body */}
      <div className="container-fluid m-0 px-0">
        <div className="row m-0">
          <div className="col-md-2 order-2 left-sidebar-col order-md-1 sidebar py-4">
                <Left_sidebar />
          </div>
          <div className="col-md-7 order-1 order-md-2 middle-sidebar sidebar p-0">
            {/* <Mobile_header /> */}
            <Header />
            <Home />
          </div>
          <div className="col-md-3 order-3 order-md-3 right-sidebar sidebar py-4">
            <Right_sidebar />
          </div>
        </div>
      </div>
    </>
  )
}

export default app