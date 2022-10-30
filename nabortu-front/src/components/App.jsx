import GameWindow from "./GameWindow"
import { ReactComponent as NabortuSvg } from "../static/nabortu.svg"
import { ReactComponent as LogoSvg } from "../static/logo.svg"
export default function App(props) {
    return (
        <div className="main-container">
            <header className="main-header">
                <LogoSvg  className="logo-size"/>
                <NabortuSvg  className="logo-text-size"/>
            </header>
            <main>
                <GameWindow/>
            </main>
        </div>
    )
}