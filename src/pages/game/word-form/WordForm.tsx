import {
  Form,
  Input,
  Col,
  Row,
  Button,
  Popover,
} from 'antd'
import {
  FastForwardOutlined,
  StepForwardOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'

import {
  END_TEXT,
  HELP_TEXT,
  NEXT_TEXT,
  SKIP_TEXT,
  TRANSLATE_INPUT_TEXT,
  TRANSLATE_TEXT,
} from 'language/ru'
import useWordForm from './useWordForm'

import styles from './WordForm.module.scss'

const WordForm = () => {
  const {
    handleReset,
    handleSkip,
    handleSubmit,
    normalizedWord,
    form,
    rule,
    hasWords,
    normalizedTranslateWord,
  } = useWordForm()

  if (!hasWords) {
    return null
  }

  return (
    <Col span={24}>
      <Row>
        <div className={styles.text}>
          {TRANSLATE_TEXT}&nbsp;
          <span className={styles.word}>
            {normalizedWord}
          </span>
          <Popover
            placement="top"
            content={(
              <div className={styles.text}>
                {HELP_TEXT}{normalizedTranslateWord}
              </div>
            )}>
            <InfoCircleOutlined />
          </Popover>
        </div>
      </Row>
      <Col className={styles.form}>
        <Form
          form={form}
          onFinish={handleSubmit}
        >
          <Col span={24}>
            <Form.Item
              name="word"
              rules={rule}
            >
              <Input
                placeholder={TRANSLATE_INPUT_TEXT}
                size="large"
              />
            </Form.Item>
          </Col>
          <Row
            gutter={[12, 12]}
            justify="center"
          >
            <Col>
              <Button
                icon={<StepForwardOutlined />}
                htmlType="submit"
                size="large"
                type="primary"
              >
                {NEXT_TEXT}
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleSkip}
                size="large"
                icon={<FastForwardOutlined />}
              >
                {SKIP_TEXT}
              </Button>
            </Col>
            <Col>
              <Button
                danger={true}
                type="primary"
                size="large"
                icon={<CloseOutlined />}
                onClick={handleReset}
              >
                {END_TEXT}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Col>
  )
}

export default WordForm
