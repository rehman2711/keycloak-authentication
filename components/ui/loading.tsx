import { Button } from "./button"
import { Spinner } from "./spinner"

const Loading = () => {
  return (
    <div className="">
      <Button variant="secondary" disabled size="lg">
        <Spinner data-icon="inline-start" />
        Loading
      </Button>
    </div>
  )
}

export default Loading
