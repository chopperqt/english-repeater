import { Form, Radio, Row, Button, Col } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

import {
  MODE_FIRST_TEXT,
  MODE_SECOND_TEXT,
  START_BUTTON_TEXT,
} from "language/ru";

import styles from "./Mode.module.scss";
import useMode from "./useMode";

const Mode = () => {
  const { handleFinish } = useMode();

  return (
    <Row justify="center" align="middle" className={styles.layout}>
      <Col>
        <Form onFinish={handleFinish}>
          <Form.Item name="mode" initialValue="engToRus">
            <Radio.Group defaultValue="engToRus">
              <Radio defaultChecked={true} value="engToRus">
                {MODE_FIRST_TEXT}
              </Radio>
              <Radio value="rusToEng">{MODE_SECOND_TEXT}</Radio>
            </Radio.Group>
          </Form.Item>

          <Row justify="center">
            <Button
              size="large"
              type="primary"
              className={styles.button}
              htmlType="submit"
              icon={<PlayCircleOutlined />}
            >
              {START_BUTTON_TEXT}
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Mode;
