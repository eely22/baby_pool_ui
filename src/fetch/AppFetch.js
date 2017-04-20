class AppFetch {

    static getEmail() {
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            var email = localStorage.getItem("email");
            if (email !== null) {
                return email;
            }
        }
        return null;
    }

    static saveEmail(email)
    {
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("email", email);
        }
    }

}

export default AppFetch;