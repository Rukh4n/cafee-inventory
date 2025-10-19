import React from "react"
import { Coffee } from "lucide-react"
import Headline from "./components/home/Headline"
import BasetMenu from "./components/home/basetMenu"
import About from "./components/home/about"
import Galery from "./components/home/galery"
import Testimonial from "./components/home/testimonial"
import Location from "./components/home/location"

const Page = () => {
  return (
    <main>
      <Headline />
      <BasetMenu />
      <About />
      <Galery />
      <Testimonial />
      <Location />
    </main>
  )
}

export default Page
