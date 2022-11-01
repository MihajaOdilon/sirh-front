import axios from 'axios';
import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
        <Header className={'container-fluid p-0 header position-sticky'}/>
          <div color='red'>contact</div>
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
