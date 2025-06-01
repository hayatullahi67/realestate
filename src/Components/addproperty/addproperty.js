

// import React, { useEffect, useState } from 'react';
// import { storage, db, auth } from './config';
// import classes from './addproperty.module.css';
// import { collection, addDoc , updateDoc } from '@firebase/firestore';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProSetNot from '../ProSetNot/ProSetNot';

// function Addproperty() {
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [lga, setLga] = useState([]);
//   const [location, setLocation] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [land, setLand] = useState("");
//   const [details, setDetails] = useState("");
//   const [mainImage, setMainImage] = useState(null); // State for main image
//   const [additionalImages, setAdditionalImages] = useState([]); // State for additional images
//   const [loading, setLoading] = useState(false);
//   const [propertyType, setPropertyType] = useState("");
//   const [beds, setBeds] = useState('');
//   const [baths ,setBath ] = useState('')
//   const [countries, setCountries] = useState([]); 
//   const [states, setStates] = useState([]);
  
//   const [selectedLga, setSelectedLga] = useState('');

 
// useEffect(() => {
//   const fetchCountries = async () => {
//     try {
//       const response = await fetch("https://countriesnow.space/api/v0.1/countries");
//       if (!response.ok) {
//         throw new Error("Failed to fetch countries");
//       }
      
//       const result = await response.json(); // Parse the response
//       setCountries(result.data)
//       console.log("Full API Response:", result); // Log the entire API response
      
//       // If result has a `data` field, log it separately
//       if (result.data) {
//         console.log("Data Field:", result.data);
//       }
//     } catch (error) {
//       console.error("Error fetching countries:", error); // Log any errors
//     }
//   };

//   fetchCountries();
// }, []);

  



//  async function fetchStates(country) {
//   const apiUrl = `https://countriesnow.space/api/v0.1/countries/states?country=${encodeURIComponent(country)}`;

//   try {
//     const response = await fetch(apiUrl);
//     if (response.ok) {
//       const result = await response.json();
//       return extractStatesFromResult(result, country);
//     } else {
//       throw new Error(`Error fetching states for ${country}`);
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//     toast.error(`Failed to fetch states for ${country}. Please try again.`);
//     return [];
//   }
// }

// function extractStatesFromResult(result, country) {
//   if (!result || !result.data) {
//     return [];
//   }

//   const states = result.data.filter((item) => item.iso2 === country);
//   if (states.length > 0) {
//     return states[0].states.map((state) => state.name);
//   } else {
//     return [];
//   }
// }

// const fetchLgas = async (stateName) => {
//   // setLoadingLgas(true); // Start loader
//   try {
//     const response = await fetch('https://countriesnow.space/api/v1/states/lga', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ state: stateName }),
//     });

//     const data = await response.json();
//       console.log(data)
//     if (data.error || !data.data) {
//       // toast.error('Failed to fetch LGAs. Please try again.');
//       setLga([]);
//     } else {
//       setLga("lga",data.data); // Update LGAs
//     }
//   } catch (error) {
//     console.error('Error fetching LGAs:', error);
//     toast.error('An error occurred while fetching LGAs.');
//   } finally {
//     // setLoadingLgas(false); // End loader
//   }
// };



// const handleCountryChange = async (event) => {
//   const selectedCountry = event.target.value;
//   setCountry(selectedCountry);

//   if (selectedCountry) {
//     try {
//       const fetchedStates = await fetchStates(selectedCountry);
//       if (fetchedStates.length === 0) {
//         toast.error(`Failed to fetch states for ${selectedCountry}. Please try again.`);
//       } else {
//         setStates(fetchedStates);
//         console.log("fetchedStates",fetchedStates)
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error);
//       toast.error(`Failed to fetch states for ${selectedCountry}. Please try again.`);
//     }
//   } else {
//     setStates([]); // Clear states if no country is selected
//   }
// };




// const handleStateChange = (event) => {
//   const selectedState = event.target.value;
//   if (selectedState) {
//     setState(selectedState);
//   } else {
//     console.error("Invalid state selected");
//   }

//   fetchLgas(selectedState);
// };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true); // Start loading
    

//     if (
//       country !== "" &&
//       state !== "" &&
//       lga !== "" &&
//       location !== "" &&
//       price !== "" &&
//       (land === "land" || (beds !== "" && baths !== "")) &&
//       land !== "" &&
//       details !== "" &&
//       mainImage !== null
//       && propertyType !== "" 
//     ) {
//       try {
//         let mainImageUrl = "";

//         if (mainImage) {
//           const storageRef = ref(storage, `images/${mainImage.name}`);
//           const uploadTask = uploadBytesResumable(storageRef, mainImage);

//           await new Promise((resolve, reject) => {
//             uploadTask.on(
//               "state_changed",
//               (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log("Upload is " + progress + "% done");
//               },
//               (error) => {
//                 console.error("Main image upload failed:", error);
//                 reject(error);
//               },
//               async () => {
//                 mainImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
//                 resolve();
//               }
//             );
//           });
//         }
        
//         const additionalImageUrls = [];
//         for (const image of additionalImages) {
//           const storageRef = ref(storage, `properties/additionalImages/${image.name}`);
//           const uploadTask = uploadBytesResumable(storageRef, image);

//           await new Promise((resolve, reject) => {
//             uploadTask.on(
//               "state_changed",
//               (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log("Upload is " + progress + "% done");
//               },
//               (error) => {
//                 console.error("Additional image upload failed:", error);
//                 reject(error);
//               },
//               async () => {
//                 const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
//                 additionalImageUrls.push(imageUrl);
//                 resolve();
//               }
//             );
//           });
//         }

//         const userId = auth.currentUser.uid;

//         const data = {
//           country,
//           state,
//           lga,
//           location,
//           price,
//           description,
//           land,
//           details,
//           mainImageUrl,
//           additionalImageUrls,
//           propertyType,
//           beds,
//           baths,
//           sold: false,
//           user_id: userId,
//           createdAt: new Date(),
//         };

//         const refr = collection(db, "properties");
//         // await addDoc(refr, data);
//         const docRef = await addDoc(refr, data);
//         const propertyId = docRef.id;
//         await updateDoc(docRef, { propertid: propertyId });
//         toast.success('Property successfully added!', { position: 'top-center' });
//         if (propertyType === 'buy') {
//           const buyRef = collection(db, "buy");
//           await addDoc(buyRef, data);
//         } else if (propertyType === 'rent') {
//           const rentRef = collection(db, "rent");
//           await addDoc(rentRef, data);
//         }

//         setCountry("");
//         setState("");
//         setLga("");
//         setLocation("");
//         setPrice("");
//         setDescription("");
//         setLand("");
//         setDetails("");
//         setMainImage(null);
//         setAdditionalImages([]);
//         setBath('');
//         setBeds('')
//       } catch (e) {
//         console.error("Error adding property: ", e);
//       } finally {
//         setLoading(false); // Stop loading once the operation is complete
//       }
//     } else {
//       console.error('All fields including the images must be filled out');
//       toast.error('All fields including the images must be filled out!', { position: 'top-center' });

//       setLoading(false); // Stop loading in case of validation failure
//     }
//   };

//   const handleAddImage = () => {
//     setAdditionalImages([...additionalImages, null]);
//   };

//   const handleImageChange = (index, event) => {
//     const files = [...additionalImages];
//     files[index] = event.target.files[0];
//     setAdditionalImages(files);
//   };

//   const handleDeleteImage = (index) => {
//     const updatedImages = additionalImages.filter((_, i) => i !== index);
//     setAdditionalImages(updatedImages);
//   };

//   return (
//     <>
//       <ProSetNot />
//       <div className={classes.container}>
//         {loading && (
//           <div className={classes.loadingmodal}>
//             <div className={classes.loadingspinner}></div>
//             <p>Loading...</p>
//           </div>
//         )}
        
//         <div className="row">
//           <form  onSubmit={handleSubmit}>
//        <div className={classes.form}>

          

//        <div>
//               <label htmlFor="country">Country</label>
             


// <select
//   id="country"
//   name="country"
//   value={country}
//   onChange={handleCountryChange}
  
// >
//   <option value="">Select a Country</option>
//   {countries.map((c) => (
//     <option key={c.iso2} value={c.iso2}>
//       {c.country}
//     </option>
//   ))}
// </select>

//             </div>

//             <div>
//               <label htmlFor="state">State</label>
//               <select
//   id="state"
//   name="state"
//   value={state}
//   onChange={handleStateChange}
//   disabled={!states.length}
// >
//   <option value="">Select a State</option>
//   {console.log("States array:", states)}
//   {states.map((state, index) => (
//     <option key={index} value={state}>
//       {console.log("Rendering option:", state)}
//       {state}
//     </option>
//   ))}
// </select>
//             </div>

//             <div>
//               <label htmlFor="lga">LGA</label>
//               {/* <input
//                 type="text"
//                 name="lga"
//                 value={lga}
//                 onChange={(event) => setLga(event.target.value)}
//               /> */}

// <select
//   value={selectedLga}
//   onChange={(e) => setSelectedLga(e.target.value)}
//   disabled={!lga.length } // Disable dropdown if no LGAs or loading
// >
//   <option value="">Select LGA</option>
//   {lga.map((lg, index) => (
//     <option key={index} value={lga}>
//       {lg}
//     </option>
//   ))}
// </select>
//             </div>

//             <div>
//               <label htmlFor="location">Address</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={location}
//                 onChange={(event) => setLocation(event.target.value)}
//               />
//             </div>

//             <div>
//               <label htmlFor="land">Land / House</label>
//               <select
//                 name="land"
//                 value={land}
//                 onChange={(event) => setLand(event.target.value)}
//               >
//                 <option value="">Select Property type</option>
//                 <option value="house">House</option>
//                 <option value="land">Land</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

             
//             <div>
//               <label htmlFor="propertyType">Property Type</label>
//               <select
//                 name="propertyType"
//                 value={propertyType}
//                 onChange={(event) => setPropertyType(event.target.value)}
//               >
//                 <option value="">Select Type</option>
//                 <option value="buy">Buy</option>
//                 <option value="rent">Rent</option>
//               </select>
//             </div>
               
//             <div>
//               <label htmlFor="price">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={price}
//                 onChange={(event) => setPrice(Number(event.target.value))}
//                 min="0"
//                 max="10000"
//               />
//             </div>

//             <div>
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={description}
//                 onChange={(event) => setDescription(event.target.value)}
//               />
//             </div>

             
          
            
            
//              {land !== "land" && (
//   <>
//     <div>
//       <label htmlFor="baths">No: of Bathroom</label>
//       <input
//         type="number"
//         name="bathroom"
//         value={baths}
//         onChange={(event) => setBath(event.target.value)}
//       />
//     </div>

//     <div>
//       <label htmlFor="beds">No: of Bedroom</label>
//       <input
//         type="number"
//         name="bedroom"
//         value={beds}
//         onChange={(event) => setBeds(event.target.value)}
//       />
//     </div>
//   </>
// )}
          

//             <div>
//               <label htmlFor="mainImage">Main Property Image</label>
//               <input
//                 type="file"
//                 name="mainImage"
//                 onChange={(e) => setMainImage(e.target.files[0])}
//               />
//             </div>

//             <div className="newimage">
//               <label htmlFor="additionalImages">Additional Property Images</label>
//               <button type="button" onClick={handleAddImage}>Add Image</button>
//               {additionalImages.map((image, index) => (
//                 <div key={index} className={classes.addnew}>
//                   <input
//                     type="file"
//                     name={`additionalImage-${index}`}
//                     onChange={(e) => handleImageChange(index, e)}
//                   />
//                   <button
//                     type="button"
//                     className={classes.deletebutton}
//                     onClick={() => handleDeleteImage(index)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>


//             <div>
//               <label htmlFor="details">Details</label>
//               <textarea
//                 value={details}
//                 onChange={(event) => setDetails(event.target.value)}
//               ></textarea>
//             </div>

            
//        </div>

//                 <div className={classes.submitbutton}>
//                 <button  type="submit" onClick={handleSubmit}>
//               Submit
//             </button>
//                 </div>

          
//           </form>
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// }

// export default Addproperty;





import React, { useEffect, useState } from 'react';
import { storage, db, auth } from './config';
import classes from './addproperty.module.css';
import { collection, addDoc , updateDoc } from '@firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProSetNot from '../ProSetNot/ProSetNot';

function Addproperty() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState([]);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [land, setLand] = useState("");
  const [details, setDetails] = useState("");
  const [mainImage, setMainImage] = useState(null); // State for main image
  const [additionalImages, setAdditionalImages] = useState([]); // State for additional images
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [beds, setBeds] = useState('');
  const [baths ,setBath ] = useState('')
  const [countries, setCountries] = useState([]); 
  const [states, setStates] = useState([]);
  
  const [selectedLga, setSelectedLga] = useState('');

 
useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries");
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      
      const result = await response.json(); // Parse the response
      setCountries(result.data)
      console.log("Full API Response:", result); // Log the entire API response
      
      // If result has a `data` field, log it separately
      if (result.data) {
        console.log("Data Field:", result.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error); // Log any errors
    }
  };

  fetchCountries();
}, []);

  



 async function fetchStates(country) {
  const apiUrl = `https://countriesnow.space/api/v0.1/countries/states?country=${encodeURIComponent(country)}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const result = await response.json();
      return extractStatesFromResult(result, country);
    } else {
      throw new Error(`Error fetching states for ${country}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    toast.error(`Failed to fetch states for ${country}. Please try again.`);
    return [];
  }
}

function extractStatesFromResult(result, country) {
  if (!result || !result.data) {
    return [];
  }

  const states = result.data.filter((item) => item.iso2 === country);
  if (states.length > 0) {
    return states[0].states.map((state) => state.name);
  } else {
    return [];
  }
}

// Helper function to get country name from country code
const getCountryNameFromCode = (countryCode) => {
  const selectedCountry = countries.find(c => c.iso2 === countryCode);
  return selectedCountry ? selectedCountry.country : '';
};

const fetchLgas = async (stateName, countryCode) => {
  try {
    const countryName = getCountryNameFromCode(countryCode);
    
    // Primary API: Fetch cities/LGAs for the selected country and state
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        country: countryName,
        state: stateName 
      }),
    });

    const data = await response.json();
    console.log('LGA API Response:', data);

    if (data.error === false && data.data && data.data.length > 0) {
      setLga(data.data); // Set the cities/LGAs
      console.log('LGAs fetched:', data.data);
    } else {
      // If no cities found, try alternative approach for some countries
      if (countryCode === 'NG') {
        // For Nigeria, try alternative Nigerian-specific API
        try {
          const nigeriaResponse = await fetch('https://nga-states-lga.onrender.com/fetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: stateName }),
          });

          if (nigeriaResponse.ok) {
            const nigeriaData = await nigeriaResponse.json();
            if (nigeriaData && nigeriaData.length > 0) {
              setLga(nigeriaData);
              console.log('Nigerian LGAs fetched:', nigeriaData);
              return;
            }
          }
        } catch (nigeriaError) {
          console.log('Nigerian API failed:', nigeriaError);
        }
      }
      
      // If no LGAs/cities found
      setLga([]);
      toast.info(`No cities/LGAs found for ${stateName}, ${countryName}`);
    }
  } catch (error) {
    console.error('Error fetching LGAs:', error);
    toast.error('An error occurred while fetching cities/LGAs.');
    setLga([]);
  }
};

const handleCountryChange = async (event) => {
  const selectedCountry = event.target.value;
  setCountry(selectedCountry);
  setState(""); // Reset state when country changes
  setSelectedLga(""); // Reset LGA when country changes
  setLga([]); // Clear LGAs

  if (selectedCountry) {
    try {
      const fetchedStates = await fetchStates(selectedCountry);
      if (fetchedStates.length === 0) {
        toast.error(`Failed to fetch states for ${selectedCountry}. Please try again.`);
      } else {
        setStates(fetchedStates);
        console.log("fetchedStates",fetchedStates)
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error(`Failed to fetch states for ${selectedCountry}. Please try again.`);
    }
  } else {
    setStates([]); // Clear states if no country is selected
  }
};

const handleStateChange = (event) => {
  const selectedState = event.target.value;
  if (selectedState) {
    setState(selectedState);
    setSelectedLga(''); // Reset LGA selection when state changes
    fetchLgas(selectedState, country); // Pass both state and country code
  } else {
    console.error("Invalid state selected");
    setLga([]);
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    

    if (
      country !== "" &&
      state !== "" &&
      selectedLga !== "" &&
      location !== "" &&
      price !== "" &&
      (land === "land" || (beds !== "" && baths !== "")) &&
      land !== "" &&
      details !== "" &&
      mainImage !== null
      && propertyType !== "" 
    ) {
      try {
        let mainImageUrl = "";

        if (mainImage) {
          const storageRef = ref(storage, `images/${mainImage.name}`);
          const uploadTask = uploadBytesResumable(storageRef, mainImage);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
              },
              (error) => {
                console.error("Main image upload failed:", error);
                reject(error);
              },
              async () => {
                mainImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve();
              }
            );
          });
        }
        
        const additionalImageUrls = [];
        for (const image of additionalImages) {
          const storageRef = ref(storage, `properties/additionalImages/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
              },
              (error) => {
                console.error("Additional image upload failed:", error);
                reject(error);
              },
              async () => {
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                additionalImageUrls.push(imageUrl);
                resolve();
              }
            );
          });
        }

        const userId = auth.currentUser.uid;

        const data = {
          country,
          state,
          lga: selectedLga, // Use selectedLga instead of lga array
          location,
          price,
          description,
          land,
          details,
          mainImageUrl,
          additionalImageUrls,
          propertyType,
          beds,
          baths,
          sold: false,
          user_id: userId,
          createdAt: new Date(),
        };

        const refr = collection(db, "properties");
        // await addDoc(refr, data);
        const docRef = await addDoc(refr, data);
        const propertyId = docRef.id;
        await updateDoc(docRef, { propertid: propertyId });
        toast.success('Property successfully added!', { position: 'top-center' });
        if (propertyType === 'buy') {
          const buyRef = collection(db, "buy");
          await addDoc(buyRef, data);
        } else if (propertyType === 'rent') {
          const rentRef = collection(db, "rent");
          await addDoc(rentRef, data);
        }

        setCountry("");
        setState("");
        setLga([]);
        setSelectedLga("");
        setLocation("");
        setPrice("");
        setDescription("");
        setLand("");
        setDetails("");
        setMainImage(null);
        setAdditionalImages([]);
        setBath('');
        setBeds('')
      } catch (e) {
        console.error("Error adding property: ", e);
      } finally {
        setLoading(false); // Stop loading once the operation is complete
      }
    } else {
      console.error('All fields including the images must be filled out');
      toast.error('All fields including the images must be filled out!', { position: 'top-center' });

      setLoading(false); // Stop loading in case of validation failure
    }
  };

  const handleAddImage = () => {
    setAdditionalImages([...additionalImages, null]);
  };

  const handleImageChange = (index, event) => {
    const files = [...additionalImages];
    files[index] = event.target.files[0];
    setAdditionalImages(files);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(updatedImages);
  };

  return (
    <>
      <ProSetNot />
      <div className={classes.container}>
        {loading && (
          <div className={classes.loadingmodal}>
            <div className={classes.loadingspinner}></div>
            <p>Loading...</p>
          </div>
        )}
        
        <div className="row">
          <form  onSubmit={handleSubmit}>
       <div className={classes.form}>

          

       <div>
              <label htmlFor="country">Country</label>
             


<select
  id="country"
  name="country"
  value={country}
  onChange={handleCountryChange}
  
>
  <option value="">Select a Country</option>
  {countries.map((c) => (
    <option key={c.iso2} value={c.iso2}>
      {c.country}
    </option>
  ))}
</select>

            </div>

            <div>
              <label htmlFor="state">State</label>
              <select
  id="state"
  name="state"
  value={state}
  onChange={handleStateChange}
  disabled={!states.length}
>
  <option value="">Select a State</option>
  {console.log("States array:", states)}
  {states.map((state, index) => (
    <option key={index} value={state}>
      {console.log("Rendering option:", state)}
      {state}
    </option>
  ))}
</select>
            </div>

            <div>
              <label htmlFor="lga">LGA/City</label>
              <select
                value={selectedLga}
                onChange={(e) => setSelectedLga(e.target.value)}
                disabled={!lga.length}
              >
                <option value="">Select LGA/City</option>
                {lga.map((lg, index) => (
                  <option key={index} value={lg}>
                    {lg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location">Address</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="land">Land / House</label>
              <select
                name="land"
                value={land}
                onChange={(event) => setLand(event.target.value)}
              >
                <option value="">Select Property type</option>
                <option value="house">House</option>
                <option value="land">Land</option>
                <option value="other">Other</option>
              </select>
            </div>

             
            <div>
              <label htmlFor="propertyType">Property Type</label>
              <select
                name="propertyType"
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
              >
                <option value="">Select Type</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
               
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                min="0"
                max="10000"
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

             
          
            
            
             {land !== "land" && (
  <>
    <div>
      <label htmlFor="baths">No: of Bathroom</label>
      <input
        type="number"
        name="bathroom"
        value={baths}
        onChange={(event) => setBath(event.target.value)}
      />
    </div>

    <div>
      <label htmlFor="beds">No: of Bedroom</label>
      <input
        type="number"
        name="bedroom"
        value={beds}
        onChange={(event) => setBeds(event.target.value)}
      />
    </div>
  </>
)}
          

            <div>
              <label htmlFor="mainImage">Main Property Image</label>
              <input
                type="file"
                name="mainImage"
                onChange={(e) => setMainImage(e.target.files[0])}
              />
            </div>

            <div className="newimage">
              <label htmlFor="additionalImages">Additional Property Images</label>
              <button type="button" onClick={handleAddImage}>Add Image</button>
              {additionalImages.map((image, index) => (
                <div key={index} className={classes.addnew}>
                  <input
                    type="file"
                    name={`additionalImage-${index}`}
                    onChange={(e) => handleImageChange(index, e)}
                  />
                  <button
                    type="button"
                    className={classes.deletebutton}
                    onClick={() => handleDeleteImage(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>


            <div>
              <label htmlFor="details">Details</label>
              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              ></textarea>
            </div>

            
       </div>

                <div className={classes.submitbutton}>
                <button  type="submit" onClick={handleSubmit}>
              Submit
            </button>
                </div>

          
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Addproperty;