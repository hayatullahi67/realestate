
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './propertycards.css';
import { Link } from 'react-router-dom';

function PropertyCard({ property, onDelete, onEdit ,onSold }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(property);
  const [newImage, setNewImage] = useState(null); // To handle new image
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [showButtons, setShowButtons] = useState(false); 
  const [showSold , setShowSold] = useState(false); 
  const navigate = useNavigate();

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]); // Save the new image file
    }
  };

  const handleEditSubmit = () => {
    const updatedData = { ...editData };
    if (newImage) {
      // Handle image upload logic here
      updatedData.mainImageUrl = URL.createObjectURL(newImage); // For demonstration
    }else{
      updatedData.mainImageUrl = property.mainImageUrl
    }
    onEdit(updatedData);
    setIsEditing(false);
    setHoverEnabled(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setHoverEnabled(false);
  };

  const handleSoldClick = () => {
    onSold(property.id);
    setShowSold(true)
  };
  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className={`property-card ${hoverEnabled ? 'hover-enabled' : ''}`}>
      <div className='d-flex'>
        <div className='col1' style={{ padding: '10px' }}>
          <img src={property.mainImageUrl} alt="Property" className='property-img' />
        </div>
        <div className='col2'>
          <p><b>Price:</b> {property.price}₦</p>
          <p><b>Address:</b> {property.location}</p>
          <p><b>Description:</b> {property.description}</p>
          <p><b>Country:</b> {property.country}</p>
          <p><b>State:</b> {property.state}</p>
        </div>
      </div>
      {property.sold && (
  <div>Property Sold</div>
       )}

      <div className='actionContainer'>
        <button className='actionButton' onClick={toggleButtons}><i class="fa-solid fa-ellipsis-vertical"></i></button>
      </div>
     
      {showButtons && (
        <div className='buttonContainer'>
          <button className='editButton' onClick={handleEditClick}>Edit</button>
          <button className='deleteButton' onClick={() => onDelete(property.id)}>Delete</button>
          <Link to={`/view-details/${property.id}`}>
            <button className='viewButton'>View</button>
          </Link>
          <button onClick={handleSoldClick} className="soldButton"> Sold</button>
        </div>
      )}

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content full-screen">
            <div className="edit-form">
              <div>
              <label htmlFor="price">Edit Price</label>
              <input
                type="text"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="edit-input"
              />
              </div>
              <div>
               <label htmlFor="Location">Edit Location</label>
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                placeholder="Location"
                className="edit-input"
              />
              </div>
               
              <div>
                <label htmlFor='description'>Edit Description</label>
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="edit-input"
              />
              </div>
              
              <div>
                <label htmlFor="country">Edit Country</label>
              <input
                type="text"
                name="country"
                value={editData.country}
                onChange={handleEditChange}
                placeholder="Country"
                className="edit-input"
              />
              </div>
             
              <div>
                <label htmlFor='state'> Edit State</label>
              <input
                type="text"
                name="state"
                value={editData.state}
                onChange={handleEditChange}
                placeholder="State"
                className="edit-input"
              />
              </div>
              <div>
                <label htmlFor='file'>Edit Property Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="edit-input"
              />
              </div>
             
              <div className="edit-buttons">
                <button onClick={handleEditSubmit} className="save-button">Save</button>
                <button onClick={() => { setIsEditing(false); setHoverEnabled(true); }} className="cancel-button">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;


