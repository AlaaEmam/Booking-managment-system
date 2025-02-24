import axios from 'axios';

// https://upskilling-egypt.com:3000
export const baseURL = `https://upskilling-egypt.com:3000/api/v0/`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem('token') },
});

//payment

export const payment={

  bokking:(BOOKING_Id:string)=>`portal/booking/${BOOKING_Id}/pay`
}

// Admin
export const ADMINAUTHURLS = {
  createUser: `admin/users`,
  forgetPassword: `portal/users/forgot-password`,
 

  changePassword: `admin/users/change-password`,
  resetPassword: `admin/users/reset-password`,
  login:`admin/users/login`,
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
 
}
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
  getAllRoomsAll: `portal/rooms/available`,
  getAllRooms: (page:string,size:string)=>`portal/rooms/available?page=${page}&size=${size}`,

  getRoomDetails: (num: string) => `portal/rooms/${num}`,
  filterRoom:(startDate:string,endDate:string,capacity:string,page:string,size:string)=>`portal/rooms/available?page=1&size=10&startDate=${startDate}&endDate=${endDate}&capacity=${capacity}&page=${page}&size=${size}`

};

export const PORTALBOOKING = {
  createBooking: `portal/booking`,
  getBookingDetails: (id: string) => `portal/booking/${id}`,
  getAllMyBooking: `portal/booking/my`,
  
};

export const PORTALADS={
  getAds:`portal/ads`,
  getAddDetails:(id: string) =>`portal/ads/${id}`
};

export const PORTALROOMSCOMMENTS={
  createComment:`portal/room-comments`,
};

export const PORTALROOMREVIEW={
  createReview:`portal/room-reviews`
};

export const FAVROOMS={
  getAddsFAVROOMS:`portal/favorite-rooms`,
  getAddDetailsFAVROOMS:`portal/favorite-rooms`,
  deleteDetailsFAVROOMS:(id:string)=>`portal/favorite-rooms/${id}`
}
