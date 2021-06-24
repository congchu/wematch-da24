import {useState} from 'react';

interface useMultiStepProps {
  steps: any;
};

const useMultiStep = ({steps}: useMultiStepProps) => {
  const [step, setStep] = useState(0);
  const maxStep = steps.length -1;

  const nextStep = () => {
    if (step === maxStep) {
      return;
    }

    setStep(step + 1);
  };

  const prevStep  = () => {
    if (step === 0) {
      return;
    }

    setStep(step -1)
  };

  return {
    step,
    maxStep,
    prevStep,
    nextStep
  }
};

export default useMultiStep
