import React from 'react';
import Banner from '../shared/Banner/Banner';
import ServicesSection from '../shared/Sections/ServicesSection';
import PartnersSection from '../shared/Sections/PartnersSection';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <PartnersSection></PartnersSection>
            
        </div>
    );
};

export default Home;