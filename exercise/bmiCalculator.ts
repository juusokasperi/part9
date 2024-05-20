const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("All arguments in the command line must be numbers.");
  }
  if (weight === 0 || height === 0) {
    throw new Error("Weight and/or height cannot be 0");
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
};
const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
try {
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "An error occurred";
  if (error instanceof Error) {
    errorMessage += ": " + error.message;
  }
  console.log(errorMessage);
}
