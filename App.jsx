import React, { useState, useEffect } from 'react'; 
import DOMPurify from 'dompurify'; 
import './Form.css'; 
 
const Form = () => { 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' }); 
  const [errors, setErrors] = useState({}); 
  const [showPassword, setShowPassword] = useState(false); 
 
  // Sanitize input 
  const sanitize = (value) => DOMPurify.sanitize(value.trim()); 
 
  // Handle input changes 
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData((prev) => ({ ...prev, [name]: sanitize(value) })); 
  }; 
 
  // Validate form whenever formData changes 
  useEffect(() => { 
    const newErrors = {}; 
    const emailRule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
    const passwordRules = /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/; 
 
    if (!formData.name) newErrors.name = 'Name is required.'; 
    if (!emailRule.test(formData.email)) newErrors.email = 'Invalid email.'; 
    if (!formData.password) { 
      newErrors.password = 'Password is required.'; 
    } else if (formData.password.length < 6 || !passwordRules.test(formData.password)) { 
      newErrors.password = 'Min 6 chars, 1 uppercase, 1 number, 1 special char.'; 
    } 
 
    setErrors(newErrors); 
  }, [formData]); 
 
  // Handle form submission 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (Object.keys(errors).length === 0) { 
      console.log('Submitted:', formData); 
      setFormData({ name: '', email: '', password: '' }); 
    } 
  }; 
 
  return ( 
    <div className="form-container"> 
      <h2 className="form-title">Registration</h2> 
      <form onSubmit={handleSubmit} className="form"> 
        {/* Loop through name, email, password fields */} 
        {['name', 'email', 'password'].map((field) => ( 
          <div className="form-group" key={field}> 
            <label className="form-label">{field[0].toUpperCase() + field.slice(1)}</label> 
            <input 
              type={field === 'password' && !showPassword ? 'password' : 'text'} 
              name={field} 
              value={formData[field]} 
              onChange={handleChange} 
              placeholder={`Enter ${field}`} 
              className={`form-input ${errors[field] ? 'error' : ''}`} 
            /> 
            {errors[field] && <div className="error-message">{errors[field]}</div>} 
          </div> 
        ))} 
 
        {/* Show Password Checkbox */} 
        <div className="password-toggle"> 
          <label> 
            <input 
              type="checkbox" 
              checked={showPassword} 
              onChange={() => setShowPassword(!showPassword)} 
            /> 
            Show Password 
          </label> 
        </div> 
 
        {/* Submit Button */} 
        <button className="form-submit" disabled={Object.keys(errors).length > 0}> 
          Submit 
        </button> 
      </form> 
    </div> 
  ); 
}; 
 
export default Form;