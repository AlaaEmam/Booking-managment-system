import axios from 'axios';

// https://upskilling-egypt.com:3000
const baseURL = `https://upskilling-egypt.com:3000/api/v0/`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem('token') },
});

// Admin
export const ADMINAUTHURLS = {
  createUser: `admin/users`,
  forgetPassword: `portal/users/forgot-password`,

  changePassword: `admin/users/change-password`,
  resetPassword: `admin/users/reset-password`,
  login: `admin/users/login`,
};

export const ADMINUSERS = {
  getAllUsers: `admin/users`,
  getUserProfile: (id: string) => `admin/users/${id}`,
};

export const ADMINChart = {
  getChart: `admin/dashboard`,
};

export const ADMINROOMS = {
  createRoom: `admin/rooms`,
  updateRoom: (id: string) => `admin/rooms/${id}`,
  getRoomDetails: (id: string) => `admin/rooms/${id}`,
  deleteRoom: (id: string) => `admin/rooms/${id}`,
  getAllRooms: `admin/rooms`,
};

export const ADMINBOOKING = {
  getBookingDetails: (id: string) => `admin/booking/${id}`,
  deleteBooking: (id: string) => `admin/booking/${id}`,
  getAllBooking: `admin/booking`,
};

export const ADMINROOMFACILITIES = {
  createRoomFacilities: `admin/room-facilities`,
  getRoomFacilities: `admin/room-facilities`,
  getRoomFacilityDetails: (id: string) => `admin/room-facilities/${id}`,
  deleteRoomFacilities: (id: string) => `admin/room-facilities/${id}`,
  updateRoomFacilities: (id: string) => `admin/room-facilities/${id}`,
};

export const ADMINADS = {
  getAds: `admin/ads`,
  getAdDetails: (id: string) => `admin/ads/${id}`,
  deleteAd: (id: string) => `admin/ads/${id}`,
  updateAd: (id: string) => `admin/ads/${id}`,
};
// portal users

export const PORTALAUTHURLS = {
  createUser: `portal/users`,
  forgetPassword: `portal/users/forgot-password`,
  changePassword: `portal/users/change-password`,
  resetPassword: `portal/users/reset-password`,
  login: `portal/users/login`,
};

export const PORTALUSERS = {
  getUserProfile: (id: string) => `portal/users/${id}`,
  GOOGLEAUTH: `portal/users/auth/google`,
  FACEBOOKAUTH: `portal/users/auth/facebook`,
};

export const PORTALROOMS = {
  getAllRooms: `portal/rooms/available`,
  getRoomDetails: (num: string) => `portal/rooms/${num}`,
};

export const PORTALBOOKING = {
  createBooking: `portal/booking`,
  getBookingDetails: (id: string) => `portal/booking/${id}`,
  getAllMyBooking: `portal/booking/my`,
  payBooking: (id: string) => `portal/booking/${id}/pay`,
};

export const PORTALADS={
  getAds:`admin/ads`,
  getAddDetails:(id: string) =>`admin/ads/${id}`
}

// export const FAVROOMS={
//   getAdds:`admin/ads`,
//   getAddDetails:(id: string) =>`admin/ads/${id}`
// }
