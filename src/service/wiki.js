import axios from 'axios';
import RestAPI from '../constants/RestAPI';

// Wiki에 관련된 axios 액션 정의
export default {
    getWiki(wikiTitle) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'wiki/search/' + wikiTitle)
            .catch(error => {
                console.log(error);
            });
    },
    getRandomWiki() {
        return axios.get(RestAPI.SERVER_DOMAIN + 'wiki/random')
            .catch(error => {
                console.log(error);
            });
    },
    writeWiki(data) {
        return new Promise(function (resolve, reject) {
            axios.post(RestAPI.SERVER_DOMAIN + 'wiki/add', data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
};