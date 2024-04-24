import { Link } from "react-router-dom";
import useStore from "../store";
import { ToastContainer } from "react-toastify";

function Header({ handleLogout, authenticatedUser }) {
  const basketItems = useStore((store) => store.basketItems);
  const setAuthenticatedUser = useStore((store) => store.setAuthenticatedUser);

  const arrayWithQnt = basketItems.map((item) => item.qnt);
  console.log(`arrayWithQnt:`, arrayWithQnt);

  const quantityInCart = arrayWithQnt.reduce(
    (accumulator, currentItem) => accumulator + currentItem,
    0
  );

  console.log(`quantityInCart:`, quantityInCart);

  function logout() {
    handleLogout();
  }

  return (
    <header id="top-of-the-page" className="top-bar">
      <ToastContainer />

      <main>
        <nav className="header__nav">
          <ul>
            <li key={0}>
              <Link to="/">
                <img
                  className="logo"
                  src={`/assets/costa-coffee-logo.svg`}
                  alt="Costa logo"
                />
              </Link>{" "}
            </li>

            <li key={1}>
              {" "}
              <Link className="" to="/coffee">
                Coffee
              </Link>{" "}
            </li>
            <li key={2}>
              <Link to="/food">Food</Link>{" "}
            </li>
            <li key={3}>
              <Link to="/frostino">Frostino</Link>{" "}
            </li>
            <li key={4}>
              <Link to="/pastries">Pastries</Link>{" "}
            </li>

            {!authenticatedUser ? (
              <>
                <li key={6}>
                  <Link className="login_register" to="/login">
                    Login
                  </Link>{" "}
                </li>
                <li key={7}>
                  <Link className="login_register" to="/signup">
                    Register
                  </Link>{" "}
                </li>
              </>
            ) : (
              <>
                <li key={6}>
                  <button
                    className="login_register text-white hover:text-[var(--primary)]"
                    onClick={logout}
                  >
                    Log Out
                  </button>{" "}
                </li>
                <li key={6}>
                  <Link className="login_register" to="/dashboard">
                    Dashboard
                  </Link>{" "}
                </li>
              </>
            )}

            <li key={5}>
              <Link className="login_register" to="/cart">
                Cart{" "}
                <button className="badge w-6 h-6 inline-flex items-center justify-center text-xl">
                  {quantityInCart}
                </button>
              </Link>{" "}
            </li>
            {/* <li>
              <form>
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                ></input>
              </form>
            </li> */}
          </ul>
        </nav>

        <h1 className="m-[10px] text-white text-4xl leading-[100%]">
          Perfect coffee. <br></br>
          Enjoy it here, <br></br>
          there, everywhere.
        </h1>

        <h1 className="m-[10px] text-white text-4xl leading-[100%]">
          Everywhere.
        </h1>
      </main>
    </header>
  );
}

export default Header;
