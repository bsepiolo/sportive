import axios from '@/globalServices/mapServiceConfig';

const reverseGeocode = 'reverseGeocode';
const key = "T3rkU9oS8MBPuHOoOHTa85k4xgZYGl63";

export default {
    getLocationByCoords({lat, lng}) {
        debugger
        return axios.get(`${reverseGeocode}/${lat},${lng}.json?key=${key}`);
    },
    getLocationsByName(current, payload) {
        return axios.get(`search/${payload}.json?countrySet=PL&lat=${current.lat}&lon=${current.lon}&radius=30000&idxSet=PAD,Addr,Str&key=${key}`);
    },
};
