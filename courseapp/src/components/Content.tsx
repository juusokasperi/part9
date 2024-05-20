import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div key={part.name}>
          <h3 style={{ marginBottom: 1 }}>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return (
        <div key={part.name}>
          <h3 style={{ marginBottom: 1 }}>
            {part.name} {part.exerciseCount}
          </h3>
          Project exercises {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div key={part.name}>
          <h3 style={{ marginBottom: 1 }}>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <br />
          {part.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div key={part.name}>
          <h3 style={{ marginBottom: 1 }}>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <br />
          Required skills: {part.requirements.join(", ")}
        </div>
      );
    default:
      return assertNever(part);
  }
};
const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
