import React from 'react';
import Header from './bars/Header';
import Home from './pages/Home';
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
import Top_alert from './modules/Top_alert';
import User_head from './modules/User-head';
import User_box from './modules/User-box';
import User_info_update from './modules/User-info-update';
import User_post from './modules/User-post';
import User_own_post from './modules/User-own-post';



import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'




function test() {

  // ALL CONSTS ///
  //Backend
  const backendURL = "http://localhost:5000"
  const mobileWidth = 768;





////React ALL state
// Site main pop up data
const [main_pop, set_main_pop] = React.useState()


// Site main pop handle
const [main_pop_show, set_main_pop_show] = React.useState(false)


// User single post show
const [user_single, set_user_single] = React.useState(undefined)


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
const [current_page, set_current_page] = React.useState('Home')


// Setting other page
const [other_page, set_other_page] = React.useState()


// Log Reg_pop up
const [log_reg_pop, set_log_reg_pop] = React.useState(false)



// Setting user all post
const [all_posts_user, set_all_posts_user] = React.useState(undefined)



// Top alert
const [top_alert_data, set_top_alert_data] = React.useState("")
const [show_top_alert, set_show_top_alert] = React.useState(false)


///END REACT STATES






// User All data fetch
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
  }, [reload])






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







///END data fetch////






///// ALL FUNCTIONS /////
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
  set_reload(!reload)
}






// Setting main popup handle show or hide
var main_pop_handle = ()=> {
  set_main_pop_show(!main_pop_show)
}





// User profile pop up show 
function handle_frind_profile_show(user) {
  var profile = user.friend_profile? user.friend_profile : user.profile

  function handle_parameter() {
    handle_friend_profile(user)
  }
  set_user_single(false)

  set_main_pop(
    <Pop_up_profile
      proile_image_url  = {`${backendURL}/profile/${profile.userName}/${profile.userImageUrl}`} 
      profile_fullName  = {profile.fullName}
      profile_bDay      = {profile.joinDate}
      profile_join_date = {profile.joinDate}
      proile_btn_text   = "Remove Friend"
      proile_btn_url    = {`${backendURL}/remove-friend/${profile.userName}`}
      handle_friend_profile = {()=> handle_parameter}
    />
  )
  main_pop_handle()
  handle_reload()
}




//Showing user single post 
function user_single_post(item) {
  // Delete post pop
  var popup_delete_btn = <>
    <p class="title-1">Delete Post</p>
    <a href={`${backendURL}/delete-post/${item.id}`}>
      <button className="secondery-btn delete-btn mt-1">Confrim Delete!</button>
    </a>
  </>
  set_main_pop(popup_delete_btn)

    // already liked
    var is_liked = item.liked_by_users.split(',').includes(userData.userName)
    
    // Calling the fucntin to pass event and Item
    function post_liked() {
      handle_like_post(event, item)
      handle_reload()
    }

  return (
    <User_own_post 
        key={nanoid()}
        comment_url = {`${backendURL}/post-comment`}
        post_data = {item}
        post_image_url = {`${backendURL}/post/${item.user_name}/${item.id}/${item.file_name}`}
        user_image_url = {`${backendURL}/profile/${item.user_name}/${item.user_image}`}
        close_post={()=> close_post}
        confrim_delete = {()=> main_pop_handle}
        handle_like_btn = {()=> post_liked}
        liked_style = {is_liked? 'liked-icon' : ""}
        user_like = {""}
      />
  )
}







// Close post btn funtion
function close_post(){
  set_user_single(undefined)
}




// Handle login or register
function registery_func() {
  set_log_reg_pop(true)

  set_main_pop(
    <Register_module 
      handle_register = {()=> login_func}
    />)
}



function login_func() {
  set_log_reg_pop(true)

  function action_click() {
    
  }


  set_main_pop(
    <Login_module 
      handle_register = {()=> registery_func}
      handle_try = {()=> action_click}
      input_onChange = {handle_change}
      form_submit = {handle_login_submit}
      from_data = {from_data}
    />)

}


// Logout function
function log_user_out() {
  window.location.href = `${backendURL}/logout`
  const state = { page: 'Home', };
  localStorage.setItem('state', JSON.stringify(state));
}




//User info update handle
const user_update_pop_handle = ()=> {
  set_main_pop(
  <User_info_update/>)
  main_pop_handle()
}




// Error text on top bar
React.useEffect(()=> {
  const timer = setTimeout(()=> {
      set_show_top_alert(false)
  }, 2000)
  return ()=> clearTimeout(timer)
}, [show_top_alert])


function get_error_text() {
  fetch(`${backendURL}/logout`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log(err))
}






// hanlde submit
const [from_data, set_form_data] = React.useState({
  'user': '',
  'password': ''
})

const [response_mesg, set_response_mesg] = React.useState('')

const handle_change = (e)=> {
  const {name, value} = e.target;
  console.log(name, value, 'handle_chage')

  set_form_data({
    ...from_data,
    [name]: value
  })
}


const handle_login_submit = async (e) => {
  e.preventDefault()
  console.log(from_data, 'submit')
  console.log('hanlde login')
  try {
    const res =  await fetch(`${backendURL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(from_data)
    });
    
    if (res.ok) {
      const data = await res.json();
      set_response_mesg('form -submited')
    } 
    else {
      set_response_mesg('form faild')
    }
  } catch (err) {
    set_response_mesg('an error')
  }
  handle_reload()
}


///END FUNCTIONS////






// Home post Setting up
var home_posts = undefined
if(loadingHome){
  var home_data_shorted = homeData.sort((a,b)=> b.post.id-a.post.id)
  home_posts = home_data_shorted.map(n=> {

    // profile show
    function handle_profile() {
      if (n.profile.userName == userData.userName) {
        set_current_page('Profile')
        handle_current_user_all_post(userData.userAllPosts)
        set_reload(!reload)
         // Scroll opton set
        document.querySelector('body').scrollIntoView(true);
      } 
      else {

        handle_frind_profile_show(n)
      }
    }

    // already liked
    var is_liked = n.post.liked_by_users.split(',').includes(userData.userName)

    // Calling the fucntin to pass event and Item
    function post_liked() {
      handle_like_post(event, n.post)
    }
    
    return (
      <User_post 
        key={nanoid()}
        comment_url = {`${backendURL}/post-comment`}
        post_data = {n.post}
        post_image_url = {`${backendURL}/post/${n.post.user_name}/${n.post.id}/${n.post.file_name}`}
        user_image_url = {`${backendURL}/profile/${n.post.user_name}/${n.post.user_image}`}
        handle_user_btn = {()=> handle_profile} 
        handle_like_btn = {()=> post_liked}
        liked_style = {is_liked? 'liked-icon' : ""}
        user_like = {""}
      />
    )
  })
}




// User all friends posts show in profile
var all_frieds_posts = undefined

function handle_user_all_post(userData) {
  all_frieds_posts = userData.user_friend_post.map(n=> {
    var post_image = `${backendURL}/post/${n.user_name}/${n.id}/${n.file_name}`


    // friend single post
    function see_post() {
      main_pop_handle()

      set_main_pop(
        <div className="friend-single-post">
          {user_single_post(n)}
        </div>
      )
      handle_reload()
    }

    return (
      <li key={nanoid()}>
        <img src={post_image} alt="" />
        <a onClick={()=> see_post()}><button className="secondery-btn mt-1">see post</button></a>
      </li>
    )
  })
  
}




// User all post
function handle_current_user_all_post (data) { 
    var user_all_post = data.map(n=> {
    var postImage = `${backendURL}/post/${n.user_name}/${n.id}/${n.file_name}`
    
    function see_post() {
      set_user_single(user_single_post(n))
    }

    return (
      <li key={nanoid()}>
        <img src={postImage} alt="" />
        <a onClick={()=> see_post()}><button className="secondery-btn mt-1">see post</button></a>
      </li>
    )
  })

  set_all_posts_user(user_all_post)
  handle_reload()
}



// Header user friends
  var header_heads =undefined
  if (loading_user) {
    header_heads = userData.userAllFriends.slice(0,5).map(n => {
      return (
        <li key={nanoid()}> 
          <User_head 
            user_name = {n.friend_profile.fullName}
            user_image = {`${backendURL}/profile/${n.friend_profile.userName}/${n.friend_profile.userImageUrl}`}
          />   
        </li>
      )
    })
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

        return (
          <User_box 
            user_id = {n.userName}
            user_name = {n.fullName}
            user_image = {`${backendURL}/profile/${n.userName}/${n.userImageUrl}`}
            btn="add"
            handle_btn = {()=> add_new_fiend }
          />
        )
      })
    }





// Menu btn
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
    set_user_single(false)
  }


  set_current_page(page)
  handle_reload()
  // Scroll opton set
  document.querySelector('body').scrollIntoView(true);
}

  


// show friend main profile
function handle_friend_profile (friend) {
  var profile = friend.friend_profile? friend.friend_profile : friend.profile
  
  var friend_posts = userData.userAllFriends.filter(n => n.friend_profile.userName== profile.userName)

  handle_user_all_post(friend_posts[0])




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
      close_post()
    }

    return (
      <User_box 
        user_id = {n.friend_profile.userName}
        user_name = {n.friend_profile.fullName}
        user_image = {`${backendURL}/profile/${n.friend_profile.userName}/${n.friend_profile.userImageUrl}`}
        btn="See"
        handle_btn = {()=> handle_parameter}
      />
    )
  })
}










////SORING CURRENT PAGE ON BROWSER
// Save state to local storage before unload
window.addEventListener('beforeunload', () => {
  const state = {page: current_page,};
  localStorage.setItem('state', JSON.stringify(state));
});


// Retrieve state from local storage on load
window.addEventListener('load', () => {
  const savedState = localStorage.getItem('state');
  if (savedState) {
    const state = JSON.parse(savedState);
    // Restore your state
    set_current_page(state.page)
    // setting menu bar active class
    const all_menu = document.querySelectorAll('.left-sidebar-menu ul li a')
    all_menu.forEach(n=> {
        const item_clasess = []
        n.classList.forEach(i=> item_clasess.push(i))

        if (item_clasess.includes('active')) {
            n.classList.remove('active')
        }

        const item_page = n.childNodes[0].childNodes[1].innerHTML
        if (state.page == item_page) {
            n.classList.add('active')
        }
    })

  }
});

// END CURRENT PAGE










// Setting page body
var page_body = undefined
var left_side = 
<Left_sidebar 
  menu_function = {()=> handle_click}
  main_logo = {main_logo}
/>

var right_side = undefined

function setting_page_body () {
  // Profile page
  if(current_page == 'Profile') {
    page_body = 
        <>
          <Profile 
            newPost = {<New_post/>}
            userData = {userData}
            userImage = {backendURL+"/profile/"+userData.userName+"/"+userData.userImageUrl}
            user_all_post = {user_single? user_single : all_posts_user}
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

console.log('run')


    return (
        <>
            <Login_module 
                handle_register = {()=> {}}
                handle_try = {()=> {}}
                input_onChange = {handle_change}
                form_submit = {handle_login_submit}
                from_data = {from_data}
            />
            <h1>Hello</h1>



            <>  
        {/* Top alert */}
        {show_top_alert?
          <Top_alert
            data={top_alert_data}
          />
          :

          ""
        }

          

        {/* Site popups */}
        <div className="pop-up">
          {main_pop_show?
            <Pop_up 
              main_pop_handle = {()=> main_pop_handle}
              data = {main_pop}
              log_reg_pop = {log_reg_pop}
              additional_class = {" "}
            />
            :
            ""
          }
        </div>

      {/* Main Body */}
      <div className="container-fluid m-0 px-0">
        <div className="row m-0">
          <div className="col-md-2 order-2 left-sidebar-col order-md-1 sidebar">
                {left_side}
          </div>
          <div className="col-md-7 order-1 order-md-2 middle-sidebar sidebar p-0">
            {currentWidth >= mobileWidth?
              ""
              : 
              <Mobile_header />}
              
            {page_body}
          </div>
          <div className="col-md-3 order-3 order-md-3 right-sidebar-col sidebar py-4">
            {right_side}
          </div>
        </div>
      </div>



      
    </>



        </>
    )
}

export default test