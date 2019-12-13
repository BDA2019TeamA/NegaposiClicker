import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { SentenceCard, NegaposiButtons } from '../components'
import styles from './ClickerView.scss'
import { createAxios } from '../utils/axios-cache'
import NegaposiEnums from '../components/clicker/NagaposiEnums'

class ClickerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
    }

    this.api = createAxios({
      baseURL: 'http://localhost:3000',
      timeout: 1000,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  async getData(id) {
    const res = await this.api.get('samples/comments.json')

    if (!res.data || !res.data.length) return {}

    for (const item of res.data) {
      if (item.id >= id) {
        return {
          id: item.id,
          sentence: item.comment,
          reference: 'samples',
        }
      }
    }

    return {}
  }

  async next() {
    const { id } = this.state
    const res = await this.getData(id + 1)
    this.setState(res)
  }

  async select(negaposi) {
    switch (negaposi) {
      case NegaposiEnums.POSITIVE:
        console.log('POSITIVE')
        break
      case NegaposiEnums.NEGATIVE:
        console.log('NEGATIVE')
        break
      case NegaposiEnums.UNKNOWN:
        console.log('UNKNOWN')
        break
      default:
        console.log('default')
        break
    }

    await this.next()
  }

  async componentDidMount() {
    this.keyEventListener = (e) => {
      const keyName = e.key

      switch (keyName) {
        case 'p':
          this.select(NegaposiEnums.POSITIVE)
          break
        case 'k':
          this.select(NegaposiEnums.UNKNOWN)
          break
        case 'n':
          this.select(NegaposiEnums.NEGATIVE)
          break
      }
    }

    window.addEventListener('keypress', this.keyEventListener)

    await this.next()
  }

  compoenentWillUnmount() {
    window.removeEventListener('keypress', this.keyEventListener)
  }

  render() {
    const { id, sentence, reference } = this.state

    const onClick = (negaposi) => {
      this.select(negaposi)
    }

    return (
      <Container>
        <SentenceCard
          id={id}
          sentence={sentence}
          reference={reference}
        />
        <NegaposiButtons
          onClick={onClick}
        />
      </Container>
    )
  }

}

export default ClickerView

