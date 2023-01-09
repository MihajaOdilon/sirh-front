import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../redux/actions/userAction';
import '../pagestyles/LoginPage.css'

export default function LoginPage() {
    const [username,setUserName] = useState([]);
    const [password,setPassword] = useState([])
    const {loading, me, error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            navigate('/');
        }
    }, [pathname, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
        if(error){
            setPassword('');
        }
    }
  return (
    !me &&
    <>
        { loading && <div className='loader'>Loading...</div> }
        <form className='login' onSubmit={handleSubmit}>
            <div className='form w-25'>
                <div className='container-fluid control'>
                    <input type={"text"} required className='form-control bg-dark' value={ username } placeholder="Nom d'utilisateur" onChange={(e)=>setUserName(e.target.value)}></input>
                    <input type={"password"} required className='form-control bg-dark' value={password} placeholder="Entrer le mot de passe" onChange={(e)=>setPassword(e.target.value)}></input>
                    { error && <div className='alert alert-warning'>{error}</div>}   
                    <div className='button'>
                        <span className='pt-1'><NavLink to={""}>Mot de passe oublié?</NavLink></span>
                        <button type='submit' className='btn btn-primary ' disabled={ username.length === 0 || password.length === 0 }>S'identifier</button>
                    </div>
                </div>
            </div>
        </form>
    </>
  )
}
