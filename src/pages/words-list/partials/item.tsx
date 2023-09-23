import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Row, Switch } from "antd";
import { RulesEnglishField, RulesRussiaField } from "assets/rules";
import { ENGLISH_TEXT, RUSSIA_TEXT } from "language/ru";

import styles from "../WordsList.module.scss";

interface ItemProps {
  name: number;
  id: number;
  /**
   * NOTE: Потом поменять на нормальный тип
   */
  resetField: any;
  index: number;
  onRemove: (key: number) => void;
}

export const Item = ({ id, name, resetField, index, onRemove }: ItemProps) => {
  const formattedIndex = `${index + 1}.`;

  const defaultOptions = {
    ...resetField,
    className: styles.input,
  };

  return (
    <div className={styles.wrapper}>
      <Row className={styles.offset} align="top">
        {formattedIndex}
      </Row>
      <Row align="middle">
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
      </Row>
      <div className={styles.fieldsWrapper}>
        <Form.Item
          name={[name, "english"]}
          rules={RulesEnglishField}
          {...defaultOptions}
        >
          <Input placeholder={ENGLISH_TEXT} />
        </Form.Item>
        <Form.Item
          name={[name, "russia"]}
          rules={RulesRussiaField}
          {...defaultOptions}
        >
          <Input placeholder={RUSSIA_TEXT} />
        </Form.Item>
      </div>
      <Row className={styles.offset}>
        <Button danger={true} block={true} onClick={() => onRemove(name)}>
          <DeleteOutlined />
        </Button>
      </Row>
    </div>
  );
};
