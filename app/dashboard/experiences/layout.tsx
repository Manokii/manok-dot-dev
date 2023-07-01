import { ReactNode } from "react"

interface Props {
  children: ReactNode
  modal: ReactNode
}
export default function Layout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
