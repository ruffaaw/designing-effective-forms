import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    apiKey: "AIzaSyCTfRBhw3xX8GzGSwPeMEtaOakTjOM9dV0",
    authDomain: "tpf-rc.firebaseapp.com",
    projectId: "tpf-rc",
    storageBucket: "tpf-rc.appspot.com",
    messagingSenderId: "647512448936",
    appId: "1:647512448936:web:a531b8658910be4ba6879d"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
        fillFormWithUserData(user);
        showAlert('Zalogowano pomyślnie!', 'success');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showAlert(`Error ${errorCode}: ${errorMessage}`, 'danger');
      })
    }
const userSignOut = async () => {
    signOut(auth).then(() => {
        showAlert('Zostałeś wylogowany!', 'success');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showAlert(`Error ${errorCode}: ${errorMessage}`, 'danger');
    })
}
const fillFormWithUserData = (user) => {
  const [firstName, ...lastName] = user.displayName.split(' ');
  document.getElementById('name').value = firstName || '';
  document.getElementById('surname').value = lastName.join(' ') || '';
  document.getElementById('exampleInputEmail1').value = user.email || '';
};

const showAlert = (message, type) => {
  const alertPlaceholder = document.getElementById('alert-placeholder');
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        fillFormWithUserData(user);
        showAlert('Jesteś zalogowany!', 'success');
    }
 })
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut); 