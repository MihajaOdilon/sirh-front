import React, { useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { setMe } from '../../redux/actions/userAction'
export default function HomePage() {
  const { pathname } = useLocation();
  const { me } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if(accessToken){
      if(me == null){
        dispatch(setMe(decodeToken(accessToken)));
      }
    }else{
      navigate("/login");
    }
  }, [pathname, me, navigate, dispatch]);

  return (
      <>
        <Header padding={"nav-link text-nowrap"}/>
        <Footer/>
      </>
  )
}

