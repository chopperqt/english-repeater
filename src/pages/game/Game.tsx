import { lazy, Suspense } from 'react'
import {
  Row,
  Col,
} from 'antd'

import WordForm from './word-form/WordForm'
import useGame from './useGame'

import styles from './Game.module.scss'

const CompleteStatus = lazy(() => import('./complete-status/CompleteStatus'))

const Game = () => {
  const { words } = useGame()

  return (
    <Row
      className={styles.container}
      justify='center'
      align='middle'
    >
      <Col className={styles.wrap}>
        {!!words.length && (
          <WordForm />
        )}
        <Suspense>
          <CompleteStatus words={words} />
        </Suspense>
      </Col>
    </Row>
  )
}

export default Game