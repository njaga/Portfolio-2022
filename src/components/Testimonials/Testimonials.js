import React, { useContext, useRef, useMemo, useCallback } from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { testimonialsData } from '../../data/testimonialsData';
import './Testimonials.css';

function Testimonials() {
    const { theme } = useContext(ThemeContext);
    const sliderRef = useRef(null);

    const settings = useMemo(() => ({
        dots: true,
        adaptiveHeight: true,
        infinite: true,
        speed: 800,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        margin: 3,
        loop: true,
        autoplaySpeed: 3000,
        draggable: true,
        swipeToSlide: true,
        swipe: true,
    }), []);

    const gotoNext = useCallback(() => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    }, []);

    const gotoPrev = useCallback(() => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }, []);

    const containerStyle = useMemo(() => ({ backgroundColor: theme.primary }), [theme.primary]);
    const headerStyle = useMemo(() => ({ color: theme.secondary }), [theme.secondary]);
    const quoteStyle = useMemo(() => ({ color: theme.secondary }), [theme.secondary]);
    const buttonStyle = useMemo(() => ({ backgroundColor: theme.secondary }), [theme.secondary]);
    const buttonIconStyle = useMemo(() => ({ color: theme.primary }), [theme.primary]);
    const reviewImgStyle = useMemo(() => ({ backgroundColor: theme.secondary }), [theme.secondary]);
    const reviewContentStyle = useMemo(() => ({ 
        backgroundColor: theme.secondary,
        color: theme.tertiary
    }), [theme.secondary, theme.tertiary]);

    if (!testimonialsData || testimonialsData.length === 0) {
        return null; // ou un composant de fallback
    }

    return (
        <div className='testimonials' style={containerStyle}>
            <div className='testimonials--header'>
                <h1 style={headerStyle}>Testimonials</h1>
            </div>
            <div className='testimonials--body'>
                <FaQuoteLeft className='quote' style={quoteStyle} />
                <div className='testimonials--slider' style={containerStyle}>
                    <Slider {...settings} ref={sliderRef}>
                        {testimonialsData.map((test) => (
                            <div className='single--testimony' key={test.id}>
                                <div className='testimonials--container'>
                                    <div className='review--img' style={reviewImgStyle}>
                                        <img src={test.image} alt={test.name} />
                                    </div>
                                    <div className='review--content' style={reviewContentStyle}>
                                        <p>{test.text}</p>
                                        <h1>{test.name}</h1>
                                        <h4>{test.title}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <button
                        className='prevBtn'
                        onClick={gotoPrev}
                        style={buttonStyle}
                        aria-label="Previous testimonial"
                    >
                        <FaArrowLeft style={buttonIconStyle} />
                    </button>
                    <button
                        className='nextBtn'
                        onClick={gotoNext}
                        style={buttonStyle}
                        aria-label="Next testimonial"
                    >
                        <FaArrowRight style={buttonIconStyle} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Testimonials);