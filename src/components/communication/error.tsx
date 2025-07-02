import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type ErrorProps = {
  title: string;
  description: string;
};
const Error = ({ title, description }: ErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default Error;
