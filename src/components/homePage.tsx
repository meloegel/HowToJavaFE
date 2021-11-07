import Header from "./common/header"
import NavBar from "./common/navBar"


export default function HomePage() {

    return (
        <div>
            <Header />
            <div>
                <NavBar active={"home"}/>
            </div>
        </div>
    )
}