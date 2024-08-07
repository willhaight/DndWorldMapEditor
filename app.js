// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn4VF9q_ALn5nGHoL9BW3HRir1YeUrtco",
    authDomain: "dungeonapp-3f80a.firebaseapp.com",
    projectId: "dungeonapp-3f80a",
    storageBucket: "dungeonapp-3f80a.appspot.com",
    messagingSenderId: "532180053044",
    appId: "1:532180053044:web:8bf63c2be8f651010aee61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

console.log('Firestore and Storage initialized');

// Navbar handling
let navbar = document.getElementsByClassName('header')[0];

navbar.onclick = function () {
    // Toggle between 'expanded' and 'shrunk' classes
    if (navbar.classList.contains('expanded')) {
        navbar.classList.remove('expanded');
        navbar.classList.add('shrunk');
        navbar.children[1].style.display = 'none';
        navbar.children[2].style.display = 'none';
    } else {
        navbar.classList.remove('shrunk');
        navbar.classList.add('expanded');
        navbar.children[1].style.display = 'block';
        navbar.children[2].style.display = 'block';
    }
};

// Submission handling
let subButt = document.getElementById('upload');
subButt.onclick = async function () {
    let fileInput = document.getElementById('map');
    let file = fileInput.files[0]; // Get the selected file

    if (file) {
        console.log('File selected:', file.name);

        try {
            const storageRef = ref(storage, 'maps/' + file.name); // Create a reference to the file in Firebase Storage
            await uploadBytes(storageRef, file); // Upload the file

            const downloadURL = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
            console.log('File available at', downloadURL);

            alert('Upload Success');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        }
    } else {
        alert('Nothing Uploaded');
    }
};
