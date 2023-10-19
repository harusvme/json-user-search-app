interface Result {
  email: string;
  number: string;
}

interface ResultsProps {
  results: Result[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            Email: {result.email}, Number: {result.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
