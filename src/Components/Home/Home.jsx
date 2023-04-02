import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import styles from './Home.module.css'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {
  return <>
  <MainSlider />
  <CategorySlider />
  <FeaturedProducts/>
  </>
}
