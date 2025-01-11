import "./SignUtils/CSS/Sign.css";
import signupimage from "./SignUtils/images/signup-image.jpg";
import { Link } from 'react-router-dom';
import "./SignUtils/CSS/style.css.map";
import Nav_bar from "../Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../helper";

const stateCityMapping = {
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Roing"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Leh"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Bishnupur", "Thoubal", "Churachandpur", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Cherrapunji", "Jowai", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Mon"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Bikaner"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Ravangla"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Tripura": ["Agartala", "Udaipur", "Khowai","Dharmanagar", "Kailashahar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Asansol", "Durgapur"],
  };
  

export default function Signup() {
    
    const navigate = useNavigate();

    const signSuccess = () => toast.success("Voter Created Successfully \n Redirecting You To Login Page", {
        className: "toast-message",
    });
    const signFailed = (msg) => toast.error(`${msg}`, {
        className: "toast-message",
    });

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        city: '',
        state: '',
        dob: '',
        voterId: '',
        phone: '',
        image: null,
        imageUrl: '',
        email: '',
        pass: '',
        re_pass: ''
    });

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dob') {
            const age = calculateAge(value);
            setFormData({
                ...formData,
                [name]: value,
                age: age
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const cities = stateCityMapping[formData.state] || [];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file
        });

        // Create a URL for the image preview
        const imageUrl = URL.createObjectURL(file);
        setFormData((prevData) => ({
            ...prevData,
            imageUrl: imageUrl
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (formData.pass !== formData.re_pass) {
            alert('Passwords do not match');
            setLoading(false);
            return;
        }

        // Prepare FormData for image upload
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        console.log(formData.firstName)
        console.log(formData.image)
        try {
            const response = await axios.post(`${BASE_URL}/api/createVoter/register`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for handling file uploads
                }
            });

            if (response.data.success) {
                signSuccess();
                setTimeout(() => {
                    navigate('/Login');
                }, 2000)
            } else {
                signFailed("Invalid Details");
            }
        } catch (error) {
            console.error(error);
            signFailed(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Sign-Container">
            <Nav_bar />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Registration</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <ToastContainer />
                                <div className="form-group">
                                    <label for="firstName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Your First Name" required />
                                </div>
                                <div className="form-group">
                                    <label for="lastName"><i className="zmdi zmdi-account-box material-icons-name"></i></label>
                                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Your Last Name" required />
                                </div>
                                <div className="form-group">
                                    <label for="state"><i className="zmdi zmdi-map material-icons-name"></i></label>
                                    <select name="state" id="state" value={formData.state} onChange={handleChange} required>
                                        <option value="">Select Your State</option>
                                        {Object.keys(stateCityMapping).map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="city"><i className="zmdi zmdi-city material-icons-name"></i></label>
                                    <select name="city" id="city" value={formData.city} onChange={handleChange} required>
                                        <option value="">Select Your City</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="dob"><i className="zmdi zmdi-calendar-account material-icons-name"></i></label>
                                    <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} placeholder="Your Date of Birth" required />
                                </div>
                                <div className="form-group">
                                    <label for="voterid"><i className="zmdi zmdi-file-text material-icons-name"></i></label>
                                    <input type="number" name="voterId" id="voterid" value={formData.voterId} onChange={handleChange} placeholder="Your Voter ID" required />
                                </div>
                                <div className="form-group">
                                    <label for="phone"><i className="zmdi zmdi-local-phone material-icons-name"></i></label>
                                    <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" required />
                                </div>
                                <div className="form-group">
                                    <label for="image"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="file" name="image" id="image" onChange={handleFileChange} />
                                    {formData.imageUrl && <img src={formData.imageUrl} alt="Image Preview" style={{ width: '100px', height: '100px' }} />}
                                </div>
                                <div className="form-group">
                                    <label for="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
                                </div>
                                <div className="form-group">
                                    <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="pass" id="pass" value={formData.pass} onChange={handleChange} placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="re_pass" id="re_pass" value={formData.re_pass} onChange={handleChange} placeholder="Repeat your password" required />
                                </div>
                                <div className="form-group form-button">
                                    <button onClick={handleSubmit} disabled={loading}>
                                        {loading ? <div className="spinner"></div> : 'Register'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={signupimage} alt="sign up image" /></figure>
                            <Link to='/Login' className="signup-image-link">I am already member</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
