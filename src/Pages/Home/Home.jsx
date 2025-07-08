import React from 'react';
import Banner from '../shared/Banner/Banner';
import ServicesSection from '../shared/Sections/ServicesSection';
import PartnersSection from '../shared/Sections/PartnersSection';
import Testimonials from '../shared/Sections/Testimonials';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <PartnersSection></PartnersSection>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;