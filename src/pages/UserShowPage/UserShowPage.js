import { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useParams } from 'react-router-dom'
import * as userAPI from '../../utilities/users-api'
import * as restaurantsAPI from '../../utilities/restaurants-api'
import ContactList from '../../components/ContactList/ContactList'
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm'
import FavRestaurantList from '../../components/FavRestaurantList/FavRestaurantList'
import Contact from '../../components/Contact/Contact'
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
    const [newUserContacts,setNewUserContacts] = useState([])
    const [changeFollowBtn,setChangeFollowBtn] = useState(false)

   
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
             
                    const newData = data.user.posts
                    const newPic = data.user.pic
                    const newName = data.user.name
                    const newconnections = data.user.contacts

                    setPosts(newData)
                    setProfilePic(newPic)
                    setUserName(newName)
                    setNewUserContacts(newconnections)
                
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
   
    useEffect(function(){
        async function getnewContacts(){
            try {
                const data = await userAPI.contactIndex()
                setContacts(data)
            } catch (error) {
                console.log(error)
            }
         }
         getnewContacts()
         setUser(user)
    },[changeFollowBtn])

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
            setChangeFollowBtn(true)
            console.log('succeeded in adding this new contact')

        }catch(error){
            console.log(error)
        }
    }


    const deleteContact = async(userId) =>{
        try{
            await userAPI.deleteContact(userId)
            setChangeFollowBtn(false)
            console.log('succeeded in deleting this new contact')
        }catch(error){
            console.log(error)
        }
    }
    console.log(contacts)
    console.log(changeFollowBtn)
    console.log(user)

    return(
        <div className={styles.UserShowPage}>
          {/* Below is only show the current loggedin user's profile */}
          <div className={styles.userInfo}>
            <div className={styles.profileNamePic}>
                <img className={styles.profilePic} src={profilePic}/>
                <h2>{userName}</h2>
            </div>
            <h4>{posts.length} Posts</h4>
            <h4>{newUserContacts.length} Contacts</h4>
          </div>
          {user._id === userId? <ContactList contacts={contacts} user={user} userId={userId} deleteContact={deleteContact}/> :<></>}
          
          {/* following and add contact */}
          {

            user._id !== userId && !contacts.includes(userId)? <button onClick={()=>addContact(userId)}>{changeFollowBtn?'unfollow':'follow'}</button>:<></>
          }
          {/* unfollowing and delete contact */}
           {
            user._id !== userId && contacts.includes(userId)? <button onClick={()=>deleteContact(userId)}>unfollowing1</button>:<></>
          }

          {/* click button to display or hid the UpdateUserForm*/}
          {user._id === userId?  <button onClick={()=>setShowUpdateUserForm(true)}>Edit profile</button>:<></>}

          {showUpdateUserForm? 
          <UpdateUserForm userId={userId} user={user} setUser={setUser} setShowUpdateUserForm={setShowUpdateUserForm}/>
          :<></>}

          <ShowPagePosts allPosts={posts} user={userId}/>

          {/* {user._id === userId?  <button onClick={()=>{deleteAccount(userId),logOut()}}>Delete User</button>:<></>} */}

          <FavRestaurantList restaurants={favRestaurants} user={user}/> 
        <div className={styles.post}>
          <img src="https://picsum.photos/200"/></div>
          {user.name}
          {user.email}
          <NavBar user={user} setUser={setUser}/>
        </div>
       
    )
}