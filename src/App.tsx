import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Results from "./components/Result";
import { Result } from "./types/ResultType";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Result[]>([]);

  return (
    <div>
      <h1>User Search</h1>
      <Form setResults={setSearchResults} />
      <Results results={searchResults} />
    </div>
  );
};

export default App;
