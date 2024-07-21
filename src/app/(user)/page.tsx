import { groq } from "next-sanity";
import Banner from "../components/banner";
import { client } from "@/lib/sanityClient";
import NewArrival from "../components/NewArrival";
import { ProductProps } from "../../../type";
import Homebanner from "../components/Homebanner";
import Bestsellers from "../components/BestSellers";
import ProductoftheYear from "../components/Poy";
import SpecialOffers from "../components/SpecialOffers";
export const revalidate = 10;
const bannerQuery = groq`*[_type == 'banner']{
  image,
  _id
} | order(_createdAt asc)`  

const newArrivalQuery = `*[_type == 'product' && position == 'New arrivals']
{
...
}`
const bestSellerQuery = `*[_type == 'product' && position == 'Bestsellers']
{
...
}`
const specialOfferQuery = `*[_type == 'product' && position == 'Special offers']
{
...
}`
export default async function Homepage() {
  const banners = await client.fetch(bannerQuery)
  const newArrivals:ProductProps[] = await client.fetch(newArrivalQuery)
  const bestSellers:ProductProps[] = await client.fetch(bestSellerQuery)
  const specialOffers:ProductProps[] = await client.fetch(specialOfferQuery)
  
  return (
    <main className="text-sm overflow-hidden min-h-screen">
      <Banner banners={banners}/>
      <NewArrival products={newArrivals}/>
      <Homebanner/>
      <Bestsellers sellers = {bestSellers}/>
      <ProductoftheYear/>
      <SpecialOffers offers = {specialOffers}/>   
    </main>
  );
}
