import { Switch, Route, NavLink } from "react-router-dom";
import Movie from "./components/Movie";
import FavMovie from "./components/FavMovie";
import { useDispatch, useSelector } from "react-redux";
import {
  backToFirst,
  goToLast,
  nextMovie,
  previousMovie,
} from "./store/actions";
import { listeyeEkle } from "./store/actions";

function App() {
  const favMovies = useSelector((store) => store.favMovies);
  const sira = useSelector((store) => store.sira);
  const movies = useSelector((store) => store.movies);
  const dispatch = useDispatch();

  function sonrakiFilm() {
    dispatch(nextMovie());
  }

  function oncekiFilm() {
    dispatch(previousMovie())
  }

  return (
    <div className="wrapper max-w-2xl mx-auto">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Filmler
        </NavLink>
        <NavLink
          to="/listem"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Listem
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          {movies.length > 0 ? (
            <>
              <Movie sira={sira} />
              <div className="flex gap-3 justify-end py-3">
                <button
                  onClick={() => dispatch(backToFirst())}
                  className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                >
                  Başa Dön
                </button>
                <button
                  onClick={oncekiFilm}
                  className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                >
                  Önceki
                </button>
                <button
                  onClick={sonrakiFilm}
                  className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                >
                  Sıradaki
                </button>
                <button
                  onClick={() => dispatch(goToLast())}
                  className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                >
                  Sona Git
                </button>
                <button
                  onClick={() => dispatch(listeyeEkle(movies[sira]))}
                  className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
                >
                  Listeme ekle
                </button>
              </div>
            </>
          ) : (
            <h1>Fava eklenmedik film kalmadı</h1>
          )}
        </Route>

        <Route path="/listem">
          <div>
            {favMovies.map((movie) => (
              <FavMovie key={movie.id} title={movie.title} id={movie.id} />
            ))}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
