import { Row, Col, Steps, Spin } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "services/store";
import { Mode, WordsList, Result, Game } from "pages";
import { useConnect } from "utils/use-connect";

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
            <div className="container">
              <div className="steps">
                <Steps current={currentStep}>
                  {steps.map(({ title }) => (
                    <Steps.Step key={title} title={title} />
                  ))}
                </Steps>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
