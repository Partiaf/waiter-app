
type Props = {
    setOpen: Function,
    open: boolean
}

const Header = ({open, setOpen}:Props) => {

    return (
      <header>
        <h2>Mauricio</h2>
        <div>
            <button onClick={setOpen(!open)}><img src="/scan-icon.svg" alt="" /></button>
            <button></button>
        </div>
      </header>
    )
  }
  
  export default Header
  