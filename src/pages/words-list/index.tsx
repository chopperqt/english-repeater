import { Form, Button, Col, Row, Select } from "antd";
import { useSelector } from "react-redux";
import {
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { RootState } from "services/store";
import { ADD_BUTTON_TEXT, START_BUTTON_TEXT } from "language/ru";

import useWordsList from "./hooks/useWordsList";

import styles from "./WordsList.module.scss";
import { CountItems } from "./constants";
import { Item } from "./partials/item";

const LOAD_PINED_WORDS_TEXT = "Get pinned words";
const GET_RANGOM_WORDS_TEXT = "Get random words";
const CLEAR_TEXT = "Clear words";

const List = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const words = useSelector((state: RootState) => state.settings.words);

  const [form] = Form.useForm();

  const {
    handleChange,
    handleFinish,
    hasDisabled,
    limit,
    isLoadingPinWords,
    isLoadingRandomWords,
    handleLoadPinWords,
    handleLoadRandomWords,
    handleChangeLimit,
    handleReset,
  } = useWordsList({ userId, words, setFieldsValue: form.setFieldsValue });

  return (
    <Row justify="center" className={styles.layout}>
      <Col span={24}>
        <div className={styles.actionsWrapper}>
          <Button
            loading={isLoadingPinWords}
            onClick={handleLoadPinWords}
            icon={<DownloadOutlined />}
          >
            {LOAD_PINED_WORDS_TEXT}
          </Button>
          <Button
            onClick={handleLoadRandomWords}
            loading={isLoadingRandomWords}
            icon={<DownloadOutlined />}
          >
            {GET_RANGOM_WORDS_TEXT}
          </Button>
          <Select
            className={styles.select}
            defaultValue={limit}
            options={CountItems}
            onChange={handleChangeLimit}
          />
          <Button onClick={handleReset} icon={<DeleteOutlined />}>
            {CLEAR_TEXT}
          </Button>
        </div>
        <Form
          form={form}
          onValuesChange={handleChange}
          initialValues={{
            words,
          }}
          onFinish={handleFinish}
          className={styles.form}
        >
          <Form.List name="words">
            {(fields, { add, remove }) => (
              <Col span={24}>
                {fields.map(({ key, name, ...resetField }, index) => (
                  <Item
                    key={key}
                    name={name}
                    resetField={resetField}
                    onRemove={remove}
                    index={index}
                  />
                ))}
                <Row>
                  <Col span={24}>
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
