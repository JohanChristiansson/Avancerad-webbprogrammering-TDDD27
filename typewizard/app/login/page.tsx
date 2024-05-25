// import '../../app/globals.css';
// import axios from 'axios'
// export default function Home() {

//     const handleLoginButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault();
//         try {
//             // Retrieve the form element
//             const form = document.querySelector('form') as HTMLFormElement;

//             // Retrieve the input values
//             const username = form.elements.namedItem('username') as HTMLInputElement;
//             const password = form.elements.namedItem('password') as HTMLInputElement;

//             // Send the data to the server via a POST request
//             const response = await axios.post('/api/user/login', { userName: username.value, password: password.value })

//             if (response.status === 200) {
//                 console.log('Login successful');
//                 //cookieStore.set({ name: "user", value: username.value, httpOnly: false, path: '/' });
//                 localStorage.setItem("user", username.value);
//                 setUser(username.value)
//                 router.push('/profile');
//             } else if (response.status == 401) {
//                 console.error('invalid password');
//                 alert('wrong password.');
//             } else if (response.status == 404) {
//                 console.error('invalid user');
//                 alert('user does not exist.');
//             } else {
//                 alert("something went wrong")
//             }
//         } catch (error) {
//             // Catch any error that occurs during the fetch request

//             console.error('Fetch error:', error);
//             alert('There was an error connecting to the server');
//         }
//     };


//     // const handleRegisterButtonClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault();
//         try {
//             // Retrieve the form element
//             const form = document.querySelector('form') as HTMLFormElement;

//             // Retrieve the input values
//             const username = form.elements.namedItem('username') as HTMLInputElement;
//             const password = form.elements.namedItem('password') as HTMLInputElement;
//             console.log("Username input: ", username.value);
//             console.log("Password input: ", password.value);

//             var regex = /^(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)(?=.*[\W_]).{8,}$/;

//             if (!regex.test(password.value)) {
//                 alert("Minimum 8 characters.\n At least one lowercase letter.\n At least one uppercase letter.\n At least one digit.\n At least one special character.")
//             }

//             // Send the data to the server via a POST request
//             const response = await axios.post('/api/user/register', { userName: username.value, password: password.value })

//             if (response.status === 201) {
//                 console.log('Registerd successfully');
//                 //cookieStore.set({ name: "user", value: username.value, httpOnly: false, path: '/' });
//                 localStorage.setItem("user", username.value);
//                 setUser(username.value)
//                 router.push('/profile');
//             } else if (response.status == 409) {
//                 console.error('User does already exist');
//                 alert('user already exist');
//             } else if (response.status == 404) {
//                 console.error('invalid user');
//                 alert('user does not exist.');
//             } else {
//                 alert("something went wrong, this should not be printed ever")
//             }
//         } catch (error) {
//             // Catch any error that occurs during the fetch request
//             console.error('Fetch error:', error);
//             alert('There was an error connecting to the server. Contact Gustav.');
//         }
//     };

//     return (

//         <div className='loginContainer'>
//             <form>
//                 <input className='usernameBox' type="text" name="username" placeholder="Username"></input>
//                 <input className='passwordBox' type="password" name="password" placeholder="Password"></input>
//             </form>
//             <button className='loginBoxButton' onClick={handleLoginButtonClick}>Login</button>
//             <button className='registerBoxButton' onClick={handleRegisterButtonClick}>Register</button>
//         </div>

//     )
// }