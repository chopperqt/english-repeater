import { lazy, Suspense } from "react";
import { Row, Col, Spin } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "services/store";
import { Mode, WordsList, Game, Result } from "pages";
import { useConnect } from "utils/use-connect";
import { RepeaterSteps } from "layouts/repeater-steps";

import "./App.scss";

const RESULT_STEP = 3;

const steps = [
  {
    title: "Список слов",
    content: <WordsList />,
  },
  {
    title: "Мод",
    content: <Mode />,
  },
  {
    title: "Проверка",
    content: <Game />,
  },
  {
    title: "Результат",
    content: <Result />,
  },
];

function App() {
  const currentStep = useSelector((state: RootState) => state.settings.step);

  const { isConnected } = useConnect();

  if (!isConnected) {
    return (
      <div className="spin">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="App">
      <Row justify="center" align="middle">
        <Col>
          <div className="container">{steps[currentStep].content}</div>
          {currentStep !== RESULT_STEP && (
            <RepeaterSteps steps={steps} currentStep={currentStep} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
