// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from '../../../pagedesign/Team2.module.css';
// import teamdefpic from "../../../public/user.png";
// import Loader from '../../../components/Loader';  
// import Image from 'next/image';
// const Team = () => {
//   const [teamData, setTeamData] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const router = useRouter();

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('User not authenticated');
//         setLoading(false);
//         router.push('/login');
//         return;
//       }

//       try {
//         const response = await axios.get('/api/myteam', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setTeamData(response.data);
//       } catch (error) {
//         setError('Error fetching team data:');
//         console.error('Error fetching team data:', error);
//       }
//       finally {
//         setLoading(false);
//       }
//     };

//     fetchTeamData();
//   }, [router]);

//   if (loading) return <Loader />; // Show loader while loading
//   if (error) return <p>{error}</p>; // Show error message if there's an error


//   // if (!teamData) return <p>Loading...</p>;

//   return (
//     <div className={styles.tearmcontainer}>
//       <h1 className={styles.title}>My Team</h1>
//       <div className={styles.teamDetails}>
//       <h2 className={styles.title}>Referred By</h2> 
//       {teamData.referredBy ? (
//         <div>
//           <p> <strong>Name: </strong> {teamData.referredBy.username}</p>

//           <p><strong>Email:</strong> {teamData.referredBy.email}</p>
//           <p> <strong>Phone:</strong>  {teamData.referredByProfile.phoneNumber}</p>
//         </div>
//       ) : (
//         <p>You were not referred by anyone.</p>
//       )}
      
//         <h2 className={styles.title}>My Info</h2>
//         <p> <strong>Name: </strong> {teamData.myInfo.username}</p>
//         <p> <strong>Email:  </strong>  {teamData.myInfo.email}</p>
//         <p> <strong>Phone: </strong>  {teamData.myProfile.phoneNumber}</p>
//         <Image
//         width="200"
//         height="200"
//         className={styles.screenshot}
//         alt="Screenshot"
//         src={teamData.myProfile.profilepic || teamdefpic}
//       />

//         <h2 className={styles.title}>People I Referred</h2>
//         {teamData.referredUsers.length > 0 ? (
//           teamData.referredUsers.map((user, index) => (
//             <div key={index}>
//               <p> <strong>Name: </strong>  {user.username}</p>
//               <p> <strong>Email: </strong> {user.email}</p>

//               <p><strong>Phone:</strong> {user.profile?.phoneNumber}</p>
              
//                 {teamData.myProfile ? (
//           <Image
//             width="200"
//             height="200"
//             className={styles.screenshot}
//             alt="Screenshot"
//             src={teamData.myProfile.profilepic}
//           />
//         ) : (

//           <Image
//           width="200"
//           height="200"
//           className={styles.screenshot}
//           alt="Screenshot"
//           src={teamdefpic}
//         />

//         )}


//             </div>
//           ))
//         ) : (
//           <p>No one has used your referral link yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Team;


'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../pagedesign/Team2.module.css';
import teamdefpic from "../../../public/user.png";
import Loader from '../../../components/Loader';  
import Image from 'next/image';
const Team = () => {
  const [teamData, setTeamData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchTeamData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/myteam', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTeamData(response.data);
      } catch (error) {
        setError('Error fetching team data:');
        console.error('Error fetching team data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [router]);

  // Handle click event on referred user images
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedUser(null);
  }; 

  if (loading) return <Loader />; // Show loader while loading
  if (error) return <p>{error}</p>; // Show error message if there's an error


  // if (!teamData) return <p>Loading...</p>;

  return (
    <div className={styles.tearmcontainer}>
      <h1 className={styles.title}>My Team</h1>
      <div className={styles.teamDetails}>
        
        {/* Left Referrer */}
        <div className={`${styles.referrer} ${styles.connectionLine}`}>
          <h2>Referred By</h2>
          {teamData.referredBy ? (
            <>
              <p><strong>Name: </strong>{teamData.referredBy.username}</p>
              <p><strong>Email: </strong>{teamData.referredBy.email}</p>
              <p><strong>Phone: </strong>{teamData.referredByProfile.phoneNumber}</p>
            </>
          ) : (
            <p>You were not referred by anyone.</p>
          )}
        </div>
  
        {/* Center My Info */}
        <div className={styles.myInfoSection}>
          <h2>My Info</h2>
          <p><strong>Name: </strong>{teamData.myInfo.username}</p>
          <p><strong>Email: </strong>{teamData.myInfo.email}</p>
          <p><strong>Phone: </strong>{teamData.myProfile.phoneNumber}</p>
          <Image
            width="150"
            height="150"
            className={styles.screenshot}
            alt="Profile Picture"
            src={teamData.myProfile.profilepic || teamdefpic}
          />
        </div>
  
        {/* Right Referred Users */}

        <div className={styles.referredUser}>
          <h2  className={styles.h2}>People I Referred</h2>
          {teamData.referredUsers.length > 0 ? (
            teamData.referredUsers.map((user, index) => (
              <div key={index} onClick={() => handleUserClick(user)}>
               
                <Image
                  width="150"
                  height="150"
                  className={styles.screenshot}
                  alt="Referred User Picture"
                  src={user.profile?.profilepic || teamdefpic}
                  priority
                />
              </div>
            ))
          ) : (
            <p>No one has used your referral link yet.</p>
          )}
        </div>
      </div>

      {selectedUser && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.closeModal} onClick={closeModal}>&times;</span>
            <h2>{selectedUser.username} Profile</h2>
            <p><strong>Email: </strong>{selectedUser.email}</p>
            <p><strong>Phone: </strong>{selectedUser.profile?.phoneNumber}</p>
            <Image
              width="150"
              height="150"
              className={styles.screenshot}
              alt="Profile Picture"
              src={selectedUser.profile?.profilepic || teamdefpic}
            />
          </div>
        </div>
      )}

    </div>
  );
  
};

export default Team;
