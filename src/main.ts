import './style.css'
import axios from 'axios'
import Toastr from 'toastr'

interface Product{

  id:number;
  title:string;
  description:string;
  price:number;
  discountPercentage:number;
  rating:number;
  stock:number;
  brand:string;
  category:string;
  thumbnail:string;
  images:string[];
}


class productDetails{

  

  async fetchProductDetails(proId: number): Promise<Product|void>{
    try {
      const response = await axios.get(`https://dummyjson.com/products/${proId}`)
      const productDetails: Product = response.data;
      console.log('Product details:', productDetails);
      return productDetails

    } catch (error) {
      
    }
  }


 

}


const productetails = new productDetails();
console.log(productetails)


Toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: undefined,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};





const input = document.getElementById('productIdInput') as HTMLInputElement;

const form = document.querySelector("form")



if(form){
  form.addEventListener("submit" , async (event:SubmitEvent)=>{
    event.preventDefault()

    const proid = parseInt(input.value)
    console.log("iii",proid)

    if(proid<1 || proid>100){
      Toastr.error("No should between 1 and 100")
    }

    if(proid){
      try {
        const product= await productetails.fetchProductDetails(proid)

        console.log(product)

        if(product){
          const template = new ProductTemplate()
          template.render(product)



        }


        ////
     
        
        
      } catch (error) {
        console.error("Error fetching data")
      }
    }



  })
}






class ProductTemplate{



  clearproduct():void{
    document.body.innerHTML = '';
  }

  clear(): void {
    const productElements = document.querySelectorAll('.productsss');
    productElements.forEach(element => {
      element.remove();
    });
  }

  render(product:Product){

    this.clear();
   const div = document.createElement("div")
   div.className="productsss flex flex-col items-center justify-center"



     //image
     const img = document.createElement("img")
     img.className="image w-60 h-60"
     img.src=product.images[0]
     div.appendChild(img)
 


  //  title
   const h1 = document.createElement("h1")
   console.log(h1)
   h1.innerText=product.title
   div.appendChild(h1)

   // description
   const p = document.createElement("p")
   p.className="description"
   p.innerText=product.description
   div.appendChild(p)


  //  price
    const price = document.createElement("h3")
    price.className='price'
    price.innerText=`Price : ${product.price.toString()}`
    div.appendChild(price)

    // discountPercentage
    const discount = document.createElement("h3")
    discount.className='discount'
    discount.innerText = `Discount : ${product.discountPercentage.toString()}`;
    div.appendChild(discount)


    //rating
    const rating = document.createElement("h3")
    rating.className="rating"
    rating.innerText=`Ratings : ${product.rating.toString()}`
    div.appendChild(rating)

    //category
    const cat = document.createElement("h3")
    cat.className="cate"
    cat.innerText=`Category : ${product.category}`
    div.appendChild(cat)

  

   document.body.appendChild(div)
  }
}




