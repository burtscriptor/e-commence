import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Forever was born out of a passion for innovation and a desire to revolutionize</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of cutting-edge 
            products and services that cater to the ever-evolving needs and aspirations of our customers.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shipping experience that exceeds
            expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl py-4 text-center">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>User-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the full way, ensuring great service you deserve.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About;
