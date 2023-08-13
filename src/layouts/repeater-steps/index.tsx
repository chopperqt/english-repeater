import { Steps } from "antd";

import styles from "./RepeaterSteps.module.scss";

interface RepeaterStepsProps {
  currentStep: number;
  steps: { title: string }[];
}

export const RepeaterSteps = ({ currentStep, steps }: RepeaterStepsProps) => (
  <div className="container">
    <div className={styles.steps}>
      <Steps size="small" responsive items={steps} current={currentStep} />
    </div>
  </div>
);
