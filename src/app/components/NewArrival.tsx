"use client"
import Container from "./container";
import Slider from 'react-slick'
import Product from "./Product";
import { ProductProps } from "../../../type";
import Nextarrow from "./Nextarrow";
import PrevArrow from "./PrevArrow";
interface props{
    products:ProductProps[]
}
export default function NewArrival({products}:props) {
    const settings = {
        infinite:true,
        speed:500,
        slidesToShow:4,
        slidesToScroll:1,
        nextArrow:<Nextarrow/>,
        prevArrow:<PrevArrow/>,
        responsive:[
            {
                breakpoint: 1025,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 769,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
        ]
    }
    return (
        <Container className="-mt-24">
          <div>
            <Slider {...settings}>
            
            {products?.map((item:ProductProps)=>
            <div key={item._id} className="px-2">
                <Product product = {item}/>
            </div>  
            )}
            
            </Slider>
            </div>
        </Container>
    );
}
