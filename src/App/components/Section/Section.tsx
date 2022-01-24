import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useLocations from '../../hooks/useLocations';
import { IInitialState, IUrlLocations, IUrlLocation } from '../../redux/types';
import { setUserLocation, setCounter } from '../../redux/actions';

import style from './Section.module.scss';
import LocationBlock from './components/LocationBlock/LocationBlock';
import EmptyState from './components/EmptyState/EmptyState';

const Section: React.FC = () => {
  const { counter, locationsDB } = useSelector((state: IInitialState) => state);

  const { locations, setLocations, findLocation } = useLocations();

  const dispatch = useDispatch();

  useEffect(() => {
    const userLocation: IUrlLocation | undefined =
      locations &&
      Object.values(locations).find((urlLocation: IUrlLocation) => urlLocation.userLocation);

    if (userLocation) {
      const find = findLocation(userLocation);

      find && dispatch(setUserLocation(find));
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const userLocation = locationsDB.sort((a, b) => {
          const first =
            Math.abs(a.lat - coords['latitude']) + Math.abs(a.lng - coords['longitude']);
          const second =
            Math.abs(b.lat - coords['latitude']) + Math.abs(b.lng - coords['longitude']);

          return first - second;
        });

        dispatch(setUserLocation(userLocation[0]));

        const locationObj: IUrlLocations = {
          ...locations,
          [userLocation[0].city + userLocation[0].lat]: {
            city: userLocation[0].city,
            lat: userLocation[0].lat,
            userLocation: true
          }
        };

        setLocations(locationObj);
      });
    }
    // use it only when component mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch(setCounter(counter + 1)), 60000);
  }, [counter, dispatch]);

  const locationsRender = useMemo(() => {
    if (locations) {
      return Object.values(locations).map((urlLocation: IUrlLocation, index: number) => {
        const find = findLocation(urlLocation);

        return (
          <LocationBlock
            key={index + 'LOCATION'}
            location={find}
            urlUserLocation={urlLocation.userLocation}
          />
        );
      });
    }

    return <EmptyState />;
    // don't need as a dependency findLocation
    // eslint-disable-next-line
  }, [locations]);

  return <div className={style.body}>{locationsRender}</div>;
};

export default Section;