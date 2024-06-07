import React from 'react';
import Header from './bars/Header';
import Home from './pages/Home';
import Home_overlay from './pages/Home_overlay';
import Login_module from './modules/Login';
import Left_sidebar from './bars/left-sidebar';
import main_logo from './assets/Logo.png'
import Mobile_header from './bars/Header-mobile';
import { nanoid } from 'nanoid';
import New_post from './modules/New-post';
import Profile from './pages/Profile';
import Pop_up from './modules/Popup';
import Pop_up_profile from './modules/pop-up-profile';
import Public_profile from './pages/Public-profile';
import Right_sidebar from './bars/right-sidebar';
import Register_module from './modules/Register';
import Search_main from './modules/Search';
import Top_alert from './modules/Top_alert';
import User_head from './modules/User-head';
import User_box from './modules/User-box';
import User_info_update from './modules/User-info-update';
import User_post from './modules/User-post';

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'




function app() {
  // ALL CONSTS ///

  //Backend  live site 
  const backendURL = "https://mdalmaincoder1.pythonanywhere.com"
  const mobileWidth = 768;

  // Window url check
  const current_window_url = window.location.href;



////React ALL state
// Site main pop up data
const [main_pop, set_main_pop] = React.useState()

// Site main pop handle
const [main_pop_show, set_main_pop_show] = React.useState(false)

// Window innerWidth
const[currentWidth, setCurrentWidth] = React.useState(window.innerWidth)
React.useEffect(()=> {
  window.addEventListener('resize', ()=> {
    setCurrentWidth(window.innerWidth)
  })
},[])


// seting reald
const [reload, set_reload] = React.useState(false)
const handle_reload = ()=> set_reload(!reload)


// Current page name
const [current_page, set_current_page] = React.useState(current_window_url.split('/')[3])

// Setting other page
const [other_page, set_other_page] = React.useState()

// Log Reg_pop up
const [log_reg_pop, set_log_reg_pop] = React.useState(false)

// Setting user all post
const [all_posts_user, set_all_posts_user] = React.useState(undefined)

// Top alert
const [top_alert_data, set_top_alert_data] = React.useState("")
const [show_top_alert, set_show_top_alert] = React.useState(false)

// Comment text state
const [comment_text, set_comment_text] = React.useState('')

// Live comment upload
const[conut, set_count] = React.useState(0)



// Result show 

const [get_result, set_get_result] = React.useState()

const [show_result, set_show_result] = React.useState('')


///END REACT STATES////////////////////////////////////////









// User All data fetch/////////////////////////
  const [loading_user, setLoadingUser] = React.useState(false)
  const [userData, setUserData] = React.useState("")
  React.useEffect(()=> {
    const datafetch = async ()=>  {
      try {
      const data = await (
        await fetch(backendURL + '/userData')
      ).json()
      setUserData(data)
      setLoadingUser(true)
      } catch (err) {
        login_func()
        main_pop_handle()
        console.log(err)
      }
    }
    datafetch()
  }, [conut])



// Home page data fetch
const [loadingHome, setLoadingHome] = React.useState(false)
const [homeData, setHomeData] = React.useState('')
React.useEffect(()=> {
  const datafetch = async ()=> {
    try{
    const data = await (
      await fetch(`${backendURL}/homeData`)
    ).json()
    setHomeData(data)
    setLoadingHome(true)
    } catch(err) {
      console.log('error', err)
    }
  }
  datafetch()
},[reload])

///END data fetch/////////////////////////






///// ALL FUNCTIONS //////////////////////////////
// handles like dislike button on all single posts home and profile
function handle_like_post(event, item) {
  event.preventDefault()
  var element = event.target
  var element_classes = []
  element.classList.forEach(n=> element_classes.push(n))

  if (element_classes.includes('liked-icon')){
    element.classList.remove('liked-icon')
  } 
  else {
    element.classList.add('liked-icon')
  }

  // sending data request without reloading
  fetch(`${backendURL}/like/${item.id}`)
  .then(response => response.json())
  .then(data=> {
  })
  .catch(error => console.error('Erorr', error));
  handle_reload()
}





// Setting main popup handle show or hide
var main_pop_handle = ()=> {
  set_main_pop_show(!main_pop_show)
}




// User profile pop up show 
function handle_frind_profile_show(user, module_name) {
  var profile = undefined
  if (user.friend_profile) {
    profile = user.friend_profile
  } 
  else if(user.profile) {
      profile = user.profile
  } 
  else if (user)(
      profile = user
  )


  function handle_parameter() {
    handle_friend_profile(user)
  }

  set_main_pop(
    <Pop_up_profile
      proile_image_url  = {`${backendURL}/profile/${profile.userName}/${profile.userImageUrl}`} 
      profile_fullName  = {profile.fullName}
      profile_bDay      = {profile.joinDate}
      profile_join_date = {profile.joinDate}
      proile_btn_text   = "Remove Friend"
      proile_btn_url    = {`${backendURL}/remove-friend/${profile.userName}`}
      handle_friend_profile = {()=> handle_parameter}
      module_name = {module_name}
    />
  )
  main_pop_handle()
  handle_reload()
}


// error top massage
function handle_err_top() {
  if (!loading_user) {
    var check = current_window_url.split('/')
    if (check[3] == '_massage') {
      set_top_alert_data(check[4].replace(/_/g, ' '))
      set_show_top_alert(true)
    }

  }
}


// Top up manage
React.useEffect(()=> {
  handle_err_top()
}, [])

React.useEffect(()=> {
  const timer = setTimeout(()=> {
        history.replaceState({ foo: "bar" }, null,  backendURL)
        set_show_top_alert(false)
  }, 7000)
  return ()=> clearTimeout(timer)
}, [show_top_alert])


// Handle login or register
function registery_func() {
  set_log_reg_pop(true)
  set_main_pop(
    <Register_module 
      handle_register = {()=> login_func}
      registerUrl = {`${backendURL}/register`}
      file_check = {()=> check_file_size} 
    />)
}

// Login funtion
function login_func() {
  set_log_reg_pop(true)
  set_main_pop(
    <Login_module 
      handle_register = {()=> registery_func}
      loginUrl = {`${backendURL}/login`}
    />)

}


// Logout function
function log_user_out() {
  set_current_page('Home')
  window.location.href = `${backendURL}/logout`
}



//User info update handle
const user_update_pop_handle = ()=> {
  set_main_pop(
  <User_info_update  
    info_update_url={`${backendURL}/update-userData`}
    file_check = {()=> check_file_size} 
  />)
  main_pop_handle()
}

// show full comment
function handle_all_cumment(e) {
  e.preventDefault()
  var all_comment_box = e.target.previousElementSibling
  if(all_comment_box.className != 'full_comments') {
    all_comment_box.classList.add('full_comments')

  } 
  else {
    all_comment_box.classList.remove('full_comments')
  }

}






// posting commments
function post_all_comments(post_data) {
  var post_all_comments = post_data.all_comments? post_data.all_comments : post_data

  post_all_comments = post_all_comments.map( m => {
    return (
      <li>
          <div className="comment_by">
            <p className="user">@{m.cmt_by}__</p>
          </div>
          <div className="comment">
            <p>{m.comment}</p>
            <p className="comt-time">
              {m.comment_time}
            </p>
          </div>
      </li>
    )
  })
  return post_all_comments
}





var store_comment = ""
// handle comment text input
function comment_text_handle(event) {
  event.preventDefault()
  set_comment_text(event.target.value)
  event.target.id = 'comment_field_id'
  store_comment = event.target.value
  handle_reload()
}




// Handle comment
function comment_submit_btn(comment_by,post_id) {
  set_count(prev => prev +1)
    // add commnet to database 
    fetch(`${backendURL}/comment/${comment_by}/${post_id}/${store_comment? store_comment : comment_text}`)
    .then(res => res.json())
    .then(data=> {

    })
    .catch(err=> console.log(err))

    store_comment = ''
    var element_input = document.getElementById('comment_field_id')
    if(element_input) {
      element_input.value = ''
    }

    element_input.id = ""
    set_comment_text("")
    handle_reload()

    // Live comments set
    setTimeout(()=> {
      set_count(prev => prev +1)
    }, 700 )

}





// User all post
function handle_current_user_all_post (data) {
  var data_shorted = data.sort((a,b)=> b.id - a.id)
  var user_all_post = data_shorted.map((n)=> {  
  var post_data = n;
  // already liked
  var is_liked = post_data.liked_by_users? post_data.liked_by_users.split(',').includes(userData.userName) : ""
  var all_post_comments = post_all_comments(n)
  var comment_submit_btn_action = ()=> {
    comment_submit_btn(userData.userName,post_data.id)
  }
  var post_liked = ()=>  {
    handle_like_post(event, post_data)
  }



  // Delete post pop
  function hanlde_delete() {
      var popup_delete_btn = <>
      <p class="title-1">Delete Post</p>
      <a href={`${backendURL}/delete-post/${post_data.id}`}>
        <button className="secondery-btn delete-btn mt-1">Confrim Delete!</button>
      </a>
    </>
    set_main_pop(popup_delete_btn)
    main_pop_handle()
  }
  

    return (
      <User_post 
        post_data = {post_data}
        post_image_url = {`${backendURL}/post/${post_data.user_name}/${post_data.id}/${post_data.file_name}`}
        user_image_url = {`${backendURL}/profile/${post_data.user_name}/${post_data.user_image}`}

        handle_user_btn = {()=> {}} 
        handle_like_btn = {()=> post_liked}
        liked_style = {is_liked? 'liked-icon' : ""}
        user_like = {""}
        hide_comment_sac = {""}
        handle_all_cumment = {()=> handle_all_cumment}
        post_all_comments = {all_post_comments}
        comment_text_handle = {()=>comment_text_handle}
        comment_submit_btn = {()=>comment_submit_btn_action}
        // own profile
        confrim_delete = {()=> hanlde_delete}
      />

    )
  })

  set_all_posts_user(user_all_post)
  handle_reload()
  return user_all_post;
}





// Showing search data
function show_serach_result(data) {
  set_show_result(data)
  set_current_page('Show_result')
  set_show_result(
    <div className="show_result_page">
      {handle_current_user_all_post([data,])}
    </div>
  )

  set_get_result("")
  set_main_pop_show(false)
  
}



// hanlde search
function hanlde_search(e) {
  const value = e.target.value
  fetch(`${backendURL}/query/${value}`)
  .then(res=> res.json())
  .then(data=> {
    const all_result = data.map(n=> {
      return (
          <li className='pointer' onClick={()=> show_serach_result(n)}>
              <div className="image-des">
                  <img src={`${backendURL}/post/${n.user_name}/${n.id}/${n.file_name}`} alt="" />
                  
                  <div className="detail">
                    <h5>{n.user_name}</h5>
                    <p className="des gray-out-text">
                      {n.description.slice(0,20)}
                    </p>
                  </div>
              </div>
          </li>
      )
    })
    set_get_result(all_result)
  })
  .catch(err=> console.log(err))
  set_main_pop_show(true)
}





// check input file-size
function check_file_size(e){
  e.preventDefault()
  var imagefile = e.target.files[0]

  // image width quality
  const WIDTH = 500
  var reader = new FileReader
  reader.readAsDataURL(imagefile)
  reader.onload = (event) => {
    var imageURL = event.target.result
    var image = document.createElement("img")
    image.src = imageURL
    image.onload = (ev) => {
      var canvas = document.createElement('canvas')
      var ratio = WIDTH / ev.target.width
      canvas.width = WIDTH
      canvas.height = ev.target.height * ratio
      const context = canvas.getContext("2d")
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      
      var new_image_url = context.canvas.toDataURL("image/jpeg, image/png", 70)
      // change the input file to compressed one
      fetch(new_image_url)
      .then(res=> res.blob())
      .then(blob => {
        // change the input file to compressed one
        const myfiledata =  [blob]
        const myfileNamme = imagefile.name
        const myfile = new File(myfiledata, myfileNamme)
        const dataTrans = new DataTransfer()
        dataTrans.items.add(myfile)
        const fileList = dataTrans.files
        e.target.files = fileList
      })
    }    
  }







 
  
  
}



///END FUNCTIONS/////////////////////////////////////////





// Header user friends
var header_heads =undefined
if (loading_user) {
  header_heads = userData.userAllFriends.slice(0,5).map(n => {
    function see_user() {
      handle_frind_profile_show(n)
    }

    return (
      <li key={nanoid()}> 
        <User_head 
          user_name = {n.friend_profile.fullName.slice(0, 15)}
          user_image = {`${backendURL}/profile/${n.friend_profile.userName}/${n.friend_profile.userImageUrl}`}
          handle_image = {()=> see_user}
        />   
      </li>
    )
  })
}







// Home post Setting up
var home_posts = undefined
if(loadingHome){
  // chekcing is it new user or user has friends or posts
  
  var user_have_post_or_friends = ((userData.userAllPosts == false) && (userData.userAllFriends == false))

  var home_data_shorted = (userData && !user_have_post_or_friends)? 
              homeData.sort((a,b)=> b.post.id-a.post.id) 
              :
              homeData;

  // var home_data_shorted = homeData[0].post? homeData.sort((a,b)=> b.post.id-a.post.id) : homeData

  home_posts = !home_data_shorted? "" 
  : home_data_shorted.map(n=> {
    var handle_profile = ()=>{}
    var post_liked = ()=> {}
    var comment_submit_btn_action = ()=> {}
    var is_liked = ""
    var post_data = undefined
    var all_post_comments = undefined


    if(userData && !user_have_post_or_friends) {
      // profile show
      handle_profile = ()=> {
        if (n.profile.userName == userData.userName) {
          set_current_page('Profile')
          handle_current_user_all_post(userData.userAllPosts)
          handle_reload()
          // Scroll opton set
          document.querySelector('body').scrollIntoView(true);
        } 
        else {
          handle_frind_profile_show(n)
        }
      }

      // already liked
      if (homeData[0].post) {
        is_liked = n.post.liked_by_users.split(',').includes(userData.userName)
      } 
      else {
        is_liked = n.liked_by_users.split(',').includes(userData.userName)
      }


      // Calling the fucntin to pass event and Item
      post_liked = ()=>  {
        handle_like_post(event, n.post)
      }

      post_data = n.post
      all_post_comments = post_all_comments(n.post)

      // sending post commntes
      comment_submit_btn_action = ()=> {
        comment_submit_btn(userData.userName,n.post.id)
      }

    } 
    else {
      post_data = n
    }

    return (
      <User_post 
        post_data = {post_data}
        post_image_url = {`${backendURL}/post/${post_data.user_name}/${post_data.id}/${post_data.file_name}`}
        user_image_url = {`${backendURL}/profile/${post_data.user_name}/${post_data.user_image}`}

        handle_user_btn = {()=> handle_profile} 
        handle_like_btn = {()=> post_liked}
        liked_style = {is_liked? 'liked-icon' : ""}
        user_like = {""}
        hide_comment_sac = {(userData && !user_have_post_or_friends)? '': "hide"}
        handle_all_cumment = {()=> handle_all_cumment}
        post_all_comments = {all_post_comments}
        comment_text_handle = {()=>comment_text_handle}
        comment_submit_btn = {comment_text? ()=> comment_submit_btn_action : ()=>{}}
        
        confrim_delete = {()=> {}}
      />
    )
  })
}





// User all friends posts show in profile
var all_frieds_posts = undefined
function handle_user_all_post(data) {
  all_frieds_posts = handle_current_user_all_post (data)
}




  
// Current user info
var current_user = undefined
if (loading_user) {
  current_user = (
    <User_box 
      user_id = {userData.userName}
      user_name = {userData.fullName}
      user_image = {`${backendURL}/profile/${userData.userName}/${userData.userImageUrl}`}
      btn = ''
      handle_btn = {()=>{}}
      handle_image = {()=> {}}
    />
  )
}





// Suggested friends
var suggested_friends = undefined
if(loading_user) {
  suggested_friends = userData.suggested_friends.map(n=> {
    const data = <>
                  <p class="title-1">Add {n.fullName}</p>
                  <a href={`${backendURL}/add-friend/${n.userName}`}>
                    <button className="secondery-btn mt-1">Confrim add!</button>
                  </a>
                </>

    function add_new_fiend() {
      set_main_pop(data)
      main_pop_handle()
    }

    function see_user() {
      handle_frind_profile_show(n, 'suggested_friends')
    }

    return (
      <li className='suggested-all-friends'>
        <User_box 
          user_id = {n.userName}
          user_name = {n.fullName}
          user_image = {`${backendURL}/profile/${n.userName}/${n.userImageUrl}`}
          btn="add"
          handle_btn = {()=> add_new_fiend }
          handle_image = {()=> see_user}
        />
      </li>
    )
  })
}





// Menu btn//////
const handle_click = (event) => {
  event.preventDefault();
  const element = event.target;
  const all_menu = document.querySelectorAll('.left-sidebar-menu ul li a')
  all_menu.forEach(n=> n.classList.remove('active'))
  element.classList.add('active')

  const page = element.childNodes[0].childNodes[1].innerHTML


  // profile_funtion
  if (page == 'Profile') {
    handle_current_user_all_post(userData.userAllPosts)
  }

  if (page == 'Search') {
    set_main_pop(
      <Search_main 
        hanlde_search = {()=> hanlde_search}
      />
    )
    main_pop_handle()
  } else {
    set_current_page(page)
    // history.pushState(null, '/', page);
  }

  handle_reload()
  // Scroll opton set
  document.querySelector('body').scrollIntoView(true);
}

  


// show friend main profile
function handle_friend_profile (friend) {
  var profile = friend.friend_profile? friend.friend_profile : friend.profile
  
  var friend_posts = userData.userAllFriends.filter(n => n.friend_profile.userName== profile.userName)

  handle_user_all_post(friend_posts[0].user_friend_post)

  if (friend) {
    var page_body = 
            <>
              <Public_profile 
                userData = {profile}
                userImage = {backendURL+"/profile/"+profile.userName+"/"+profile.userImageUrl}
                user_all_post = {all_frieds_posts}
              />
            </>
  
    set_current_page('other-page')
    set_other_page(page_body)
    set_main_pop_show(false)
    handle_reload()
  }
}




// User all Friends 
var all_friends = undefined
if (loading_user) {
  all_friends = userData.userAllFriends.map(n=> {
  
    // friends profile pop data
    function handle_parameter() {
      handle_frind_profile_show(n)
    }

    return (
       <li className='user-all-friends'>
        <User_box 
          user_id = {n.friend_profile.userName}
          user_name = {n.friend_profile.fullName.slice(0,12)}
          user_image = {`${backendURL}/profile/${n.friend_profile.userName}/${n.friend_profile.userImageUrl}`}
          btn="See"
          handle_btn = {()=> handle_parameter}
          handle_image = {()=> handle_parameter}
        />
      </li>
    )
  })
}





// Setting page body
var page_body = undefined
var left_side = 
<Left_sidebar 
  menu_function = {()=> handle_click}
  main_logo = {main_logo}
  backendURL = {backendURL}

/>


var right_side = undefined
function setting_page_body () {
  // Profile page
  if(current_page == 'Profile') {

    // setting user data
    if(userData) {
      React.useEffect(()=> {
        handle_current_user_all_post(userData.userAllPosts)
      },[conut])
    }
    
    page_body = 
        <>
          <Profile 
            newPost = {<New_post 
                        upload_url = {`${backendURL}/upload`} 
                        file_check = {()=> check_file_size}
                        />}
            userData = {userData}
            userImage = {backendURL+"/profile/"+userData.userName+"/"+userData.userImageUrl}
            user_all_post = {all_posts_user}
            show_pop_handle = {()=> user_update_pop_handle}
            log_user_out = {()=> log_user_out}
          />
        </>
      
      right_side = 
        <Right_sidebar 
          suggested_friends = {all_friends}
          heading = "Friends"
        />
  } 

  // Notificatin page
  else if (current_page == 'Notifications') {
    page_body = 'notifications'
  } 

  // Show_result
  else if( current_page == 'Show_result') {
    page_body = show_result
  }


 // default Home page
   else {
    page_body = 
        <>
          <Header 
            user_friends = {header_heads}
          />
          <Home 
            posts = {home_posts}
          />
        </>


    right_side =
      <Right_sidebar 
        current_user = {current_user}
        suggested_friends = {suggested_friends}
        heading = "Suggested to you"
      />
  }

  if (other_page && current_page == 'other-page') {
    page_body = other_page
  }
}

setting_page_body()


///PAGE MAIN RETURN//////////////////////////////
  return (
    <>  
        {/* Top alert */}
        {show_top_alert &&
          <Top_alert
            data={top_alert_data}
          />
        }



        {/* Site popups */}
        <div className="pop-up">
          {main_pop_show &&
            <Pop_up 
              main_pop_handle = {()=> main_pop_handle}
              data = {main_pop}
              log_reg_pop = {log_reg_pop}
              additional_class = {" "}

              search_result = {get_result}
            />
          }
        </div>




      {/* Main Body */}
      {userData?

      <div className="container-fluid m-0 px-0">
        <div className="row m-0">
          <div className="col-md-2 order-2 left-sidebar-col order-md-1 sidebar">
                {left_side}
          </div>
          <div className="col-md-7 order-1 order-md-2 middle-sidebar sidebar p-0">
            {!(currentWidth >= mobileWidth) && 
              <Mobile_header
              main_logo={main_logo}
              main_search = {<Search_main
                              hanlde_search = {()=> hanlde_search}
                            />}
              backendURL = {backendURL}
              />}
              
            {page_body}
          </div>
          <div className="col-md-3 order-3 order-md-3 right-sidebar-col sidebar py-4">
            {right_side}
          </div>
        </div>
      </div>
      :
      // Homeoverlay
      <Home_overlay
              data={home_posts? home_posts: ""}
      />
    }


    </>
  )
}

export default app

///////END game /////////////////////