import { Form, Input, Button, Col, Row, Switch } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import {
  ENGLISH_TEXT,
  RUSSIA_TEXT,
  ADD_BUTTON_TEXT,
  START_BUTTON_TEXT,
} from "language/ru";
import { RulesRussiaField, RulesEnglishField } from "assets/rules";

import useWordsList from "./hooks/useWordsList";

import styles from "./WordsList.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "services/store";

const LOAD_PINED_WORDS_TEXT = "Download pinned words";

const List = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const words = useSelector((state: RootState) => state.settings.words);

  const [form] = Form.useForm();

  const {
    handleChange,
    handleFinish,
    hasDisabled,
    wordsFromLocal,
    handleGetPinWords,
  } = useWordsList({ userId, words, setFieldsValue: form.setFieldsValue });

  console.log("words", words, wordsFromLocal);

  return (
    <Row justify="center" align="middle" className={styles.layout}>
      <Col span={24}>
        <Button onClick={handleGetPinWords} icon={<DownloadOutlined />}>
          {LOAD_PINED_WORDS_TEXT}
        </Button>
        <Form
          form={form}
          onValuesChange={handleChange}
          initialValues={wordsFromLocal}
          onFinish={handleFinish}
        >
          <Form.List name="words">
            {(fields, { add, remove }) => (
              <Col span={24}>
                {fields.map(({ key, name, ...resetField }) => (
                  <Row key={key} gutter={[12, 12]}>
                    <Col>
                      <Form.Item
                        {...resetField}
                        name={[name, "isActive"]}
                        valuePropName="checked"
                      >
                        <Switch
                          defaultChecked={true}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={9} lg={9}>
                      <Form.Item
                        {...resetField}
                        name={[name, "english"]}
                        rules={RulesEnglishField}
                      >
                        <Input size="large" placeholder={ENGLISH_TEXT} />
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item
                        {...resetField}
                        name={[name, "russia"]}
                        rules={RulesRussiaField}
                      >
                        <Input placeholder={RUSSIA_TEXT} size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Button
                        danger={true}
                        block={true}
                        onClick={() => remove(name)}
                        size="large"
                      >
                        <DeleteOutlined />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col span={23}>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      type="dashed"
                      block={true}
                    >
                      {ADD_BUTTON_TEXT}
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
          </Form.List>
          <Col span={24}>
            <Row justify="center">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className={styles.button}
                  disabled={hasDisabled}
                >
                  {START_BUTTON_TEXT}
                </Button>
              </Form.Item>
            </Row>
          </Col>
        </Form>
      </Col>
    </Row>
  );
};

export default List;
