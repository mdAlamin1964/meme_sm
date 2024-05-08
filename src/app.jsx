import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import data from './data';
import Footer from './bars/Footer';
import Header from './bars/Header';
import Home from './pages/Home';
import Left_sidebar from './bars/left-sidebar';
import Mobile_header from './bars/Header-mobile';
import { nanoid } from 'nanoid';
import Right_sidebar from './bars/right-sidebar';
import User_head from './modules/User-head';
import User_box from './modules/User-box';
import './styles/main.css'


function app() {
  // Window innerWidth
  const[currentWidth, setCurrentWidth] = React.useState(window.innerWidth)
  
  React.useEffect(()=> {
    window.addEventListener('resize', ()=> {
      setCurrentWidth(window.innerWidth)
    })
  },[])
  const mobileWidth = 768;

  

  // Header user friends
  const header_heads = data.slice(0,5).map(n => {
    return (
      <li key={nanoid()}> 
        <User_head 
          user_name = {n.name}
          user_image = {"https://i.pinimg.com/236x/52/26/a3/5226a34b76bb1da8fbddaf9f145a004b.jpg"}
        />   
      </li>
    )
  })




  // Current user info
  const current_user_info = {
    id: "md__almin",
    name: "MD AL amin",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75Q9EvClA_AXpsxkvrXrLRQS6iLAI-Y_MV9FKjZDSEw&s"

  }

  const current_user = (
      <User_box 
        user_id = {current_user_info.id}
        user_name = {current_user_info.name}
        user_image = {current_user_info.image}
      />
    )

    // Suggested friends
    const suggested_friends = data.slice(0,3).map(n => {

      return (
        <User_box 
        user_id = {n.age}
        user_name = {n.name}
        user_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75Q9EvClA_AXpsxkvrXrLRQS6iLAI-Y_MV9FKjZDSEw&s"
      />
      )
    })




  return (
    <>
      {/* Main Body */}
      <div className="container-fluid m-0 px-0">
        <div className="row m-0">
          <div className="col-md-2 order-2 left-sidebar-col order-md-1 sidebar">
                <Left_sidebar />
          </div>
          <div className="col-md-7 order-1 order-md-2 middle-sidebar sidebar p-0">
            {currentWidth >= mobileWidth?
              ""
              : 
              <Mobile_header />}
            <Header 
              user_friends = {header_heads}
            /> 
            <Home />
          </div>
          <div className="col-md-3 order-3 order-md-3 right-sidebar sidebar py-4">
            <Right_sidebar 
              current_user = {current_user}

              suggested_friends = {suggested_friends}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default app