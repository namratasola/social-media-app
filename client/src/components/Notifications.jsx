// import React, { useContext } from 'react'
// import '../styles/Notifications.css'
// import {RxCross2} from 'react-icons/rx' 
// import { GeneralContext } from '../context/GeneralContextProvider'

// const Notifications = () => {

//     const {isNotificationsOpen, setNotificationsOpen} = useContext(GeneralContext);

//   return (
//     <>
//         <div className="notificationsModalBg" style={isNotificationsOpen? {display: 'contents'} : {display: 'none'}} >
//             <div className="notificationsContainer">
               
//                 <RxCross2 className='closenotifications' onClick={()=> setNotificationsOpen(false)} />
//                 <h2 className="notificationsTitle">Notifications</h2>
//                 <hr className="notificationsHr" />
                
//                 <div className="notificationsBody">
//                     <p>No new notifications</p>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Notifications;


// import React, { useContext } from 'react';
// import '../styles/Notifications.css'
// import { GeneralContext } from '../context/GeneralContextProvider';

// const Notifications = () => {
//   const { notifications } = useContext(GeneralContext);

//   return (
//     <div className='notifications'>
//       <h2>Notifications</h2>
//       {notifications.length === 0 ? (
//         <p>No new notifications</p>
//       ) : (
//         notifications.map((notification, index) => (
//           <div key={index} className='notification'>
//             <p>{notification.message}</p>
//             <span>{new Date(notification.timestamp).toLocaleString()}</span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };
//export default Notifications;






import React, { useContext , useState, useEffect} from 'react';
import '../styles/Notifications.css';
import { RxCross2 } from 'react-icons/rx';
import { GeneralContext } from '../context/GeneralContextProvider';

const Notifications = () => {
  const { isNotificationsOpen, setNotificationsOpen, notifications } = useContext(GeneralContext);
  const [uniqueNotifications, setUniqueNotifications] = useState([]);

  useEffect(() => {
    // Remove duplicates from notifications array
    const unique = notifications.filter((value, index, self) => {
      return self.findIndex((t) => t.message === value.message && t.timestamp === value.timestamp) === index;
    });
    setUniqueNotifications(unique);
  }, [notifications]);


  return (
    <div className="notificationsModalBg" style={isNotificationsOpen ? { display: 'block' } : { display: 'none' }}>
      <div className="notificationsContainer">
        <RxCross2 className='closenotifications' onClick={() => setNotificationsOpen(false)} />
        <h2 className="notificationsTitle">Notifications</h2>
        <hr className="notificationsHr" />
        <div className="notificationsBody">
          {uniqueNotifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            uniqueNotifications.map((notification, index) => (
              <div key={index} className='notification'>
                <p>{notification.message}</p>
                {/* <span>{new Date(notification.timestamp).toLocaleString()}</span> */}
                <h5 className="notificationTimestamp">
                  {new Date(notification.timestamp).toLocaleString()}
                </h5>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

