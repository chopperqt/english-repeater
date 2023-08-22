import { Col, Row } from "antd"

import { Word } from "services/game/game"

import Status from "./partials/Status"

import styles from './CompleteStatus.module.scss'

interface CompleteStatusProps {
  words: Word[]
}
const CompleteStatus = ({
  words = [],
}: CompleteStatusProps) => {
  if (!words.length) {
    return null
  }

  return (
    <Row justify="center">
      <Col className={styles.wrap}>
        {words.map(({ status }, index) => (
          <Status
            key={index}
            status={status}
          />
        ))}
      </Col>
    </Row>
  )
}

export default CompleteStatus