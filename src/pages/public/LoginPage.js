import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../pageStyles/LoginPage.css'
export default class LoginPage extends Component {
  render() {
    return (
        <form className='login'>
            <div className='form w-25'>
                <div className='container-fluid p-0'><img src='login1.jpg' alt=''/></div>
                <div className='container-fluid control'>
                    <input type={"email"} required className='form-control bg-dark' placeholder="Entrer l'adresse e-mail"></input>
                    <input type={"password"} required className='form-control bg-dark' placeholder="Entrer le mot de passe"></input>
                    <span className='text-white'><input type={"checkbox"} required className='form-check-input'/><NavLink to={""}> J'ai lu et j'accepte les termes et conditions et la politique de confidentialité.</NavLink></span>
                    <div className='button'>
                        <span className='pt-1'><NavLink to={""}>Mot de passe oublié?</NavLink></span>
                        <button type='submit' className='btn btn-primary '>S'identifier</button>
                    </div>
                </div>
            </div>
        </form>
    )
  }
}
