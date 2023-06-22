import { signUpSchema } from "../../Validation/userVal";
import editIcon from "../../assests/P.png";
import deleteIcon from "../../assests/trash.png";
import defaultProfileImg from "../../assests/user.png"; // Import the default profile image
import React, { useState, useEffect } from "react";
import "./form.css";
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          firstName: "",
          employeeId: "",
          middleName: "",
          lastName: "",
          designation: "",
          contactNumber: "",
          email: "",
          companyEmail: "",
          workMode: "",
          profileImg: "",
        };
  });
  const [formEntries, setFormEntries] = useState(() => {
    const storedEntries = localStorage.getItem("formEntries");
    return storedEntries ? JSON.parse(storedEntries) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  // const [data, setData] = useState([]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("formEntries", JSON.stringify(formEntries));
  }, [formEntries]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/');
      setFormEntries(response.data);
    } catch (error) {
      console.log('Error in fetching data:', error);
    }
  };
  
  useEffect(() => {
  fetchData();
  }, []);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const performValidation = async () => {
    try {
      await signUpSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });

      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const isValid = await performValidation();
    if (isValid) {
      const isUserExists = formEntries.some(
        (entry, index) =>
          entry.employeeId === formData.employeeId && index !== editIndex
      );
  
      if (isUserExists) {
        alert("User already exists!");
        return;
      }
  
      if (editIndex !== null) {
        // Update existing entry
        try {
          const employee_id = formEntries[editIndex].employeeId;
          const response = await axios.put(`http://localhost:3001/user/${employee_id}`, formData);
          // console.log(response);
          
          setFormEntries((prevEntries) => {
            const updatedEntries = [...prevEntries];
            updatedEntries[editIndex] = response.data;
            return updatedEntries;
            // console.log(response.data);

          });
          setFormData({
            firstName: "",
            employeeId: "",
            middleName: "",
            lastName: "",
            designation: "",
            contactNumber: "",
            email: "",
            companyEmail: "",
            workMode: "",
            profileImg: "",
          });
          setEditIndex(null);
          // history.push('/'); // Redirect to the homepage after successful update
        } catch (error) {
          console.log('Error in updating entry:', error);
        }
      } else {
        // Add new entry
        try {
          const response = await axios.post('http://localhost:3001/user/', formData);
          setFormEntries((prevEntries) => [...prevEntries, response.data]);
          setFormData({
            firstName: "",
            employeeId: "",
            middleName: "",
            lastName: "",
            designation: "",
            contactNumber: "",
            email: "",
            companyEmail: "",
            workMode: "",
            profileImg: "",
          });
        } catch (error) {
          console.log('Error in adding new entry:', error);
        }
      }
    }
  };
  
  
  const handleEdit = (employee_id) => {
    const entryIndex = formEntries.findIndex((entry) => entry.employeeId === employee_id);
    console.log(entryIndex);
    if (entryIndex !== -1) {
      const entryToEdit = formEntries[entryIndex];
      setFormData(entryToEdit);
      setEditIndex(entryIndex);
    }
  };

  
  const handleDelete = async (employee_id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/user/${employee_id}`);
      console.log(response);
      if (response.status === 200) {
        setFormEntries((prevEntries) => {
          const updatedEntries = [...prevEntries];
          updatedEntries.splice(employee_id, 1);
          
          return updatedEntries;
          
        });
      }
      window.location.reload();
    } catch (error) {
      console.log('Error in deleting entry:', error);
    }

    if (editIndex === employee_id) {
      setFormData((prevState) => ({
        ...prevState,
        firstName: "",
        employeeId: "",
        middleName: "",
        lastName: "",
        designation: "",
        contactNumber: "",
        email: "",
        companyEmail: "",
        workMode: "",
        profileImg: "",
      }));
    }
  };

  const handleNew = () => {
    setFormData((prevState) => ({
      ...prevState,
      firstName: "",
      employeeId: "",
      middleName: "",
      lastName: "",
      designation: "",
      contactNumber: "",
      email: "",
      companyEmail: "",
      workMode: "",
      profileImg: "", // Add the profileImg field
    }));
    setEditIndex(null);
  };

  const handleToggleText = (event) => {
    event.currentTarget.classList.toggle("active");
  };

  const getWorkModeClass = (workMode) => {
    switch (workMode) {
      case "workFromHome":
        return "work-from-home";
      case "workFromOffice":
        return "work-from-office";
      case "onLeave":
        return "on-leave";
      default:
        return "";
    }
  };


  
  return (
    <div className="box">
      <h1>Employee Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="data">
          <label htmlFor="employeeId">
            Employee ID:<span className="req">*</span>
          </label>
          <input
            className="left-shift"
            type="number"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            onBlur={() =>
              setTouched((prevState) => ({ ...prevState, employeeId: true }))
            }
          />
          {errors.employeeId && touched.employeeId ? (
            <p className="form-error">{errors.employeeId}</p>
          ) : null}
        </div>
        <div className="data">
          <label htmlFor="firstName">
            First Name:<span className="req">*</span>
          </label>
          <input
            className="left-shift"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={() =>
              setTouched((prevState) => ({ ...prevState, firstName: true }))
            }
          />
          {errors.firstName && touched.firstName ? (
            <p className="form-error">{errors.firstName}</p>
          ) : null}
        </div>
        <div className="data">
          <label htmlFor="middleName">Middle Name:</label>
          <input
            className="left-shift"
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>
        <div className="data">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="left-shift"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="data">
          <label htmlFor="designation">
            Designation:<span className="req">*</span>
          </label>
          <input
            className="left-shift"
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            onBlur={() =>
              setTouched((prevState) => ({ ...prevState, designation: true }))
            }
          />
          {errors.designation && touched.designation ? (
            <p className="form-error">{errors.designation}</p>
          ) : null}
        </div>
        <div className="data">
          <label htmlFor="contactNumber">
            Contact Number:<span className="req">*</span>
          </label>
          <input
            className="left-shift"
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            onBlur={() =>
              setTouched((prevState) => ({ ...prevState, contactNumber: true }))
            }
          />
          {errors.contactNumber && touched.contactNumber ? (
            <p className="form-error">{errors.contactNumber}</p>
          ) : null}
        </div>
        <div className="data">
          <label htmlFor="email">
            Email ID:<span className="req">*</span>
          </label>
          <input
            className="left-shift"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() =>
              setTouched((prevState) => ({ ...prevState, email: true }))
            }
          />
          {errors.email && touched.email ? (
            <p className="form-error">{errors.email}</p>
          ) : null}
        </div>
        <div className="data">
          <label htmlFor="companyEmail">
            Company Email ID:<span className="req">*</span>
          </label>
          <input
            className="left-shift"
            type="email"
            id="companyEmail"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            onBlur={() =>
              setTouched((prevState) => ({ ...prevState, companyEmail: true }))
            }
          />
          {errors.companyEmail && touched.companyEmail ? (
            <p className="form-error">{errors.companyEmail}</p>
          ) : null}
        </div>

        <div className="data">
          <label htmlFor="profileImg">Profile Image URL:</label>
          <input
            className="left-shift"
            type="text"
            id="profileImg"
            name="profileImg"
            value={formData.profileImg}
            onChange={handleChange}
          />
        </div>

        <div className="data">
          <label htmlFor="workMode">
            Work Mode:<span className="req">*</span>
          </label>
          <select
            className="left-shift"
            id="workMode"
            name="workMode"
            value={formData.workMode}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="workFromOffice">
              <img
                className="w_icon"
                src={require("../../assests/WFO.png")}
                alt=""
              />
              Work from Office
            </option>
            <option value="onLeave">
              <img
                className="w_icon"
                src={require("../../assests/OL.png")}
                alt=""
              />
              On Leave
            </option>
            <option value="workFromHome">
              <img
                className="w_icon"
                src={require("../../assests/WFH.png")}
                alt=""
              />
              Work from Home
            </option>
          </select>
        </div>

        <button className="btn sbtn" type="submit">
          {editIndex !== null ? "Update" : "Submit"}
        </button>
        <button className="sbtn" type="button" onClick={handleNew}>
          New
        </button>
      </form>
      <div className="bar">
        <h2 className="entries">Form Entries</h2>
        {formEntries.length > 0 ? (
          <table className="entries-table">
            <thead>
              {/* <tr>
    <th>Index</th>
    <th>Employee ID</th>
    <th>First Name</th>
    <th>Middle Name</th>
    <th>Last Name</th>
    <th>Designation</th>
    <th>Contact Number</th>
    <th>Email</th>
    <th>Company Email</th>
    <th>Work Mode</th>
    <th>Action</th>
  </tr> */}
            </thead>
            <tbody className="e-card">
              {formEntries.map((entry, index) => (
                <div key={index} className="entry-card">
                  <div
                    className={`status-dot ${
                      entry.workMode === "onLeave" ? "red" : "green"
                    }`}
                  ></div>
                  <p className=" e-i">
                    <strong>#</strong>
                    {entry.employeeId}
                  </p>
                  <div className="entry-card-header">
                    <div className="entry-card-icons">
                      <img
                        src={editIcon}
                        alt="Edit"
                        className="icon"
                        onClick={() => handleEdit(entry.employeeId)}
                      />
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="icon"
                        onClick={() => handleDelete(entry.employeeId)}
                      />
                    </div>
                  </div>

                  <div className="entry-card-content">
                    <img
                      src={entry.profileImg || defaultProfileImg}
                      alt="Profile"
                      className="profile-img"
                    />
                    <div className="circle">
                      {entry.workMode === "workFromHome" ||
                      entry.workMode === "workFromOffice" ? (
                        <div className={`outer-ring outer-ring-green`}></div>
                      ) : (
                        <div className={`outer-ring outer-ring-red`}></div>
                      )}
                    </div>

                    <div className="card-txt">
                      <h3 className=" c-n">
                        {entry.firstName} {entry.middleName} {entry.lastName}
                      </h3>
                      <p className=" c-d">{entry.designation}</p>
                      <p className={`c-w ${getWorkModeClass(entry.workMode)}`}>
                        {entry.workMode}
                      </p>
                    </div>
                    <div className="card-lg">
                      <p className="ecard e-m" onClick={handleToggleText}>
                        <img
                          className="img_icon"
                          src={require("../../assests/EM.png")}
                          alt=""
                        />
                        <span>{entry.email}</span>
                      </p>
                      <p className="ecard c-m" onClick={handleToggleText}>
                        <img
                          className="img_icon"
                          src={require("../../assests/CEM.png")}
                          alt=""
                        />
                        <span>{entry.companyEmail}</span>
                      </p>
                      <p className="ecard c-c" onClick={handleToggleText}>
                        <img
                          className="img_icon"
                          src={require("../../assests/CALL.png")}
                          alt=""
                        />
                        <span>{entry.contactNumber}</span>
                      </p>
                    </div>

                    
                  </div>
                </div>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Form;
