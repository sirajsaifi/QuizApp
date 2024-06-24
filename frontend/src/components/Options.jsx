import React from "react";

export const Options = ({ options, correctAnswer, onOptionChange }) => {
  const handleChange = (event) => {
    onOptionChange(event.target.value === correctAnswer);
  };

  return (
    <>
      {options.map((option, index) => (
        <div className="form-control" key={index}>
          <label className="label cursor-pointer">
            <span className="label-text">{option}</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              value={option}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
    </>
  );
};
