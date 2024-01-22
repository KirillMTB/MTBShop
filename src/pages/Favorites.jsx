import Card from "../components/Card/";
export default function Favorites(items){
    return(
  <div className="content p-40">
    <div className="d-flex align-center mb-40 justify-between">
      <h1>Избранное</h1>
    </div>
    <div className="bikes">
    {items
        .map((item, index)=>(
          <Card key={index} id={item.id} name={item.name} price={item.price} 
          imageURL={item.imageURL} alt={item.alt} 
          />))}
   </div>
  </div>

  
    );
}