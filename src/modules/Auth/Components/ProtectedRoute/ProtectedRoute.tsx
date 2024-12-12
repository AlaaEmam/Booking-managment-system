import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  loginData: any; // يمكن تحديد النوع بناءً على محتوى loginData
  children: ReactNode;
}

const ProtectedRoute = ({ loginData, children }: ProtectedRouteProps) => {
  // التحقق من أن loginData موجود وصالح أو أن الـ token موجود وغير فارغ
  const token = localStorage.getItem("token");
  const isLoggedIn = token && loginData; // تحقق مزدوج من أن loginData موجود و token غير فارغ

  if (isLoggedIn) {
    return <>{children}</>; // عرض الـ children إذا كان المستخدم مسجل الدخول
  } else {
    return <Navigate to="/login" />; // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن مسجل الدخول
  }
};

export default ProtectedRoute;

