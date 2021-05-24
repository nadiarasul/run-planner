import { NavLink } from "react-router-dom";
import styles from "./styles/Header.module.css";

const Header = () => {
	return (
		<header className="layoutContainer">
			<nav>
				<ul>
					<li>
						<NavLink
							to="/"
							activeClassName={styles.selected}
							exact={true}
							className={styles.home}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/wardrobe"
							activeClassName={styles.selected}
							className={styles.wardrobe}>
							Wardrobe
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/settings"
							activeClassName={styles.selected}
							className={styles.settings}>
							Settings
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/about"
							activeClassName={styles.selected}
							className={styles.about}>
							About
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
