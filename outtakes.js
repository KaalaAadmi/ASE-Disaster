const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  ); // check if the user is authenticated on page load

// for every page function, this hook should be included in the page, or component's function, if you want to check whether a user is logged in.

const [isCoordinator, setIsCoordinator] = useState(
    localStorage.getItem("isAdmin") !== null
  ); // check if the user is a coordinator on page load

// if you need to know if the user is a coordinator, this hook should be included in the page, or component's function, if you want to check whether a user is logged in.