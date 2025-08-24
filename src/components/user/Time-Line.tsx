import { CheckIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import type { ITrackingData, TrackingHistory } from "@/types";

const demoData = [
  {
    id: 1,
    status: "pending_pickup",
    title: "Shipment Awaiting Pickup",
    description:
      "The package has been prepared and is waiting for the courier to collect it from the sender's location.",
  },
  {
    id: 2,
    status: "picked_up",
    title: "Accepted by Courier",
    description:
      "The courier has picked up the package. It is now in transit to the first sorting facility.",
  },
  {
    id: 3,
    status: "out_for_delivery",
    title: "Out for Delivery",
    description:
      "The package has arrived at the local distribution center and is out for delivery with a courier.",
  },
  {
    id: 4,
    status: "in_transit",
    title: "In Transit",
    description:
      "The package is out for delivery with a courier and is in transit.",
  },
  {
    id: 5,
    status: "delivered",
    title: "Delivered",
    description:
      "The package has been successfully delivered to the recipient. A signature was obtained.",
  },
  {
    id: 6,
    status: "failed_delivery",
    title: "Failed To Deliver",
    description: "The package has been failed to delivered to the recipient.",
  },
  {
    id: 7,
    status: "cancelled",
    title: "Cancelled",
    description: "The package has been cancelled by the recipient.",
  },
];

export default function TimeLineParcel({
  items,
}: {
  items: TrackingHistory[];
}) {
  const itemData = [] as ITrackingData[];
  items?.flatMap((item) =>
    demoData.map((demo) =>
      demo.status == item.status
        ? itemData.push({
            title: demo.title,
            date: item.updatedAt,
            description: demo.description,
          })
        : ""
    )
  );

  if (itemData.length == 0)
    return (
      <div className="flex items-center justify-center">No Parcel Found</div>
    );

  return (
    <Timeline className="w-fit mx-auto my-5" defaultValue={7}>
      {itemData?.map((item, index) => (
        <TimelineItem
          key={index}
          step={index}
          className="group-data-[orientation=vertical]/timeline:ms-10"
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
            <TimelineDate>{format(new Date(item.date), "Pp")}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
              <CheckIcon
                className="group-not-data-completed/timeline-item:hidden"
                size={16}
              />
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
