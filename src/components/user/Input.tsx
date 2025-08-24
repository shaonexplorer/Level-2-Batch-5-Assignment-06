import { useId } from "react";

import { Input } from "@/components/ui/input";

interface IProp {
  trackId: string | undefined;
  setTrackId: React.Dispatch<React.SetStateAction<undefined | string>>;
  handleTrack: () => void;
}

export default function InputTrackParcel({
  trackId,
  setTrackId,
  handleTrack,
}: IProp) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2 max-w-2xl mx-auto mt-10 mb-10">
      <div className="flex rounded-md shadow-xs">
        <Input
          id={id}
          className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
          placeholder="Tracking Number"
          type="text"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
        />
        <button
          onClick={handleTrack}
          className="border-input bg-background text-foreground hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Track Parcel
        </button>
      </div>
    </div>
  );
}
