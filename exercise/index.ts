import express from "express";
import calculateBmi from "./utils/bmiCalculator";
import calculateExercises from "./utils/exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    const bmi = calculateBmi(height, weight);
    res.json({
      height,
      weight,
      bmi,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/exercises", (req, res) => {
  console.log(req.body, "body");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: any = req.body;
  try {
    const result = calculateExercises(daily_exercises, target);
    res.send({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
