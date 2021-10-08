import { cityMapping } from 'city-timezones';
import generateIdFormat from './generateIdFormat';

const locations = [...cityMapping];

async function getUserLocation() {
    let error = false;
    let message = '';
    let id = '';

    function handleError(err) {
        error = true;
        switch (err.code) {
            case err.PERMISSION_DENIED:
                message = 'User denied the request for Geolocation';
                break;
            case err.POSITION_UNAVAILABLE:
                message = 'Location information is unavailable';
                break;
            case err.TIMEOUT:
                message = 'request time is out';
                break;
            case err.UNKNOWN_ERROR:
                message = 'Unknown err occured';
                break;
            default:
                message = 'Something went wrong';
        }
    }

    if (navigator.geolocation) {
        try {
            id = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    ({ coords }) => {
                        locations.sort((a, b) => {
                            const first = Math.abs(a.lat - coords['latitude']) + Math.abs(a.lng - coords['longitude']);
                            const second = Math.abs(b.lat - coords['latitude']) + Math.abs(b.lng - coords['longitude']);

                            return first - second;
                        });

                        const city = locations[0];
                        const { city_ascii: cityAscii, iso2, lat, lng } = city;
                        const id = generateIdFormat(cityAscii, iso2, lat, lng);
                        resolve(id);
                    },
                    props => {
                        handleError(props);
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('');
                    }
                );
            });
        } catch (err) {
            console.error(err);
        }
    } else {
        error = true;
        message = 'geolocation is not supported by this browser!';
    }

    return { error, message, id };
}

export default getUserLocation;
