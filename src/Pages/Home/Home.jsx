import React from 'react';
import Banner from '../shared/Banner/Banner';
import ServicesSection from '../shared/Sections/ServicesSection';
import PartnersSection from '../shared/Sections/PartnersSection';
import Testimonials from '../shared/Sections/Testimonials';
import WhyChooseUs from './WhyChooseUs';
import TrendingProducts from '../TrendingProducts.jsxTrendingProducts/TrendingProducts';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <ServicesSection></ServicesSection>
            <PartnersSection></PartnersSection>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;