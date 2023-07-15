import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { getTags } from "./service";
import "./NewAdvertPage.css";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";
import Button from "../shared/button";

const NewAdvertPage = (props) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState();
  const [content, setContent] = useState({
    name: "",
    price: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  useEffect(() => {
    getTags().then((options) => setOptions(options));
  }, []);

  const handleTagChange = (event) => {
    const selectedValues = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedTags(selectedValues);
  };
  
  const isDisabled =
    isLoading || !(content.name && content.price && content.photo);
  
    const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", event.target.name.value);
      formData.append("sale", event.target.sale.value);
      formData.append("price", event.target.price.value);
      formData.append("tags", selectedTags.join(","));
      formData.append("photo", event.target.photo.files[0]);
      const advert = await createAdvert(formData);
      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      setIsLoading(false);
      if (error.status === 401) {
        navigate("/login");
      }
      setError(error);
    }
  };

  return (
    <Layout title="Sube tu anuncio" {...props}>
      <form onSubmit={handleSubmit}>
        <div className="newAdvertPage ">
          <div>
            <label>Nombre</label>
            <input
              name="name"
              type="text"
              value={content.name}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label>Tipo</label>
            <select name="sale">
              <option value="true">Venta</option>
              <option value="false">compra</option>
            </select>
          </div>
          <div>
            <label>Precio</label>
            <input
              name="price"
              value={content.price}
              onChange={handleChange}
              type="text"
              required
            ></input>
          </div>
          <div>
            <label>Tags</label>
            {options && options.length > 0 ? (
              <select name="tags" multiple onChange={handleTagChange}>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <p>Cargando opciones...</p>
            )}
          </div>
          <div>
            <label>Foto</label>
            <input
              type="file"
              
              required
              onChange={handleChange}
              name="photo"
            ></input>
          </div>

          <Button type="submit" disabled={isDisabled}>
            Enviar
          </Button>
        </div>
      </form>
      {error && <div>{error.message}</div>}
    </Layout>
  );
};
export default NewAdvertPage;
