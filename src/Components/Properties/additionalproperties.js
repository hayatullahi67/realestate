import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, updateDoc, addDoc } from 'firebase/firestore';
import { db } from './config';
import classes from './AdditionalImages.module.css';
import bathroom from '../../Assets/Images/bathroom.png';
import bedroom from '../../Assets/Images/bedroom.png';
import call from '../../Assets/Images/biphone.png';
import Profile from '../../Assets/Images/profile.png'
import { MdOutlineClose } from "react-icons/md";

function AdditionalImages() {
  const { propertyId } = useParams();
  const [additionalImages, setAdditionalImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [bed, setBed] = useState('');
  const [bath, setBath] = useState('');
  const [agent, setAgent] = useState();
  const [agentphone, setAgentphone] = useState();
  const [agentprofile, setAgentprofile] = useState();
  const [modalOpen, setModalOpen] = useState(false); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstimage , setFirstimage] = useState(null)
  const [secondimage , setSecondimage] = useState(null)
  const [thirdimage , setThirdimage] = useState(null)
  const [additionalImagesmodal,setadditionalImagesmodal] = useState(false)
  const [thirdimagemodal , setthirdimagemodal] = useState(false)


  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!propertyId) {
        setError("No property ID found.");
        setLoading(false);
        return;
      }

      try {
        // Try to find the property in all three collections
        const collections = ['properties', 'rent', 'buy'];
        let propertySnap = null;
        let propertyRef = null;

        for (const collectionName of collections) {
          propertyRef = doc(db, collectionName, propertyId);
          propertySnap = await getDoc(propertyRef);
          if (propertySnap.exists()) {
            break;
          }
        }

        if (!propertySnap.exists()) {
          setError("Property not found.");
          return;
        }

        const propertyData = propertySnap.data();
        console.log("Fetched property data:", propertyData);

        setPrice(propertyData.price);
        setLocation(propertyData.location);
        setBed(propertyData.beds);
        setBath(propertyData.baths);
        setPropertyType(propertyData.land);

        const createdAt = propertyData.createdAt.toDate();
        const formattedTime = createdAt.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
        setTime(formattedTime);

        if (Array.isArray(propertyData.additionalImageUrls)) {
          const [firstImage, secondImage, thirdImage, ...remainingImages] = propertyData.additionalImageUrls;
          setAdditionalImages(remainingImages);
          setFirstimage(firstImage);  // Set first image
          setSecondimage(secondImage);  // Set second image
          setThirdimage(thirdImage);  // Set third image
       

         setthirdimagemodal(remainingImages.length > 0)
        } else {
          console.warn("additionalImageUrls is not an array or is missing.");
        }

        if (propertyData.user_id) {
          setUserId(propertyData.user_id);

          const agentRef = doc(db, "users", propertyData.user_id);
          const agentSnap = await getDoc(agentRef);
          if (agentSnap.exists()) {
            const agentData = agentSnap.data();
            setAgent(`${agentData.name}`);
            setAgentphone(`${agentData.phoneNumber}`);
            setAgentprofile(`${agentData.profileImage || ''}`);
          } else {
            setError("Agent not found");
          }
        } else {
          setError("No agent associated with this property.");
        }

        
      } catch (error) {
        console.error("Error fetching property data: ", error);
        setError("Failed to fetch property data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);


  const openImageModal = (image) => {
    setSelectedImage(image); // Set the selected image
    setIsModalOpen(true); // Open the modal
  };

  const closeImageModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedImage(null); // Reset the selected image
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalOpen(false);


    if (!userId) {
      console.error("Error: userId (agent's ID) is not available.");
      setIsSubmitting(false); 
      return;
    }

    const userData = { firstName, lastName, email, phoneNumber };
    console.log("User data submitted:", userData);

    try {
      const notificationsRef = collection(db, 'notifications');
      const notificationData = {
        agentId: userId,
        message: `New client inquiry from ${firstName} ${lastName}`,
        timestamp: new Date(),
        propertId: propertyId,
        clientDetails: { firstName, lastName, phoneNumber, email }
      };

      const notificationAdded = await addDoc(notificationsRef, notificationData);
      await updateDoc(notificationAdded, { notificationId: notificationAdded.id });

      // Clear form fields and close the modal after submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding notification: ", error.code, error.message);
      // Optionally, set error message to inform the user
    } finally {
      setIsSubmitting(false); // Ensure this is called in both success and error scenarios
    }
};


  if (loading) return <p>Loading images...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={classes.container}>
    {isSubmitting && (
      <div className={classes.loadingOverlay}>
        <div className={classes.loadingModal}>
          <p>Submitting data, please wait...</p>
        </div>
      </div>
    )}
      <div className={classes.innerContainer}>
        <div className={classes.text}>
          <h4>
          {propertyType !== "land" ? (
              <>House </>
            ) : (
              <>Land </>
            )}
           For Sale in {location}</h4>
          <h5>₦ {price}</h5>
        </div>
        <div className={classes.images}>
          <div className={classes.row}>
            {/* {additionalImages && additionalImages.length > 0 ? (
              additionalImages.map((image, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                  <img
                    src={image}
                    alt={`img${index + 1}`}
                    className={classes.additionalImg}
                    onClick={() => openImageModal(image)} // Open modal on click
                  />
                </div>
              ))
            ) : (
              <p>No additional details available.</p>
            )} */}

            <div className={classes.firstimage}>
              {firstimage && (
               
                <img
                  src={firstimage}
                  alt="First image"
                  className={classes.additionalImg}
                  onClick={() => openImageModal(firstimage)} 
                />
               
              )}
            </div>

            <div className={classes.secondrow}>
              <div>
              {secondimage && (
                 
                   <img
                     src={secondimage}
                     alt="Second image"
                     className={classes.secondrowimg}
                     onClick={() => openImageModal(secondimage)} // Open modal on click
                   />
                 
               )}
              </div>

              <div>
              {thirdimage && (
                 <>
                 <div className={classes.thirdImageWrapper}>

                  <img
                     src={thirdimage}
                     alt="Third image"
                     className={classes.secondrowimg}
                     onClick={() => openImageModal(thirdimage)} // Open modal on click
                   />
                      

                      {thirdimagemodal &&  (
                       <div
                               className={classes.thirdimgmodal}
                                   onClick={() => setadditionalImagesmodal(true)}
                                  >
                                      <p>MORE ++</p>
                            </div>
                    ) }
                   </div>
                   
  

                  

                   
                 </>
               )}
              </div>
            </div>
             
             

          </div>
        </div>

             {additionalImagesmodal && (

                <div className={classes.modalOverlay}>
          <div className={classes.modalContent}> 
            <div>
              
            <div className={classes.iconcontainer} onClick={()=>setadditionalImagesmodal(false)}>
               <MdOutlineClose  className={classes.lineclose} /> 
             </div> 
              
           
            
            <div className={classes.additionalImagesContainer}>
             
               {additionalImages.map((additionalImage, index) => (
                 <div key={index} className={classes.additionalImages}>
                  <img src={additionalImage} 

                    onClick={() => openImageModal(additionalImage)} 
                   alt={`additionalImage${index}`} />
                 </div>
               ))}
            </div>
          
              </div> 
            
               
        
               
          
       
             
          </div>
          </div>

             )

             }

          
           

      




        <div className={classes.updatedDiv}>
           <div className={classes.updated}>
             <h4>Updated on {time}</h4>
           </div>
         </div>
         <div className={classes.details}>
           <div className={classes.detailsdiv}>
             <h6>569312</h6>                     
             <h6>BF ID</h6>
           </div>
           <div className={classes.detailsdiv}>
             <h6>Residential</h6>
             <h6>Property Usage</h6>
           </div>
           <div className={classes.detailsdiv}>
           <h6>New</h6>
           <h6>Build-up status</h6>
           </div>
           {propertyType !== 'land' && (
            <>
            <div className={classes.detailsdiv}>
             <h6><img src={bedroom} alt="bedroom" /> {bed }</h6>
             <h6>Bedrooms</h6>
           </div>
           <div className={classes.detailsdiv}>
             <h6><img src={bathroom} alt="bathroom" /> {bath} </h6>
             <h6>Bathrooms</h6>
           </div>
            </>
           )}
          
           <div className={classes.detailsdiv}>
           {propertyType !== 'land' && (
            <>
            <h6>Semi Furnished</h6>
            <h6>Furnished</h6>
            </>
           
           )}
             
           </div>
          </div>
          </div>
          <div className={classes.contactCard}>
        <div className={classes.agentprofile}>
          <img 
          src={agentprofile ? agentprofile : Profile }
            />
        </div>
        <p>{agent ? agent : "Agent not available"}</p>
        <p>{agentphone ? agentphone : "Agent phone not available"}</p>
        <button className={classes.callButton} onClick={() => setModalOpen(true)}>
          <img src={call} alt="call" /> Contact Us
        </button>
      </div>

      {/* Modal as a div */}
      {modalOpen && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
          <div>
          <h2>Contact Agent</h2>
         
          <form  onSubmit={handleFormSubmit}>
          <div className={classes.formBody}>
                            {/* <div className={classes.topForm}> */}
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder="First name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={classes.firstName}
                                />
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder="Last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={classes.lastName}
                                />
                            {/* </div> */}
                            <input
                                type="email"
                                value={email}
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                className={classes.emailNum}
                            />
                            <input
                                type="tel"
                                value={phoneNumber}
                                placeholder="Phone number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={classes.phoneNumber}
                            />
                           
                            
                            
                        </div>
          
            <div className={classes.submit}>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
            
            </form>
         
            
          </div>
          
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={classes.modalOverlay} onClick={closeImageModal}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className={classes.modalImage} />
            <button className={classes.closeButton} onClick={closeImageModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdditionalImages;
