interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (amounts: number[], target: number): Result => {
  if (!amounts || !target) {
    throw new Error("parameters missing");
  }

  const amountsIsTrue = amounts.every((num) => !isNaN(num));
  const targetIsTrue = !isNaN(target);

  if (!amountsIsTrue || !targetIsTrue) {
    throw new Error("malformatted parameters");
  }

  const periodLength: number = amounts.length;
  const trainingDays: number = amounts.filter((num) => num !== 0).length;
  const average: number = amounts.reduce((a, b) => a + b, 0) / periodLength;
  let success: boolean = false;
  let ratingDescription: string = "Try harder next time.";
  let rating: number = 1;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Great job, you met your target.";
    success = true;
  }
  if (average >= target * 0.9 && average < target) {
    rating = 2;
    ratingDescription = "Pretty good, you almost met your target.";
    success = false;
  }
  if (average < target * 0.9) {
    rating = 1;
    ratingDescription = "Try harder next time.";
    success = false;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export default calculateExercises;
