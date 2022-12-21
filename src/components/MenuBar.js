import { useNavigate } from 'react-router-dom';
import '../components/style/MenuBar.css'
export default function MenuBar({ deleteDisabled=true }) {
  const navigate = useNavigate();
  return (
    <>
        <div className='container-fluid menubar'>
            <div className='btn-group' role={"group"} aria-label="">
                <button className={deleteDisabled?"btn disabled":"btn btn-danger"} type='button' disabled={ deleteDisabled } id={"delete"}><i className="fa fa-trash"></i> Supprimer</button>
                <button className='btn btn-success' type='button' onClick={()=>(navigate("add"))} id ='add'><i className="fa fa-plus-circle"></i> Ajouter</button>
            </div>
        </div>
    </>

  )
};
function MenuBarConfirm() {
  const navigate = useNavigate();
  return (
      <div className='container-fluid menubar p-0'>
          <div className='btn-group' role={"group"} aria-label="">
              <button className="btn btn-warning text-light" type='button' onClick={()=>navigate("..")}><i className="fa fa-times"></i> Annuler</button>
              <button className="btn btn-success" type='submit'><i className="fa fa-check"></i> Confirmer</button>
          </div>
      </div>
  )
}
export {MenuBarConfirm}
