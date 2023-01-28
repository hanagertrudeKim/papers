type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="px-20">{children}</div>
}

export default Container
