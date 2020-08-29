import axios from '@/globalServices/mapServiceConfig';

const reverseGeocode = 'reverseGeocode';
const key = "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63";

export default {
    getLocationByCoords({lat, lng}) {
        return axios.get(`${reverseGeocode}/${lat},${lng}.json?key=${key}`);
    },
    getLocationsByName({current}, payload) {
        return axios.get(`${payload}.json?countrySet=PL&lat=${current.lon}&radius=30000&idxSet=PAD,Addr,Str?key=${key}`);
    },
};
