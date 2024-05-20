const calculateBmi = (height: number, weight: number): string => {
  console.log(!height, !weight);
  if (
    !weight ||
    !height ||
    isNaN(height) ||
    isNaN(weight) ||
    weight === 0 ||
    height === 0
  ) {
    throw new Error("malformatted parameters.");
  }

  const bmi = (weight / (height * height)) * 10000;
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi > 18.5 && bmi < 25) {
    return "Normal weight";
  }
  if (bmi > 25) {
    return "Overweight";
  }
  throw new Error("unknown error");
};

export default calculateBmi;
