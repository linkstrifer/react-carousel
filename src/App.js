import { useState, useCallback } from "react";
import "./styles.css";

function Carousel({ children = [], height }) {
  const [current, setCurrent] = useState(0);
  const goToSlide = useCallback(
    (index) => {
      let newIndex = index;

      if (index < 0) {
        newIndex = children.length - 1;
      } else if (index >= children.length) {
        newIndex = 0;
      }

      setCurrent(newIndex);
    },
    [children.length]
  );

  const prevSlide = current - 1 < 0 ? children.length - 1 : current - 1;
  const nextSlide = current + 1 > children.length - 1 ? 0 : current + 1;

  return (
    <div
      className="carousel"
      style={
        height && {
          "--carousel-height": `${height}px`
        }
      }
    >
      <ul
        className="carousel-slides"
        style={{
          "--current-slide": `${current}`
        }}
      >
        {children.map((slide, index) => (
          <li
            className={`carousel-slide ${
              current === index ? "is-active" : ""
            } ${index === prevSlide ? "is-left" : ""} ${
              index === nextSlide ? "is-right" : ""
            }`}
            key={index}
          >
            {slide}
          </li>
        ))}
      </ul>

      <div className="carousel-controls">
        <button
          className="carousel-control is-prev"
          onClick={() => goToSlide(current - 1)}
        >
          Prev
        </button>

        <button
          className="carousel-control is-next"
          onClick={() => goToSlide(current + 1)}
        >
          Next
        </button>
      </div>

      <ul className="carousel-dots">
        {children.map((slide, index) => (
          <li
            className={`carousel-dot ${current === index ? "is-active" : ""}`}
            key={index}
          >
            <button onClick={() => goToSlide(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Carousel>
        <div>
          <button>Slide 1</button>
        </div>
        <div>
          <button>Slide 2</button>
        </div>
        <div>
          <button>Slide 3</button>
        </div>
      </Carousel>
    </div>
  );
}
