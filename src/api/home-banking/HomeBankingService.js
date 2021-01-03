import axios from 'axios'
const { REACT_APP_API_URL } = process.env;

class HomeBankingService {

    retrieveATM() {
        return axios.get(`${REACT_APP_API_URL}/atms`);
    }

    convertMoney(from,to,amount) {
        
        return axios.get(`${REACT_APP_API_URL}/convert?currencyFrom=${from}&currencyTo=${to}&amount=${amount}`);
    }


}

export default new HomeBankingService()