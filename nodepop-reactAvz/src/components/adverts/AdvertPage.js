import { Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { deleteAdvert, getAdvert } from "./service";

const AdvertPage = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [error, setError] = useState(null);
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAdvert(params.id)
      .then((advert) => setAdvert(advert), setIsLoading(false))
      .catch((error) => setError(error));
  }, [params.id]);

  if (error?.status === 404) {
    return <Navigate to="/404" />;
  }

  const handleDeleteClick = async (id) => {
    if (showConfirmation) {
      await deleteAdvert(params.id);
      navigate("/");
    } else {
      setShowConfirmation(true);
    }
  };

  return (
    <Layout title="Detalle de Anuncio" {...props}>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          {advert && <div>{advert.name}</div>}
          {advert && <img src={advert.photo} alt="none"></img>}
          {advert && <div>Precio: {advert.price} euros</div>}
          <br></br>
          <button onClick={handleDeleteClick}>Borrar</button>
          {showConfirmation && (
            <div>
              ¿Estás seguro de que deseas borrar el anuncio?
              <button onClick={() => setShowConfirmation(false)}>
                Cancelar
              </button>
              <button onClick={() => handleDeleteClick(params.id)}>
                Confirmar
              </button>
            </div>
          )}
        </div>
      )}
      {error && <div>{error.message}</div>}
    </Layout>
  );
};

export default AdvertPage;
