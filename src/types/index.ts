export interface IParcelStatus {
  pending_pickup: "Pending Pickup";
  picked_up: "Picked Up";
  in_transit: "In Transit";
  out_for_delivery: "Out For Delivery";
  delivered: "Delivered";
  failed_delivery: "Failed Delivery";
  cancelled: "Cancelled";
}

export const IParcelStatusColor = {
  pending_pickup: "bg-yellow-100 text-yellow-800",
  picked_up: "bg-blue-100 text-blue-800",
  in_transit: "bg-purple-100 text-purple-800",
  out_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  failed_delivery: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

export const IParcelStatusRibonColor = {
  pending_pickup: " bg-yellow-800",
  picked_up: " bg-blue-800",
  in_transit: " bg-purple-800",
  out_for_delivery: " bg-orange-800",
  delivered: " bg-green-800",
  failed_delivery: " bg-red-800",
  cancelled: " bg-gray-800",
};

export interface IParcel {
  packageDetails: PackageDetails;
  paymentDetails: PaymentDetails;
  _id: string;
  status: string;
  sender: string;
  receiver: string;
  trackingHistory: TrackingHistory[];
  createdAt: string;
  updatedAt: string;
  trackingNumber: string;
  __v: number;
}

export interface PackageDetails {
  weightKg: number;
  description: string;
  fragile: boolean;
}

export interface PaymentDetails {
  currency: string;
}

export interface TrackingHistory {
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITrackingData {
  date: string;
  title: string;
  description: string;
}
