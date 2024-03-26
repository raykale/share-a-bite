import styles from './ContactList.module.scss'
import Contact from '../../components/Contact/Contact'
 
export default function ContactList ({ 
    user,
    contacts,
    userId
}){
    const userContacts = contacts.map(contact =>
        <Contact
            key={contact._id}
            user={user}
            contact={contact}
        />
    )

    return(
        contacts ?
    <div className={styles.sidebar}>
        <header>
        <h3>ContactList</h3>
        </header>
        <div className={styles.scrollbox}>
      <div className={styles.innerScrollbox}>
        {userContacts}</div>  
        </div>
        
        </div>
        :
        <h3>No Contacts Yet!</h3>
        ) 
    }

