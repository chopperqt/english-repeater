import cx from 'classnames'

import { StatusTranslate } from 'services/game/game'

import styles from '../CompleteStatus.module.scss'

interface StatusProps {
  status: StatusTranslate
}
const Status = ({
  status,
}: StatusProps) => {


  return (
    <div className={cx(styles.rectangle, {
      [styles.red]: status === 'ERROR',
      [styles.green]: status === 'COMPLETE',
    })} />
  )
}

export default Status