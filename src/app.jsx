import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './bars/Footer';
import Header from './bars/Header';
import Home from './pages/Home';
import Login_module from './modules/Login';
import Left_sidebar from './bars/left-sidebar';
import Mobile_header from './bars/Header-mobile';
import { nanoid } from 'nanoid';
import New_post from './modules/New-post';
import Profile from './pages/Profile';
import Right_sidebar from './bars/right-sidebar';
import Register_module from './modules/Register';
import User_head from './modules/User-head';
import User_box from './modules/User-box';
import User_post from './modules/User-post';
import './styles/main.css'
import data from './data'



function app() {

  // Backend////
  const backendURL = "http://localhost:5000"


  // User All data fetch
  const [loading, setLoading] = React.useState(false)
  const [userData, setUserData] = React.useState("")
  React.useEffect(()=> {
    const datafetch = async ()=>  {
      const data = await (
        await fetch(backendURL + '/userData')
      ).json()
      setUserData(data)
      setLoading(true)
    }
    datafetch()
  }, [])

console.log(userData)


// Home page data fetch

const [loadingHome, setLoadingHome] = React.useState(false)
const [homeData, setHomeData] = React.useState('')
React.useEffect(()=> {
  const datafetch = async ()=> {
    const data = await (
      await fetch(`${backendURL}/homeData`)
    ).json()
    setHomeData(data)
    setLoadingHome(true)
  }
  datafetch()
},[])


var home_posts = undefined
if(loadingHome){
  var home_data_shorted = homeData.sort((a,b)=> b.id-a.id)
  home_posts = home_data_shorted.map(n=> {
    return (
      <User_post 
        key={nanoid()}
        comment_url = {`${backendURL}/post-comment`}
        post_data = {n}
        post_image_url = {`${backendURL}/${n.user_name}/${n.id}/${n.post_image}`}
        user_image_url = {`${backendURL}/${n.user_name}/${n.user_image}`}
      />
    )
  })
}










var user_all_post = undefined

// User all post
if (loading) { 
  user_all_post = userData.userAllPosts.map(n=> {
    var postImage = `${backendURL}/${n.user_name}/${n.id}/${n.file_name}`
    return (
      <li key={nanoid()}>
        <img src={postImage} alt="" />
        <a href="#"><button className="secondery-btn mt-1">see post</button></a>
    </li>
    )
  })
}






  // Window innerWidth
  const[currentWidth, setCurrentWidth] = React.useState(window.innerWidth)
  
  React.useEffect(()=> {
    window.addEventListener('resize', ()=> {
      setCurrentWidth(window.innerWidth)
    })
  },[])
  const mobileWidth = 768;

  

  // Header user friends
  var header_heads =undefined
  if (loading) {
    header_heads = userData.userAllFriends.slice(0,5).map(n => {
      return (
        <li key={nanoid()}> 
          <User_head 
            user_name = {n.fullName}
            user_image = {`${backendURL}/${n.userName}/${n.userImageUrl}`}
          />   
        </li>
      )
    })
    }



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
            <Home 
              posts = {home_posts}
            
            />
            <Profile 
             newPost = {<New_post/>}
             userData = {userData}
             userImage = {backendURL+"/"+userData.userName+"/"+userData.userImageUrl}
             user_all_post = {user_all_post}
            />
          </div>
          <div className="col-md-3 order-3 order-md-3 right-sidebar-col sidebar py-4">
            <Right_sidebar 
              current_user = {current_user}
              suggested_friends = {suggested_friends}
            />
            <div className="login-register mt-4 px-2 py-2">
               <Login_module />
               <Register_module />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default app