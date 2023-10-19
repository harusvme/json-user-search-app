import { useState } from "react";
import axios from "axios";
import { Result } from "../types/ResultType";

interface FormProps {
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
}

const Form: React.FC<FormProps> = ({ setResults }) => {
  const searchRoute = "http://localhost:3001/api/search";
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatNumber = (input: string) => {
    const sanitizedInput = input.replace(/-/g, "");
    const groups = sanitizedInput.match(/.{1,2}/g);

    if (groups) {
      const formattedNumber = groups.join("-");
      return formattedNumber;
    }

    return input;
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const formattedNumber = formatNumber(newValue);

    setNumber(formattedNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(searchRoute, {
        email,
        number,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number: </label>
          <input
            type="text"
            value={number}
            onChange={handleNumberChange}
            pattern="\d{2}-\d{2}-\d{2}"
            title="Номер должен соответствовать формату XX-XX-XX"
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Form;
