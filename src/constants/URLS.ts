import axios from "axios";

// https://upskilling-egypt.com:3000
const baseURL=`http://154.41.228.234:3000`

export  const axiosInstance=axios.create({baseURL, 
  headers:{Authorization:localStorage.getItem("token")} })

// Admin
export const ADMINAUTHURLS={
  createUser:`/api/v0/admin/users`,
  forgetPassword:`/api/v0/admin/users`,
  changePassword:`/api/v0/admin/users/change-password`,
  resetPassword:`/api/v0/admin/users/reset-password`,
  login:`/api/v0/admin/users/login`,
}

export const ADMINUSERS={
  getAllUsers:`/api/v0/admin/users`,
  getUserProfile:(id: string) =>`/api/v0/admin/users/${id}`
}

export const ADMINROOMS={
  createRoom:`/api/v0/admin/rooms`,
  updateRoom:(id: string) =>`/api/v0/admin/rooms/${id}`,
  getRoomDetails:(id: string) =>`/api/v0/admin/rooms/${id}`,
  deleteRoom:(id: string) =>`/api/v0/admin/rooms/${id}`,
  getAllRooms:`/api/v0/admin/rooms`
}

export const ADMINBOOKING={
  getBookingDetails:(id: string) =>`/api/v0/admin/booking/${id}`,
  deleteBooking:(id: string) =>`/api/v0/admin/booking/${id}`,
  getAllBooking:`/api/v0/admin/booking`
}

export const ADMINROOMFACILITIES={
  createRoomFacilities:`/api/v0/admin/room-facilities`,
  getRoomFacilities:`/api/v0/admin/room-facilities`,
  getRoomFacilityDetails:(id: string) =>`/api/v0/admin/room-facilities/${id}`,
  deleteRoomFacilities:(id: string) =>`/api/v0/admin/room-facilities/${id}`,
  updateRoomFacilities:(id:string)=>`/api/v0/admin/room-facilities/${id}`
}

export const ADMINADDS={
  getAdds:`/api/v0/admin/ads`,
  getAddDetails:(id: string) =>`/api/v0/admin/ads/${id}`,
  deleteAdd:(id: string) =>`/api/v0/admin/ads/${id}`,
  updateAdd:(id:string)=>`/api/v0/admin/ads/${id}`
}
// portal users

export const PORTALAUTHURLS={
  createUser:`/api/v0/portal/users`,
  forgetPassword:`/api/v0/portal/users/forgot-password`,
  changePassword:`/api/v0/portal/users/change-password`,
  resetPassword:`/api/v0/portal/users/reset-password`,
  login:`/api/v0/portal/users/login`,
}

export const PORTALUSERS={
  getUserProfile:(id: string) =>`/api/v0/portal/users/${id}`,
  GOOGLEAUTH:`/api/v0/portal/users/auth/google`, 
  FACEBOOKAUTH:`/api/v0/portal/users/auth/facebook`,
}

export const PORTALROOMS={
  getAllRooms:`/api/v0/portal/rooms/available`,
  getRoomDetails:(num: string) =>`/api/v0/portal/rooms/${num}`
}

export const PORTALBOOKING={
  createBooking:`/api/v0/portal/booking`,
  getBookingDetails:(id: string) =>`/api/v0/portal/booking/${id}`,
  getAllMyBooking:`/api/v0/portal/booking/my`,
  payBooking:(id: string) =>`/api/v0/portal/booking/${id}/pay`
}

// export const PORTALADDS={
//   getAdds:`/api/v0/admin/ads`,
//   getAddDetails:(id: string) =>`/api/v0/admin/ads/${id}`
// }

// export const FAVROOMS={
//   getAdds:`/api/v0/admin/ads`,
//   getAddDetails:(id: string) =>`/api/v0/admin/ads/${id}`
// }