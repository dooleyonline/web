import { CheckIcon } from "lucide-react";
import { Fragment } from "react";

type StepVisualizerProps = {
  steps: string[];
  currentStep: number;
};
const StepVisualizer = (props: StepVisualizerProps) => {
  const { steps, currentStep } = props;

  return (
    <div className="w-full flex border rounded-xl items-center justify-between px-5 py-3">
      {steps.map((step, index) => {
        const status =
          index + 1 < currentStep
            ? "completed"
            : index + 1 === currentStep
              ? "current"
              : "upcoming";
        return (
          <Fragment key={index}>
            <Step name={step} status={status} />{" "}
            {index < steps.length - 1 &&
              (status === "completed" ? (
                <div className="grow mx-5 bg-green-600 h-[1px]" />
              ) : (
                <div className="grow mx-5 bg-border h-[1px]" />
              ))}
          </Fragment>
        );
      })}
    </div>
  );
};

export default StepVisualizer;

type StepProps = {
  name: string;
  status: "completed" | "current" | "upcoming";
};

const Step = (props: StepProps) => {
  const { name, status } = props;

  switch (status) {
    case "completed":
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="bg-green-600 size-4 rounded-full flex items-center justify-center">
            <CheckIcon size={12} className="text-background" />
          </div>
          <small className="text-xs font-medium text-foreground">{name}</small>
        </div>
      );
    case "current":
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="bg-border size-4 rounded-full flex items-center justify-center">
            <div className="bg-foreground size-[6px] rounded-full" />
          </div>
          <small className="text-xs font-medium text-foreground">{name}</small>
        </div>
      );
    case "upcoming":
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="bg-border size-4 rounded-full"></div>
          <small className="text-xs font-medium text-muted-foreground">
            {name}
          </small>
        </div>
      );
    default:
      return null;
  }
};
