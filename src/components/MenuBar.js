import { useNavigate } from 'react-router-dom';
import '../components/style/MenuBar.css'
export default function MenuBar({ deleteDisabled=true }) {
  const navigate = useNavigate();
  return (
    <>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <button className="page-link bg-danger text-light" type='submit'><i className="fa fa-trash"></i>Supprimer</button>
                </li>
                <li class="page-item">
                    <button className="page-link bg-success text-light" type='button' onClick={()=>navigate("add")}><i className="fa fa-plus"></i>Ajouter</button>
                </li>
            </ul>
        </nav>  
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
