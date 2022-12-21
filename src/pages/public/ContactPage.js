import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { setMe } from '../../redux/actions/userAction';

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    await axios.post('http://spring.com/api/v1/contact', formData)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {
          console.log('---End---')
        });
  }

  return (
    <>
        <Header padding="nav-link text-nowrap"/>
          <form className='form' onSubmit={ handleSubmit }>
              <div className='form-group'>
                  <input type='text' value={ name } required placeholder="Nom" onChange={ (e) => setName(e.target.value) } />
              </div>
              <div className='form-group'>
                  <input type='email' value={ email } required placeholder="E-mail" onChange={ (e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group'>
                  <textarea placeholder='Message' value={ message } onChange={ (e) => setMessage(e.target.value) }></textarea>
              </div>
              <div className='form-group'>
                  <button type='submit'>Envoyer</button>
              </div>
            </form>
        <Footer/>
    </>
  )
}
