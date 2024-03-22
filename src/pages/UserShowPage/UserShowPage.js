import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation } from '../../components/NavBar/NavBar'
import { useParams } from 'react-router-dom'
import * as userAPI from '../../utilities/users-api'
import ContactList from '../../components/ContactList/ContactList'
import PostList from '../../components/PostList/PostList'
import UpdateUserForm from '../../components/Post/Post'
import FavRestaurantList from '../../components/FavRestaurantList/FavRestaurantList'
import Contact from '../../components/Contact/Contact'
import Post from '../../components/Post/Post'
import FavRestaurant from '../../components/FavRestaurant/FavRestaurant'


export default function UserShowPage(
    { user, setUser }
){
    console.log(user)
    //below is to show the current logged-in user's info

    const [contacts, setContacts] = useState(user.contacts)
    const [posts, setPosts] = useState(user.posts)
    const [favRestaurants, setFavRestaurants] = useState(user.favRestaurants)

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

    return(
        <>
          {/* Below is only show the current loggedin user's profile */}
          <ContactList contacts={contacts}/>
          <PostList posts={posts}/>
          <UpdateUserForm/> {/* might display a button and use onclick function to show the form*/}
          <FavRestaurantList favRestaurants={favRestaurants}/>
          {/* Below is to show the any user's profile */}
          {/* <ContactList newContacts={newContacts}/>
          <PostList newPosts={newPosts}/>
          <UpdateUserForm/> */}
        </>
       
    )
}