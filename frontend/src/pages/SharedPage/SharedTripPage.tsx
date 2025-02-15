import { useParams } from 'react-router-dom';

import { Flex } from 'hang-log-design-system';

import { containerStyling, mapContainerStyling } from '@pages/TripPage/TripPage.style';

import DayLogList from '@components/common/DayLogList/DayLogList';
import GoogleMapWrapper from '@components/common/GoogleMapWrapper/GoogleMapWrapper';
import TripInformation from '@components/common/TripInformation/TripInformation';
import TripMap from '@components/common/TripMap/TripMap';

import { useSharedTripQuery } from '@hooks/api/useSharedTripQuery';
import { useTripPage } from '@hooks/trip/useTripPage';

const SharedTripPage = () => {
  const { tripId } = useParams();

  if (!tripId) throw new Error('존재하지 않는 공유코드입니다.');

  const { tripData } = useSharedTripQuery(tripId);

  const { places, selectedDayLog, handleDayLogIdSelectClick } = useTripPage(
    tripData.tripType,
    tripId
  );

  return (
    <Flex>
      <section css={containerStyling}>
        <TripInformation tripType={tripData.tripType} tripId={tripId} isEditable={false} />
        <DayLogList
          tripType={tripData.tripType}
          tripId={tripId}
          selectedDayLog={selectedDayLog}
          isEditable={false}
          onTabChange={handleDayLogIdSelectClick}
        />
      </section>
      <section css={mapContainerStyling}>
        <GoogleMapWrapper>
          <TripMap
            places={places}
            centerLat={tripData.cities[0].latitude}
            centerLng={tripData.cities[0].longitude}
          />
        </GoogleMapWrapper>
      </section>
    </Flex>
  );
};

export default SharedTripPage;
