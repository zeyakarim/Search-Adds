import React , {useState, useEffect} from "react";
import axios from 'axios';


function App() {
  const [Adds, setAdds] = useState([]);
  const [data, searchData] = useState([]);
  const [result, searchResult] = useState([]);

  function handleSearch(e) {
    searchResult(e.target.value);
  }

  useEffect(() => {
    if(result.length > 0){
      const search = `http://localhost:3001/searchProduct?search=${result}`
      fetch(search)
        .then((response) => response.json())
        .then((searchAdds) => {
          if(searchAdds.length > 0 ){
            console.log(searchAdds);
            setAdds(searchAdds);
            return;
          }
          console.log('No Product Found');
        })
    }
  },[result])
  

  useEffect(() => { 
    const searchItem = `http://localhost:3001/fetchProduct`
    fetch(searchItem)
    .then((response) => response.json())
    .then((adds) => {
      console.log(adds);
      setAdds(adds);
    });
  },[data]);
  


  function handleChange(event){
    // const {name, value} = event.target;
    
    // searchProduct((prevInput) => {
    //   return {
    //     ...prevInput,
    //     [name]: value
    //   }
    // })
  }


  function handleSubmit(event) {
    event.preventDefault();
    let form = document.getElementById('form');   
    let formData = new FormData(form);

    axios({
      url: "http://localhost:3001/create",
      method: "POST",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) =>{
     searchData(res.data.product)
    });
  }

  function ShowAddsFrom(e){
    let showForm = document.querySelector('table');
    showForm.style.display = 'block';
   
  }

  return (
    <div className="App">
      <div className="page-header">
          <p className="header">
            <img src="https://cdn-icons-png.flaticon.com/512/1055/1055645.png" alt="cart-icon"></img>
          </p>
          <h2 className="header"  style={{marginTop: '7px', fontFamily: 'cursive'}}>SCAdds</h2>
      </div>


      <div className="adds-container">
        <div className="adds-header">
          <h1>Adds</h1>
        </div>

        <div id="addAdds">
          <form method="post" encType='multipart/form-data' onSubmit={handleSubmit} id="form">
            <table>
              <tbody>
              <tr>
                  <td>Company Name:</td>
                  <td>
                    <input type="text" name="companyName" onChange={handleChange}></input>
                  </td>
                </tr>
              
                <tr>
                  <td>Company Logo:</td>
                  <td><label for="logo">Upload File</label></td>
                  <td>
                    <input type="file" name="companyLogo" onChange={handleChange} id="logo" style={{display:'none'}}></input>
                  </td>
                </tr>

                <tr>
                  <td>Company Url:</td>
                  <td>
                    <input type="url" name="companyUrl" onChange={handleChange}></input>
                  </td>
                </tr>

                <tr>
                  <td>Primary Text:</td>
                  <td>
                    <input type="text" name="primaryText" onChange={handleChange}></input>
                  </td>
                </tr>
              
                <tr>
                  <td>Headline:</td>
                  <td>
                    <input type="text" name="headline" onChange={handleChange}></input>
                  </td>
                </tr>

                <tr>
                  <td>Description:</td>
                  <td>
                    <input type="text" name="description" onChange={handleChange}></input>
                  </td>
                </tr>

                <tr>
                  <td>CTA:</td>
                  <td>
                    <input type="text" name="cta" onChange={handleChange}></input>
                  </td>
                </tr>

                <tr>
                  <td>Price:</td>
                  <td>
                    <input type="text" name="price" onChange={handleChange}></input>
                  </td>
                </tr>
              
                <tr>
                  <td>Image:</td>
                  <td><label for="image">Upload File</label></td>
                  <td>
                    <input type="file" name="image" onChange={handleChange} id="image" style={{display:'none'}}></input>
                  </td>
                </tr>
                <tr>
                  <button className="submit">Create Products</button>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        <div className="input-btn">
          <div className="btn">
            <button onClick={ShowAddsFrom} data-toggle='true'>Add Adds</button>
          </div>

          <div className="searchcontainer">
            <div>
              <img src="https://images.pond5.com/magnifying-glass-search-icon-and-footage-087101098_prevstill.jpeg" style={{width: 40, marginTop:7}} alt="icon"></img>
            </div>
            
            <div>
              <input className="search" type="text" onChange={handleSearch} placeholder="Search Adds.."></input>
            </div>
            
            <div>
              <button>Search</button>
            </div>
          </div>
        </div>
        

        <div className="product-container">

          {Adds.map((product) => (
            <div className="addbox">
              <div style={{display: 'flex'}}>
                <p className="companylogo">
                  <img src={`http://localhost:3001${product.company_id.companyLogo}`} alt="logo"></img>
                </p>
                <div className="addHeader">
                  <h3>{product.company_id.companyName}</h3>
                  <h4>Sponsored</h4>
                </div>
              </div>

              <div>
                <p style={{marginTop: 0}}>{product.primaryText}</p>
              </div>
              

              <div className="product-box"  key={product._id}>
                <div>
                  <p style={{textAlign:'center'}}>
                    <img src={`http://localhost:3001${product.image}`} style={{width:'85%', height: 500}} alt="product-img"></img>
                  </p>
                </div>

                <div className="productName">
                  <div>
                    <h3>{product.headline}</h3>
                    <p>&#8377; {product.price}</p>
                    <p>{product.description}</p>
                    
                  </div>
                  
                  <div className="buyNow">
                    <a href={product.company_id.url} target="_blank" rel="noopener noreferrer">
                      <button>{product.cta}</button>
                    </a>
                  </div>
                 
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default App;

