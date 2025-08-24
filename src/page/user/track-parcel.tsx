import InputTrackParcel from "@/components/user/Input";
import TimeLineParcel from "@/components/user/Time-Line";
import { useTrackParcelQuery } from "@/redux/api/parcel.api/parcelApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function TrackParcel() {
  const [searchParams] = useSearchParams();
  const trackingNumber = searchParams.get("trackingNumber");
  const [trackId, setTrackId] = useState<string | undefined>(
    trackingNumber as string
  );
  const { data, refetch } = useTrackParcelQuery(trackId);
  const [trackingData, setTrackingData] = useState<typeof data>(data);

  const handleTrack = () => {
    setTrackingData(data);
  };

  useEffect(() => {
    if (trackingNumber) {
      setTrackId(trackingNumber);
      refetch();
      setTrackingData(data);
    }
  }, [trackingNumber, data]);

  return (
    <div className="">
      <InputTrackParcel
        handleTrack={handleTrack}
        trackId={trackId}
        setTrackId={setTrackId}
      />
      <TimeLineParcel items={trackingData?.data?.trackingHistory} />
    </div>
  );
}

export default TrackParcel;
