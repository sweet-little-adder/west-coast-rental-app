import { useEffect } from "react";

const CountDown = ({ timeLeft, setTimeLeft, text, onClick, color }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]); // eslint-disable-line

  return (
    <>
      {timeLeft <= 0 ? (
        <button
          style={{ backgroundColor: `${color}` }}
          className=" m-5 w-[120px] rounded-lg p-2 text-base font-medium text-white"
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <button className="disable m-5 mx-auto flex w-[120px] cursor-auto items-center justify-center space-x-3 rounded-md bg-[#c9c9c9] p-2 text-base font-medium text-white">
          <p>{text}</p> <p className="text-sm">({timeLeft}s)</p>
        </button>
      )}
    </>
  );
};

export default CountDown;
