import axios from 'axios';
import RestAPI from '../constants/RestAPI';

export default {
    getStudies(query) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'studies', {
            params: {
                search: query.search,
                page: query.page,
            }
        })
            .catch(error => {
                console.log(error);
            });
    },
    createStudy(studyData) {
        return new Promise(function (resolve, reject) {
            axios.post(RestAPI.SERVER_DOMAIN + 'studies/', studyData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    modifyStudy(studyId, studyData) {
        return new Promise(function (resolve, reject) {
            axios.patch(RestAPI.SERVER_DOMAIN + 'studies/' + studyId, studyData)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    deleteStudy(studyId) {
        return new Promise(function (resolve, reject) {
            axios.patch(RestAPI.SERVER_DOMAIN + 'studies/' + studyId)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // joinStudy(studyId) {
    //     //
    // }
};