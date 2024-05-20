import { useState, useEffect } from "react";
import axios from "axios";

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

const Notification = ({ message }: { message: string }) => {
  if (message === "") {
    return null;
  }

  const style = {
    width: "60vw",
    color: "darkRed",
    backgroundColor: "lightBlue",
    border: "2px solid black",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={style}>{message}</div>;
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setEntries(response.data);
      });
  }, []);

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      date,
      weather,
      visibility,
      comment,
    };
    try {
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        entryToAdd
      );
      setEntries([...entries, response.data]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setNotification(error.response.data);
        setTimeout(() => {
          setNotification("");
        }, 5000);
      } else {
        setNotification("Unknown error occurred");
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    }

    setWeather("");
    setDate("");
    setVisibility("");
    setComment("");
  };

  return (
    <div>
      <Notification message={notification} />
      <form style={{ width: "50vw" }} onSubmit={entryCreation}>
        <div>
          <input
            style={{ width: "100%" }}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <fieldset style={{ width: "94%", fontSize: 14 }}>
          <legend>Weather:</legend>
          <div>
            <input
              type="radio"
              name="weather"
              id="sunny"
              onChange={() => setWeather("sunny")}
            />
            <label htmlFor="sunny">Sunny</label>

            <input
              type="radio"
              name="weather"
              id="rainy"
              onChange={() => setWeather("rainy")}
            />
            <label htmlFor="rainy">Rainy</label>

            <input
              type="radio"
              name="weather"
              id="cloudy"
              onChange={() => setWeather("cloudy")}
            />
            <label htmlFor="cloudy">Cloudy</label>

            <input
              type="radio"
              name="weather"
              id="stormy"
              onChange={() => setWeather("stormy")}
            />
            <label htmlFor="stormy">Stormy</label>

            <input
              type="radio"
              name="weather"
              id="windy"
              onChange={() => setWeather("windy")}
            />
            <label htmlFor="windy">Windy</label>
          </div>
        </fieldset>
        <fieldset style={{ width: "94%", fontSize: 14, marginBottom: 10 }}>
          <legend>Visibility:</legend>
          <div>
            <input
              type="radio"
              name="visibility"
              id="great"
              onChange={() => setVisibility("great")}
            />
            <label htmlFor="great">Great</label>

            <input
              type="radio"
              name="visibility"
              id="good"
              onChange={() => setVisibility("good")}
            />
            <label htmlFor="good">Good</label>

            <input
              type="radio"
              name="visibility"
              id="ok"
              onChange={() => setVisibility("ok")}
            />
            <label htmlFor="ok">Ok</label>

            <input
              type="radio"
              name="visibility"
              id="poor"
              onChange={() => setVisibility("poor")}
            />
            <label htmlFor="poor">Poor</label>
          </div>
        </fieldset>

        <div>
          <input
            style={{ marginBottom: 10, width: "100%" }}
            placeholder="Comment"
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <ul>
        {entries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            weather: {entry.weather}
            <br />
            visibility: {entry.visibility}
          </div>
        ))}
      </ul>
    </div>
  );
};
export default App;
