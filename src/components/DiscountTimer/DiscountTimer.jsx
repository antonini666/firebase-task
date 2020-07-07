import React, { useState, useEffect } from "react";

import "./DiscountTimer.scss";

const DiscountTimer = ({ discountDates }) => {
  const calculateTimeLeft = () => {
    const discount = discountDates;

    const difference = +new Date(discount) - +new Date();

    let timeLeft = {};

    const correctValueFormat = (value) => {
      return value < 10 ? "0" + value : value;
    };

    if (difference > 0) {
      timeLeft = {
        d: correctValueFormat(Math.floor(difference / (1000 * 60 * 60 * 24))),
        h: correctValueFormat(Math.floor((difference / (1000 * 60 * 60)) % 24)),
        m: correctValueFormat(Math.floor((difference / 1000 / 60) % 60)),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    let timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, id) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={id} className="d-flex flex-column align-items-center time">
        <div className="count text-primary">{timeLeft[interval]}</div>
        <div className="units">{interval} </div>
      </div>
    );
  });

  return (
    <div className="d-flex justify-content-center timer">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default DiscountTimer;
