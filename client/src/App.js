
import './App.css';
import Form from './components/Form/form';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/footer';
import { userSchema } from "./Validation/userVal";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Form />
      <Footer />
    </div>
  );
}

export default App;


// function App() {
//   const createUser = async (event) => {
//   event.preventDefault();
//   let formData = {
//   name: event.target [0].value,
//   email: event.target [1].value,
//   password: event.target [2].value,
//   };
//   const isValid = await userSchema.isValid (formData);
//   console.log(isValid);
//   };