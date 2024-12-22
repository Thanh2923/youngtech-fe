'use client'; // Phải được đặt trên cùng của file

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '@/redux/User/authSlice';

const AuthSync = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(setUser({
          id: session.user.id || null, 
          email: session.user.email || null,
          role: session.user.role || null,
          accessToken: session.accessToken || null,
        })
      );
    } else {
      dispatch(clearUser());
    }
  }, [session, dispatch]);

  return null; // AuthSync không render gì cả
};

export default AuthSync;
