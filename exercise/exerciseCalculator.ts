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
  const isTrue = amounts.every((num) => !isNaN(num));

  if (!isTrue) {
    throw new Error("All arguments in the command line must be numbers.");
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

const exercises: number[] = process.argv.slice(3).map((arg) => +arg);
const target: number = Number(process.argv[2]);
try {
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "An error occurred";
  if (error instanceof Error) {
    errorMessage += ": " + error.message;
  }
  console.log(errorMessage);
}
