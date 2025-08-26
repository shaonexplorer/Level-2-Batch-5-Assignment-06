export interface IParcelStatus {
  pending_pickup: "Pending Pickup";
  picked_up: "Picked Up";
  in_transit: "In Transit";
  out_for_delivery: "Out For Delivery";
  delivered: "Delivered";
  failed_delivery: "Failed Delivery";
  cancelled: "Cancelled";
}

export const parcelStatus = {
  pending_pickup: { title: "Pending Pickup", value: "pending_pickup" },
  picked_up: { title: "Picked up", value: "picked_up" },
  in_transit: { title: "In Transit", value: "in_transit" },
  out_for_delivery: { title: "Out For Delivery", value: "out_for_delivery" },
  delivered: { title: "Delivered", value: "delivered" },
  failed_delivery: { title: "Failed Delivery", value: "failed_delivery" },
  cancelled: { title: "Cancelled", value: "cancelled" },
};

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

export interface IUser {
  _id: string;
  userId: UserId;
  firstName: string;
  phoneNumber: string;
  role: string;
  address: Address;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserId {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export const userStatus = {
  active: "active",
  inactive: "inactive",
  blocked: "blocked",
  deleted: "deleted",
};

export const userStatusColor = {
  blocked: "bg-orange-100 text-orange-800",
  active: "bg-green-100 text-green-800",
  deleted: "bg-red-100 text-red-800",
  inactive: "bg-gray-100 text-gray-800",
};

export const userStatusRibonColor = {
  blocked: " bg-orange-800",
  active: " bg-green-800",
  deleted: " bg-red-800",
  inactive: " bg-gray-800",
};
