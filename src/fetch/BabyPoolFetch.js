import AppConfig from '../appConfig'

class BabyPoolFetch {
    static handleErrors(response) {
        if (!response.ok) {
            console.log("ERROR: " + response.status)
            throw Error(response.status);
        }
        return response;
    }

    static postEntrant(data) {

        return fetch(AppConfig.apiUrl+"/baby_pool", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(BabyPoolFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }

    static getEntrants() {
        return fetch(AppConfig.apiUrl+"/baby_pool", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(BabyPoolFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }

    static getEntrant(email) {
        return fetch(AppConfig.apiUrl+"/baby_pool?email="+email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(BabyPoolFetch.handleErrors)
            .then((response) => {
                return response.json()
            })
    }
}

export default BabyPoolFetch;