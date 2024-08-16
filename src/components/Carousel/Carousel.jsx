import Slider from 'react-slick'

const Carousel = ({children, speed, sm, md, lg, xl, fade, arrow}) => {

  return (
            <Slider responsive= { [
                {
                breakpoint: 320,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: sm,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                    arrows: arrow
                }
                },
                {
                breakpoint: 768,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: md,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                    arrows: arrow
                }
                },
                {
                breakpoint: 1200,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: lg,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                    arrows: arrow
                }
                },
                {
                breakpoint: 1600,
                settings: {
                    fade: fade ? true : false,
                    speed: 500,
                    slidesToShow: xl,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: speed,
                    arrows: arrow
                }
                }
            ]}>
              {children}
            </Slider>
  );
};

export default Carousel;