import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import { useParams } from 'react-router-dom'
import * as userAPI from '../../utilities/users-api'
import * as postsAPI from '../../utilities/posts-api'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import {logOut} from '../../utilities/users-service'
import ContactList from '../../components/ContactList/ContactList'
import PostList from '../../components/PostList/PostList'
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm'
import FavRestaurantList from '../../components/FavRestaurantList/FavRestaurantList'
import Contact from '../../components/Contact/Contact'
import Post from '../../components/Post/Post'
import FavRestaurant from '../../components/FavRestaurant/FavRestaurant'
import styles from './UserShowPage.module.scss'
import ShowPagePosts from '../../components/ShowPagePosts/ShowPagePosts'


export default function UserShowPage(
    { user, setUser }
){
    const {userId} = useParams() 
    console.log(userId)
    console.log(user)
    //below is to show the current logged-in user's info

    const [contacts, setContacts] = useState([])
    const [posts, setPosts] = useState([])
    const [profilePic, setProfilePic] = useState([])
    const [favRestaurants, setFavRestaurants] = useState([])
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false)
    const [userName, setUserName] = useState([])
    const [changeFollowBtn,setChangeFollowBtn] = useState(false)
    const postCount = posts.length


    useEffect(function(){
        // async function getAllPosts(){
        //    try{
        //     const data = await postsAPI.getAllUserPosts(userId)
        //     setPosts(data)
        //    } catch(error){
        //     console.log(error)
        //    }
        // }
        async function getAllPosts(){
               try{
                const data = await userAPI.showUser(userId)
                if(data){
                    const newData = data.user.posts
                    const newPic = data.user.pic
                    const newName = data.user.name
                    setPosts(newData)
                    setProfilePic(newPic)
                    setUserName(newName)
                }
               } catch(error){
                console.log(error)
               }
            }
        
        async function getAllUserFav(){
            try{
             const data = await restaurantsAPI.getAllUserFav(userId)
             setFavRestaurants(data)
            } catch(error){
             console.log(error)
            }
         }
         async function getAllContacts(){
            try {
                const data = await userAPI.contactIndex()
                setContacts(data)
            } catch (error) {
                console.log(error)
            }
         }
            getAllPosts()
            getAllUserFav()
            getAllContacts()
    },[userId])

    console.log(posts)

    const deleteAccount = async(userId) =>{
        try{
            await userAPI.deleteUser(userId)
            console.log('succeeded in deleting this account')
        }catch(error){
            console.log(error)
        }
    }
    const addContact = async(userId) =>{
        try{
            await userAPI.addContact(userId)
            setChangeFollowBtn(!changeFollowBtn)
            console.log('succeeded in adding this new contact')

        }catch(error){
            console.log(error)
        }
    }


    const deleteContact = async(userId) =>{
        try{
            await userAPI.deleteContact(userId)
            setChangeFollowBtn(!changeFollowBtn)
            console.log('succeeded in deleting this new contact')
        }catch(error){
            console.log(error)
        }
    }
    //below is to make it versatile and show any user's info & this requires passing down the params --userId
    // const [newUser, setNewUser] = useState(user)
    // const [newContacts, setNewContacts] = useState(user[contacts])
    // const [newPosts, setNewPosts] = useState(user[posts])
    // const [newFavRestaurants, setNewFavRestaurants] = useState(user[favRestaurants])
    // const newUserId = useParams()
    // useEffect(function(){
    //     async function fetchNewUser(){
    //         try{
    //             const data = await userAPI.showUser(newUserId)
    //             setNewUser(data)
    //         }catch(error){
    //             console.log(error)
    //         }
    //     }
    //     fetchNewUser()
    // },[newUser])

    // useEffect(()=>{
    //     setNewContacts(newUser[contacts])
    //     setNewPosts(newUser[posts])
    //     setNewFavRestaurants(newUser[favRestaurants])
    // }
    // ,[newUser])

<<<<<<< HEAD
          {showUpdateUserForm? 
          <UpdateUserForm userId={userId} user={user} setUser={setUser} setShowUpdateUserForm={setShowUpdateUserForm}/>
          :<></>}

          {user._id === userId? <button onClick={()=>deleteAccount(user._id)}>Delete User</button>:<></>}

          <ShowPagePosts allPosts={posts} user={userId}/>

          {/* {user._id === userId?  <button onClick={()=>{deleteAccount(userId),logOut()}}>Delete User</button>:<></>} */}

          <FavRestaurantList restaurants={favRestaurants} user={user}/> 
        <div className={styles.post}>
          <img src="https://picsum.photos/200"/></div>
          {user.name}
          {user.email}
          <div className={styles.navBar}>
          <NavBar user={user} setUser={setUser}/></div>
=======
    // Inside your UserShowPage component
return (
    <div className={styles.userShowPage}>
        {/* Below is only show the current loggedin user's profile */}
        <div className={styles.userContainer}>
            {/* Conditionally render profile picture */}
            {profilePic ? (
                <img className={styles.profilePic} src={profilePic} alt={userName}/>
            ) : (
                <img className={styles.profilePic} src="https://picsum.photos/100" alt={userName}/>
            )}
            <h1>{userName}</h1>
>>>>>>> b6414b2214ddb03ad56bdb163871725f4dbe9b8f
        </div>
        <div className={styles.postCount}>
            <p>Posts: {postCount}</p>
        </div>
        {user._id === userId? <ContactList contacts={contacts} user={user} userId={userId}/> :<></>}
        {/* following and add contact */}
        {user._id !== userId && !user.contacts.includes(userId) ? <button onClick={()=>addContact(userId)}>{changeFollowBtn? 'unfollow':'follow'}</button> : <></>}
        {/* unfollowing and delete contact */}
        {user._id !== userId && user.contacts.includes(userId) ? <button onClick={()=>deleteContact(userId)}>{changeFollowBtn? 'follow':'unfollow'}unfollowing</button> : <></>}
        {/* <PostList allPosts={posts} user={userId}/> */}
        <ShowPagePosts allPosts={posts} user={userId}/>
        {/* click button to display or hide the UpdateUserForm*/}
        {user._id === userId?  <button onClick={()=>setShowUpdateUserForm(true)}>Edit profile</button>:<></>}
        {showUpdateUserForm? 
            <UpdateUserForm userId={userId} user={user} setUser={setUser} setShowUpdateUserForm={setShowUpdateUserForm}/>
            :<></>
        }
        {/* {user._id === userId?  <button onClick={()=>{deleteAccount(userId),logOut()}}>Delete User</button>:<></>} */}
        <FavRestaurantList restaurants={favRestaurants} user={user}/> 
        {user.name}
        {user.email}
        <NavBar user={user} setUser={setUser}/>
    </div>
    )
}