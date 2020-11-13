import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
 
class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src="./ToDoList_1920x1080.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="src/ToDoList_1920x1080.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="./ToDoList_1920x1080.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};
export default  DemoCarousel;